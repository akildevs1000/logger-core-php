import WebSocket from "ws";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

// const fs = require("fs");

let path = null;
process.argv.forEach((v, i) => {
  if (i == 2) path = v;
});

let socket = new WebSocket(path);

socket.onopen = () => console.log("connected");
socket.onerror = (err) => console.log(err);

// let url = "../backend/logs/logs.csv";
let url = "debug.csv";

socket.onmessage = ({ data }) => {
  let {
    UserCode: UserID,
    DeviceID,
    RecordDate: LogTime,
    RecordNumber: SerialNumber,
  } = JSON.parse(data).Data;

  let str = `${UserID},${DeviceID},${LogTime.replace(
    "T",
    " "
  )},${SerialNumber}`;

  if (UserID > 0) {
    axios
      .post("http://localhost:8000/insert_record", {
        UserID,
        DeviceID,
        LogTime,
      })
      .then(({ data }) => {
        let result = JSON.stringify(data);
        // fs.appendFileSync(url, result + "\n");
        console.log(result);
      })
      .catch((error) => console.log(error));
  }
};
