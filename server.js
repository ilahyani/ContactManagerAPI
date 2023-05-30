const express = require("express")
const dotenv = require("dotenv").config()
const errorHandler = require("./middleware/errorHandler")
// const validateTokenHandler = require("./middleware/validateTokenHandler")
const connectDB = require("./config/dbConnection")
const app = express()

connectDB()
app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`server listening on ${process.env.HOST}:${process.env.PORT}`)
})