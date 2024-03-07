const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path'); // Import the path module

require('dotenv').config();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

require("./config/database").dbconnect();

const user = require("./routes/user");

app.use("/api/v1", user);

// Serve the 'uploads' directory statically
app.use('/api/v1/uploads', express.static(path.join(__dirname, './controller/uploads')));

app.get("/", (req, res) => {
    res.send("HOME PAGE");
});

app.listen(PORT, () => {
    console.log(`App Listen on ${PORT}`);
});
