const jwt = require('jsonwebtoken')
const _ = require('lodash')

const authenticateUser = async(req,res,next)=>{
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).json({errors:[{msg:'Authentication failed'}]})
    }
    try{
        const tokenData = jwt.verify(token,process.env.JWT_SECRET)
        req.user = tokenData
        next()
    }catch(e){
        return res.status(401).json({errors:[{msg:'Authentication Failed'}]})
    }
}

const authorizeUser = (roles) => {
    return function(req, res, next){
        if (roles.includes(req.user.role)) {
            next()
        } else {
            res.status(403).json({ error: 'you are not permitted to access this route' })
        }
    }
}

module.exports = {
    authenticateUser,
    authorizeUser
}