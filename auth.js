const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "Correct signin required."
        });
    }

    try {
        const response = jwt.verify(token, JWT_SECRET);
            req.userId = response.id;
            next();
    }
    catch (e) {
        return res.status(403).json({
            message: "Invalid or malformed token"
        });
    }
}

module.exports = {
    auth,
    JWT_SECRET
}