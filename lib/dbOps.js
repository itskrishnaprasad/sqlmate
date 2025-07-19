import inquirer from "inquirer";
import { clearScreen } from "../utils/helper.js";
import { styles } from "../utils/style.js";
import { branding } from "../ui/prompts.js";

export async function createDb(db) {
  clearScreen();
  branding();
  try {
    const { dbName } = await inquirer.prompt([
      {
        type: "input",
        name: "dbName",
        message: "Enter DB name:",
        validate: (input) => {
          if (!input.trim()) return "Database name cannot be empty!";
          if (!/^[a-zA-Z0-9_]+$/.test(input)) {
            return "Only letters, numbers, and underscores are allowed!";
          }
          return true;
        },
      },
    ]);
    await db.query(`CREATE DATABASE ${dbName}`);
    console.log(styles.success("Data base created"));
  } catch (error) {
    console.log(styles.error("Error creating database: ", error.message));
  }
}

export async function showDb(db) {
  try {
    const [rows] = await db.query("SHOW DATABASES");
    console.log(styles.info("Available Databases:"));
    rows.forEach((row) => {
      console.log(" -", row.Database);
    });
  } catch (error) {
    console.log(styles.error("Error Showing Databases"), error.message);
    throw error;
  }
}
