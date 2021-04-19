const jwt = require("jsonwebtoken")

function auth (req,res,next){
    const token = req.header('auth-token')
    if(!token) return res.status(401).send("Acces Denied")

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(error){
        res.status(400).send('invalid token')
    }
}

module.exports = auth