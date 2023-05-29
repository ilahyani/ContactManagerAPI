const app = require("express")()
const dotenv = require("dotenv").config()

app.use("/api/contacts", require("./routes/contactRoutes"))

app.listen(process.env.PORT, () => {
    console.log(`server listening on ${process.env.HOST}:${process.env.PORT}`)
})