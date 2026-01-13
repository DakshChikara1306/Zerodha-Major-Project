const { Schema } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },

  password: { type: String, required: true },

  // Available trading balance
  equity: {
    type: Number,
    default: 15000,
  },
});

module.exports = { UserSchema };
