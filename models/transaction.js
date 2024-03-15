const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ["Income", "Expense"],
    required: true
  },
  Amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
