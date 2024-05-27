import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

const connection = mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

export async function getTransactions() {
  const transaction = await connection.query("SELECT * FROM transaction");
  return transaction[0];
}

export async function addTransaction(text, amount) {
  const { insertId } = await connection.query(
    "INSERT INTO transaction (text, amount) VALUES (?, ?)",
    [text, amount]
  );
  return insertId;
}

export async function deleteTransaction(id) {
  await connection.query("DELETE FROM transaction WHERE id = ?", id);
}
