const express = require("express");
const { login, Signup } = require("../controller/userController");
const {
  createTransaction,
  getAllTransaction,
  summaryTransactions,
  deleteTranscation,
} = require("../controller/transactionController");
const { auth } = require("../middleware/auth");
const router = express.Router();

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", Signup);

// Route for creating transcation
router.post("/transaction", auth, createTransaction);

// Route for get transcation
router.get("/getAlltransaction", auth, getAllTransaction);

// Route for summary of user transcation
router.get("/summary", auth, summaryTransactions);

// Route for deleting transcation
router.delete("/deleteTransaction/:ID", auth, deleteTranscation);

module.exports = router;
