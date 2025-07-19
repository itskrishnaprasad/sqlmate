import mysql from "mysql2/promise";

let connection;

export async function connectDb() {
  if (connection) return connection;
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
    });
    console.log("connected")
    return connection;
  } catch (err) {
    console.log("Connection failed", err.message);
    throw err;
  }
}
