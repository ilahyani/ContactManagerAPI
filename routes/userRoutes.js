const router = require("express").Router()
const { model } = require("mongoose")
const { getUser, logUser, registerUser } = require("../controllers/userController")

router.route("/register").post(registerUser)
router.route("/login").post(logUser)
router.route("/current").get(getUser)

module.exports = router