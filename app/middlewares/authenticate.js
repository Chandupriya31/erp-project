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

module.exports = authenticateUser