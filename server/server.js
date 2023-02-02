const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const dbconfig = require("../server/config/db");


app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("../server/routes/AuthRoutes"));



// listen to port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    }
);

module.exports = app;