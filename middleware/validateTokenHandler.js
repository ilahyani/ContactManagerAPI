const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1]
        // console.log(authHeader.split()[0], authHeader.split()[1])
        if (!token) {
            res.status(401)
            throw new Error("User is not authorized or no access token provided")
        }
        else {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
                if (err) {
                    res.status(401)
                    throw new Error("User is not authorized")
                }
                req.user = decodedToken.user
                next()
            })
        }
    }
})

module.exports = validateToken