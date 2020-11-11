const express = require("express");
const app = express();
const router = require("./routes/person");
const connectDB = require("./config/connectDB");

//middleware
app.use(express.json());
app.use("/persons", router);

// Connection database
connectDB();

// Connection server
const port = process.env.PORT || 3000;
app.listen(port, (error) => {
    error
        ? console.log("Connection failed")
        : console.log(`Server is running on port ${port}`);
});
