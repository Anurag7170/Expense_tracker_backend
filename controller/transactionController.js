const UserModal = require("../models/User");
const Transaction = require("../models/transaction");

exports.createTransaction = async (req, res) => {
  try {
    const { title, transactionType, Amount } = req.body;
    const { id } = req.user;

    const response = await Transaction.create({
      title,
      transactionType,
      Amount,
    });

    const user = await UserModal.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          transaction: response._id,
        },
      },
      { new: true }
    ).populate("transaction");

    res.status(200).json({
      success: true,
      data: response,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error in server${error}`,
    });
  }
};

exports.getAllTransaction = async (req, res) => {
  try {
    const { id } = req.user;

    const response = await UserModal.findById(id).populate("transaction");

    const allTransaction = response?.transaction;

    res.status(200).json({
      success: true,
      allTransaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error in server${error}`,
    });
  }
};

exports.summaryTransactions = async (req, res) => {
  try {
    const { id } = req.user;

    const response = await UserModal.findById(id).populate("transaction");

    const allTransaction = response.transaction;
    let totalExpense = 0;
    let totalIncome = 0;

    for (let i = 0; i < allTransaction.length; i++) {
      if (allTransaction[i].transactionType == "Income") {
        totalIncome = totalIncome + allTransaction[i].Amount;
      }
      if (allTransaction[i].transactionType == "Expense") {
        totalExpense = totalExpense + allTransaction[i].Amount;
      }
    }

    res.status(200).json({
      success: true,
      TotalIncome: totalIncome,
      Expense: totalExpense,
      Saving: totalIncome - totalExpense,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error in server${error}`,
    });
  }
};

exports.deleteTranscation = async (req, res) => {
  try {
    const { id } = req.user;
    const { ID } = req.params;

    const response = await UserModal.findByIdAndUpdate(
      { _id: id },

      {
        $pull: {
          transaction: ID,
        },
      },
      { new: true }
    );

    const resp = await Transaction.findByIdAndDelete(ID);

    return res.status(200).json({
      success: true,
      message: "Transaction is Deleted",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error in server${error}`,
    });
  }
};
