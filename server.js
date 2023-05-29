const express = require("express")
const dotenv = require("dotenv").config()
const errorHanler = require("./middleware/errorHandler")
const connectDB = require("./config/dbConnection")
const app = express()

connectDB()
app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use(errorHanler)

app.listen(process.env.PORT, () => {
    console.log(`server listening on ${process.env.HOST}:${process.env.PORT}`)
})