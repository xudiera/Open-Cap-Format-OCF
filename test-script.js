import { spawn } from "child_process";

var args = [
  "--experimental-vm-modules",
  "--experimental-json-modules",
  "--no-warnings",
];

args.push(
  process.platform === "win32"
    ? "node_modules/jest/bin/jest.js"
    : "node_modules/.bin/jest"
);

if (process.argv[2] && process.argv[2] === "watch") {
  args.push("--watch");
}

var childProcess = spawn("node", args, { stdio: "inherit" });

if (childProcess.stderr !== null) {
  childProcess.stderr.on("data", (data) => {
    console.log(data);
  });
}

childProcess.on("exit", (code, signal) => {
  if (code || signal) {
    console.log(`child process exited with code ${code} and signal ${signal}`);
    //core.setFailed(`child process exited with code ${code} and signal ${signal}`);
  }
});
