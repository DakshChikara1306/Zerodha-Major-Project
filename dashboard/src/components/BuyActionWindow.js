import React, { useState, useContext } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");

  const ctx = useContext(GeneralContext);

  const handleBuy = async (e) => {
    e.preventDefault();
    setError("");

    if (qty <= 0 || price <= 0) {
      setError("Enter valid quantity and price");
      return;
    }

    try {
      await api.post("/trade", {
        name: uid,
        qty: Number(qty),
        price: Number(price),
        mode: "BUY",
      });

      ctx.triggerRefresh();
      ctx.closeTradeWindow();
    } catch (err) {
      setError(err.response?.data?.message || "Trade failed");
    }
  };

  return (
    <div className="container">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>{error && <span style={{ color: "red" }}>{error}</span>}</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuy}>
            Buy
          </button>
          <button className="btn btn-grey" onClick={ctx.closeTradeWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
