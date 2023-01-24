const mongoose = require("mongoose");

mongoose.connect(process.env.mongo_url);

const db = mongoose.connection;

db.on("connected", () => {
    console.log("MongoDB Connected Successful");
});

db.on("error", (err) => {
    console.log("MongoDB Connection Failed");
});