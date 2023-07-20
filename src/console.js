import inquirer from "inquirer";
import { exec } from "child_process";

const questions = [
  {
    type: "input",
    name: "ip",
    message: "Enter your ip",
    default: "192.168.2.174",
  },
  {
    type: "input",
    name: "socket_url",
    message: "Enter your socket url",
    default: "ws://localhost:5000/Websocket",
  },
  {
    type: "input",
    name: "server_name",
    message: "Enter your server name",
    default: "DESKTOP-F729IDL\\SQLEXPRESS01",
  },
  {
    type: "input",
    name: "databse",
    message: "Enter your database name",
    default: "UNIS",
  },
  {
    type: "input",
    name: "user_name",
    message: "Enter database user name",
    default: "root",
  },
  {
    type: "input",
    name: "password",
    message: "Enter database password",
    default: "*******",
  },
];
inquirer
  .prompt(questions)
  .then((ans) => {
    console.log("\n");
    console.log("node ip-updater.js " + ans.ip);
    let params = `${ans.server_name} ${ans.databse} ${ans.user_name} ${ans.password}`;
    command(`node db-updater.js ${params}`);
    console.log("\n Your inputs are configured.");
    console.log("\nPress CTRL + c to close.");
    while (true) {}
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

const command = (url) => {
  exec(url, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
};
