const { v4: uuid } = require("uuid");
const fs = require("fs");

function readIncome() {
  const incomeFile = fs.readFileSync("./data/expenses.json");
  const incomeData = JSON.parse(incomeFile);
  return incomeData;
}

function writeIncome(data) {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/expenses.json", stringifiedData);
}

exports.addIncome = async (req, res) => {
  const { name, amount, category, description, date } = req.body;

  if (!name || !category || !amount || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Amount must be a positive number" });
  }
  const newIncome = {
    id: uuid(),
    name,
    amount,
    category,
    description,
    date,
    type: "income",
    timestamp: Date.now(),
  };

  try {
    const incomeData = readIncome();
    incomeData.push(newIncome);
    writeIncome(incomeData);
    res.status(200).json({ message: "Income added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getIncome = async (req, res) => {
  try {
    const incomeData = readIncome();
    const filteredIncomeData = incomeData.filter((income) => {
      return income.type === "income";
    });
    res.status(200).send(filteredIncomeData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    let incomeData = readIncome();
    incomeData = incomeData.filter((income) => income.id !== id);
    writeIncome(incomeData);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

//   try {
// const incomeData = readIncome();
//   } catch (err) {
// console.error(err);
// res.status(500).json({ error: "Server error" });
//   }
// };
