const express = require("express");
const app = express();
const cors = require("cors"); // Import the CORS middleware

require('dotenv').config();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors()); // Use CORS middleware

require("./config/database").dbconnect();

const user = require("./routes/user");

app.use("/api/v1", user);

app.get("/", (req, res) => {
    res.send("HOME PAGE");
});

app.listen(PORT, () => {
    console.log(`App Listen on ${PORT}`);
});
