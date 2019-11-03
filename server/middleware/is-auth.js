const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("===token===",token)
        const decoded = jwt.verify(token, '2k19');
        req.user = decoded ;
        next();
    } catch (error) {
        console.log("===error===",error)
        return res.status(401).json({
            success :false , 
            message: 'Unauthorized'
        });
    }
}