import dotenv from "dotenv";
import express from "express";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
} from "./database.js";

import cors from "cors";
const corsOptions = {
  origin: "http://localhost:5173",
};
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors(corsOptions));

app.use(express.json());
app.get("/transaction", async (req, res) => {
  const transaction = await getTransactions();
  res.status(200).send(transaction);
});
app.post("/transaction", async (req, res) => {
  const { text, amount } = req.body;
  await addTransaction(text, amount);

  res.status(201).send("Transaction added");
});
app.delete("/transaction/:id", async (req, res) => {
  const { id } = req.params;
  await deleteTransaction(id);
  res.status(200).send("Transaction deleted");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
