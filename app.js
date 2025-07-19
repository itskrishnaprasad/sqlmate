import { handleDbMenu } from "./controllers/dbController.js";
import { connectDb } from "./lib/db.js";
import { mainMenu } from "./ui/mainMenu.js";
import { branding } from "./ui/prompts.js";
import { clearScreen, runWithLoader } from "./utils/helper.js";
import { styles } from "./utils/style.js";

const db = await connectDb();
console.log(styles.success("✔️  db connected"));

async function start() {
  await handleDbMenu(db);
}

branding();
start();
