import ora from "ora";

export function clearScreen() {
  process.stdout.write("\x1B[2J\x1B[0f");
}

export function runWithLoader(text, fn, delay = 2500) {
  const spinner = ora(text).start();
  setTimeout(() => {
    spinner.succeed("Done ✅");
    fn();
  }, delay);
}

export async function getCurrentDb(db) {
  const [rows] = await db.query("SELECT DATABASE() AS currentDb");
  return rows[0].currentDb;
}
