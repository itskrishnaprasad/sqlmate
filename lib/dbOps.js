import inquirer from "inquirer";
import { clearScreen } from "../utils/helper.js";
import { styles } from "../utils/style.js";
import { branding } from "../ui/prompts.js";
import { handleDbMenu } from "../controllers/dbController.js";
import { tableMenu } from "../ui/tableMenu.js";

let dbs = [];

export async function createDb(db) {
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
  branding();
  try {
    [dbs] = await db.query("SHOW DATABASES");
    console.log(styles.info("Available Databases:"));
    dbs.forEach((row) => {
      console.log(" -", row.Database);
    });
  } catch (error) {
    console.log(styles.error("Error Showing Databases"), error.message);
    throw error;
  }
}

export async function useDb(db) {
  let rows = [];
  try {
    await showDb(db);
    dbs.forEach((row) => {
      rows.push(row.Database);
    });

    const { dbName } = await inquirer.prompt([
      {
        type: "input",
        name: "dbName",
        message: "Enter DB name:",
        validate: (input) => {
          if (
            !rows.map((name) => name.toLowerCase).includes(input.toLowerCase)
          ) {
            return `Database "${input}" not found. Please try again.`;
          }
          return true;
        },
      },
    ]);
    await db.changeUser({ database: dbName });
    console.log(styles.success("database switched"));
    tableMenu(db);
  } catch (error) {
    console.log(styles.error("Error in switching db", error.message));
  }
}

export async function deleteDb(db) {
  let arr = [];
  try {
    await showDb(db);
    dbs.forEach((row) => {
      arr.push(row.Database);
    });

    const { dbName } = await inquirer.prompt([
      {
        type: "input",
        name: "dbName",
        message: "Enter DB name:",
        validate: (input) => {
          if (
            !arr.map((name) => name.toLowerCase).includes(input.toLowerCase)
          ) {
            return `Database "${input}" not found. Please try again.`;
          }
          return true;
        },
      },
    ]);

    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `Are you sure you want to delete the database '${dbName}'?`,
      },
    ]);

    if (!confirm) {
      console.clear();
      console.log(chalk.yellow("❗ Deletion cancelled."));
      return;
    }

    await db.query(`DROP DATABASE ${dbName}`);

    console.log(styles.success(`database ${dbName} deleted`));
  } catch (error) {
    console.log(styles.error("Error in deleting db :", error.message));
  }
}
