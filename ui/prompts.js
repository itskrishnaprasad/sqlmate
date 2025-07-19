import { clearScreen } from "../utils/helper.js";
import { styles } from "../utils/style.js";
import boxen from "boxen";
export function branding() {
  clearScreen();
  console.log(
    boxen(styles.info("Your friendly SQL assistant — no queries required!"), {
      title: styles.title("SQLMATE"),
      titleAlignment: "center",
      padding: 0.5,
      borderStyle: "round",
    })
  );
}

export function printActiveDb(dbName) {
  console.log(
    boxen(styles.info(`Database in use :- ${dbName}`), {
      title: styles.title("ACTIVE DB"),
      titleAlignment: "left",
      padding: 0.5,
      borderStyle: "round",
    })
  );
}
