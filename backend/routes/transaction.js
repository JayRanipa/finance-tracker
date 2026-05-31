const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

// Add Transaction
router.post("/add", async (req, res) => {
  try {
    const { type, amount, category, description } = req.body;

    const transaction = new Transaction({
      type,
      amount,
      category,
      description
    });

    await transaction.save();

    res.status(201).json({
      message: "Transaction added successfully",
      transaction
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get All Transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({
      createdAt: -1
    });

    res.json(transactions);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;