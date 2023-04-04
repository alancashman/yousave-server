const {
  addIncome,
  getIncome,
  deleteIncome,
} = require("../controllers/incomeController");

const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const router = require("express").Router();

router
  .get("/get-income", getIncome)
  .post("/add-income", addIncome)
  .delete("/delete-income/:id", deleteIncome)
  .get("/get-expense", getExpense)
  .post("/add-expense", addExpense)
  .delete("/delete-expense/:id", deleteExpense);

module.exports = router;
