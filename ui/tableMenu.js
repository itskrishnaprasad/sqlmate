import inquirer from "inquirer";
import chalk from "chalk";
import { styles } from "../utils/style.js";
import { getCurrentDb } from "../utils/helper.js";
import { branding, printActiveDb } from "./prompts.js";

export async function tableMenu(db) {
  try {
    let currentDb = await getCurrentDb(db);
    branding();
    printActiveDb(currentDb);

    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: chalk.yellow("What would you like to do?"),
        choices: [
          { name: "Create Table", value: "create_table" },
          { name: "Show All Tables", value: "show_tables" },
          { name: "Delete Table", value: "delete_table" },
          { name: "CURD Operations", value: "curd" },
          new inquirer.Separator(),
          { name: "Back", value: "back" },
          { name: "Exit", value: "exit" },
        ],
        validate: function (input) {
          if (!input) return "Please select an option.";
          return true;
        },
      },
    ]);

    return action;
  } catch (error) {
    console.log(styles.error("Error in table menu : ", error.message));
  }
}
