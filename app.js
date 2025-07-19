import { connectDb } from "./lib/db.js";
import { createDb, showDb } from "./lib/dbOps.js";
import { mainMenu } from "./ui/mainMenu.js";
import { branding } from "./ui/prompts.js";
import { clearScreen, runWithLoader } from "./utils/helper.js";
import { styles } from "./utils/style.js";

const db = await connectDb();
console.log(styles.success("✔️  db connected"));

async function start() {
  try {
    const choice = await mainMenu();

    switch (choice) {
      case "create_db":
        await createDb(db);
        runWithLoader("Returning to main menu...", start);
        break;
      case "show_dbs":
        clearScreen();
        branding();
        await showDb(db);
        start();
        break;
      case "delete_db":
        // etc.
        break;
      case "use_db":
        // show table menu
        break;
      case "config_conn":
        // setup SQL connection
        break;
      case "exit":
        clearScreen();
        process.exit(0);
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function endDb() {
  try {
    await db.end();
    console.log("db closed");
  } catch (error) {
    console.error("Error closing DB:", err.message);
  }
}
clearScreen();
branding();
start();
