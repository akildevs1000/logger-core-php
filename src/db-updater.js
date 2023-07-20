import fs from "fs";

let path = "database.json";

const jsonData = fs.readFileSync(path);
const data = JSON.parse(jsonData);
let args = process.argv;
args.splice(0, 2);
args.forEach((v, i) => {
  let key = Object.keys(data)[i];
  data[key] = v;
});

const updatedJsonData = JSON.stringify(data, null, 2);

fs.writeFile(path, updatedJsonData, (err) => {
  if (err) throw err;
  console.log("JSON file has been updated!");
});
