const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const PORT = 8000;

app.use(cors());

app.get("/data", (req, res) => {
  try {
    const data = fs.readFileSync("./data/data.json", "utf8");
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (err) {
    console.error("Error reading or parsing JSON file", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
