const router = require("express").Router()
const { model } = require("mongoose")
const validateTokenHandler = require("../middleware/validateTokenHandler")
const { getUser, logUser, registerUser } = require("../controllers/userController")

router.post("/register", registerUser)
router.post("/login", logUser)
router.get("/current", validateTokenHandler, getUser)

module.exports = router