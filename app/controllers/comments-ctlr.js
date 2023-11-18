const Comment = require('../models/comment-model')

const commentsCtlr = {}

commentsCtlr.create = async(req,res)=>{
    const body = req.body
    const comments = new Comment(body)
    comments.userId = req.user.id
    try{
        await comments.save()
        res.json(comments)
    }catch(e){
        res.status(500).json(e)
    }
}

commentsCtlr.list = async(req,res)=>{
    try{
        const comments = await Comment.find()
        res.json(comments)
    }catch(e){
        res.status(500).json(e)
    }
}

module.exports = commentsCtlr