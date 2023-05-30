// Import required modules
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

// Define a middleware function to validate user access token
const validateToken = asyncHandler(async (req, res, next) => {
    // Get the Authorization header from the request
    const authHeader = req.headers.Authorization || req.headers.authorization
    
    // Check if the Authorization header exists and starts with "Bearer"
    if (authHeader && authHeader.startsWith("Bearer")) {
        // Extract the token from the Authorization header
        const token = authHeader.split(" ")[1]
        
        // Check if the token exists
        if (!token) {
            // If token does not exist, send a 401 Unauthorized response and throw an error
            res.status(401)
            throw new Error("User is not authorized or no access token provided")
        }
        else {
            // Verify the token using the ACCESS_TOKEN_SECRET and decode the token
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
                // If there is an error in verifying the token, send a 401 Unauthorized response and throw an error
                if (err) {
                    res.status(401)
                    throw new Error("User is not authorized")
                }
                // If the token is successfully verified, set the user property of the request object to the decoded token and call the next middleware function
                req.user = decodedToken.user
                next()
            })
        }
    }
})

// Export the validateToken middleware function
module.exports = validateToken