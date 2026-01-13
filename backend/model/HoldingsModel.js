const { model } = require("mongoose");
const { HoldingsSchema } = require("../schemas/HoldingsSchema");

// Single responsibility: DB model only
const HoldingsModel = model("holding", HoldingsSchema);

module.exports = { HoldingsModel };
