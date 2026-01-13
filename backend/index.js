require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const auth = require("./middleware/auth");

const { UserModel } = require("./model/UserModel");
const { HoldingsModel } = require("./model/HoldingsModel");
const { OrdersModel } = require("./model/OrdersModel");

const defaultHoldings = require("./data/defaultHoldings");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

/* ================= GLOBAL MIDDLEWARE ================= */

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      process.env.DASHBOARD_URL,
      process.env.LANDING_URL,
    ],
    credentials: true,
  })
);


/* ================= SIGNUP ================= */
/**
 * - Creates user
 * - Seeds default holdings
 * - Sets auth cookie
 */
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModel.create({
      name,
      email,
      password: hashed,
    });

    // Seed holdings (fresh objects)
    const userHoldings = defaultHoldings.map((h) => ({
      userId: user._id,
      name: h.name,
      qty: h.qty,
      avg: h.avg,
      price: h.price,
      net: h.net,
      day: h.day,
    }));

    await HoldingsModel.insertMany(userHoldings);

    // Issue JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    

    res.json({ message: "Signup success" });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);

    // Best-effort cleanup (no breaking change)
    await UserModel.deleteOne({ email });

    res.status(500).json({ message: "Signup failed" });
  }
});

/* ================= LOGIN ================= */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    

    res.json({ message: "Login success" });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

/* ================= LOGOUT ================= */
app.post("/logout", (_req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

/* ================= AUTH CHECK ================= */
app.get("/me", auth, (req, res) => {
  res.json({ userId: req.userId });
});

/* ================= HOLDINGS ================= */
app.get("/allHoldings", auth, async (req, res) => {
  const holdings = await HoldingsModel.find({ userId: req.userId });
  res.json(holdings);
});

/* ================= ORDERS ================= */
app.get("/orders", auth, async (req, res) => {
  const orders = await OrdersModel.find({ userId: req.userId }).sort({
    createdAt: -1,
  });

  res.json(orders);
});

/* ================= SUMMARY ================= */
app.get("/summary", auth, async (req, res) => {
  const user = await UserModel.findById(req.userId);
  const holdings = await HoldingsModel.find({ userId: req.userId });

  let totalInvestment = 0;
  let currentValue = 0;

  holdings.forEach((h) => {
    totalInvestment += h.avg * h.qty;
    currentValue += h.price * h.qty;
  });

  res.json({
    equity: user.equity,
    totalHoldings: holdings.length,
    totalInvestment,
    currentValue,
    pnl: currentValue - totalInvestment,
  });
});

/* ================= TRADE ================= */
app.post("/trade", auth, async (req, res) => {
  const { name, qty, price, mode } = req.body;

  // Defensive checks (safe, non-breaking)
  if (!name || qty <= 0 || price <= 0) {
    return res.status(400).json({ message: "Invalid trade data" });
  }

  if (!["BUY", "SELL"].includes(mode)) {
    return res.status(400).json({ message: "Invalid trade mode" });
  }

  const cost = qty * price;
  const user = await UserModel.findById(req.userId);

  if (mode === "BUY") {
    if (user.equity < cost) {
      return res.status(400).json({ message: "Insufficient equity" });
    }

    let holding = await HoldingsModel.findOne({
      userId: req.userId,
      name,
    });

    if (holding) {
      const totalQty = holding.qty + qty;
      holding.avg =
        (holding.avg * holding.qty + price * qty) / totalQty;
      holding.qty = totalQty;
      holding.price = price;
      await holding.save();
    } else {
      await HoldingsModel.create({
        userId: req.userId,
        name,
        qty,
        avg: price,
        price,
      });
    }

    user.equity -= cost;
    await user.save();
  }

  if (mode === "SELL") {
    const holding = await HoldingsModel.findOne({
      userId: req.userId,
      name,
    });

    if (!holding || holding.qty < qty) {
      return res.status(400).json({ message: "Not enough quantity" });
    }

    holding.qty -= qty;

    if (holding.qty === 0) {
      await HoldingsModel.deleteOne({ _id: holding._id });
    } else {
      await holding.save();
    }

    user.equity += cost;
    await user.save();
  }

  await OrdersModel.create({
    userId: req.userId,
    name,
    qty,
    price,
    mode,
  });

  res.json({ message: "Trade successful" });
});

/* ================= SERVER ================= */
app.listen(PORT, async () => {
  await mongoose.connect(uri);
  console.log("Backend running on", PORT);
});
