const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3006;
const mongoose = require('mongoose');


//Database connection
mongoose.connect(
    "mongodb+srv://vishal:12345@cluster0.nqdbc.mongodb.net/ManagementToolForHR?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
const employeeRoute = require("./src/routes/employee.router");
const welcomePage = require("./src/routes/welcome.router");

// Register Router
app.use('/api/employee', employeeRoute);
app.use('/', welcomePage);

//Start Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})