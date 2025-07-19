import { mainMenu } from "../ui/mainMenu.js";
import { createDb, deleteDb, showDb, useDb } from "../lib/dbOps.js";
import { clearScreen, runWithLoader } from "../utils/helper.js";
import { styles } from "../utils/style.js";

export async function handleDbMenu(db) {
  try {
    const choice = await mainMenu();

    switch (choice) {
      case "create_db":
        await createDb(db);
        handleDbMenu(db);
        break;
      case "show_dbs":
        await showDb(db);
        handleDbMenu(db)
        break;
      case "delete_db":
        await deleteDb(db);
        handleDbMenu(db);
        break;
      case "use_db":
        await useDb(db);
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
