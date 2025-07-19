import { styles } from "../utils/style.js";
import boxen from "boxen";
export function branding() {
  console.log(
    boxen(styles.info("Your friendly SQL assistant — no queries required!"), {
      title: styles.title("SQLMATE"),
      titleAlignment: "center",
      padding: 0.5,
      borderStyle: "round",
    })
  );
}