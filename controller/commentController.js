const commentModel = require('../model/commentModel')
const PostModel = require('../model/postModel')
const userModel = require('../model/Usermodel')
// CREATE A COMMENT 
const createPost = async(req,res) =>{
    const newPost = new commentModel(req.body)
    try{
        await newPost.save()
        res.status(200).json("Story created")
    }catch(err){
        res.status(500).json(err)
    }

}
const getComment = async(req,res) =>{
    try {
        const postId = req.params.postId;
        const comments = await commentModel.find({postId:postId})
        // const {username} = await userModel.find({_id:comments.userId})
        res.status(200).json(comments.sort((a,b)=>{
            return b.createdAt - a.createdAt
        }))        
    } catch (error) {
        res.status(500).json(error)
    }

}

module.exports ={ createPost , getComment}