import inquirer from "inquirer";
import chalk from "chalk";

export async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: chalk.yellow("What would you like to do?"),
      choices: [
        { name: "Create Database", value: "create_db" },
        { name: "Show All Databases", value: "show_dbs" },
        { name: "Delete Database", value: "delete_db" },
        { name: "Use a Database", value: "use_db" },
        new inquirer.Separator(),
        { name: "⚙️  Configure SQL Connection", value: "config_conn" },
        { name: "❎  Exit", value: "exit" },
      ],
      validate: function (input) {
        if (!input) return "Please select an option.";
        return true;
      },
    },
  ]);

  return action;
}
