const jwt = require('jsonWebtoken');

const verifyToken = async (req, res, next) => {
    let decodedToken;
    const token = req.body.token;
    console.log(token);
    if (!token) return res.status(400).json({ message: "token not found" });
    try {
        decodedToken = jwt.verify(token, 'code');
        if (!decodedToken) return res.status(400).json({ message: 'invalid user' });
    }
    catch (err) {
        console.log(err);
    }
    req.userId = decodedToken.id;
    next();
}

module.exports = verifyToken;