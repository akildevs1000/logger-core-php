import fs from "fs";

let path = "../device-sdk/appsettings.json";

let ip = null;
process.argv.forEach((v, i) => {
  if (i == 2) ip = v;
});

// Read the existing JSON file
const jsonData = fs.readFileSync(path);

// Parse the JSON data into a JavaScript object
const data = JSON.parse(jsonData);

// Modify the JavaScript object as needed
data.LocalIP = ip;

// Convert the JavaScript object back into JSON format
const updatedJsonData = JSON.stringify(data, null, 2);

// Write the updated JSON data to the file
fs.writeFile(path, updatedJsonData, (err) => {
  if (err) throw err;
  console.log("JSON file has been updated!");
});
