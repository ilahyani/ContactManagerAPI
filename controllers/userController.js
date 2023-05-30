const asyncHandler = require("express-async-handler")
const users = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

//@desc REGISTER USER
//@route POST /api/users
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    const userAvailable = await users.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("User already registered")
    }
    const hashedPasswd = await bcrypt.hash(password, 10)
    const newUser = await users.create({
        username: username,
        email: email,
        password: hashedPasswd,
    })
    if (newUser) {
        res.json({ _id: newUser.id, email: newUser.email })
    }
    else {
        res.status(400)
        throw new Error("User data invalid")
    }
})

//@desc LOGIN USER
//@route POST /api/users
//@access public

const logUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw (!email ? new Error("Please enter your email") : new Error("Please enter your password"))
    }
    const user = await users.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        )
        res.json({ accessToken })
    }
    else {
        res.status(401)
        throw new Error("email or password invalid")
    }
})

//@desc GET USER
//@route GET /api/users
//@access private

const getUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = { getUser, logUser, registerUser }