const { Schema } = require("mongoose");

const OrdersSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },

    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    mode: {
      type: String,
      enum: ["BUY", "SELL"], // defensive
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = { OrdersSchema };
