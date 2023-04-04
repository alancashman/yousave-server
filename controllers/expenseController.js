const { v4: uuid } = require("uuid");
const fs = require("fs");

function readExpense() {
  const expenseFile = fs.readFileSync("./data/expenses.json");
  const expenseData = JSON.parse(expenseFile);
  return expenseData;
}

function writeExpense(data) {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/expenses.json", stringifiedData);
}

exports.addExpense = async (req, res) => {
  const { name, amount, category, description, date } = req.body;

  if (!name || !category || !amount || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (typeof amount !== "number" || amount >= 0) {
    return res.status(400).json({ error: "Amount must be a negative number" });
  }
  const newExpense = {
    id: uuid(),
    name,
    amount,
    category,
    description,
    date,
    type: "expense",
    timestamp: Date.now(),
  };

  try {
    const expenseData = readExpense();
    expenseData.push(newExpense);
    writeExpense(expenseData);
    res.status(200).json({ message: "Expense added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expenseData = readExpense();
    const filteredExpenseData = expenseData.filter((expense) => {
      return expense.type === "expense";
    });
    res.status(200).send(filteredExpenseData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    let expenseData = readExpense();
    expenseData = expenseData.filter((expense) => expense.id !== id);
    writeExpense(expenseData);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

//   try {
// const incomeData = readExpense();
//   } catch (err) {
// console.error(err);
// res.status(500).json({ error: "Server error" });
//   }
// };
