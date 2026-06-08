const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
    type: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);