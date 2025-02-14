const jwt = require("jsonwebtoken")

module.exports = {
    jwtVerify: async(req, res, next) =>{
        try {
            const token = await req.headers["x-access-token"] || req.headers["authorization"]
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            req.UserId = decoded.UserId
            if (token) {
                next();
            }
        } catch (error) {
            res.send({ status: false, message: 'invalid token', data: error })
        }
    },
}