const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    index: true, // faster user queries
  },

  name: { type: String, required: true },
  qty: { type: Number, required: true },
  avg: { type: Number, required: true },
  price: { type: Number, required: true },

  // kept as STRING to avoid breaking frontend
  net: { type: String, default: "0%" },
  day: { type: String, default: "0%" },
});

module.exports = { HoldingsSchema };
