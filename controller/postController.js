const mongoose = require('mongoose');
const postModel = require('../model/postModel');
const userModel = require("../model/Usermodel")


// CREATE A POST 
const createPost = async(req,res) =>{
    const newPost = new postModel(req.body)
    try{
        await newPost.save()
        res.status(200).json("Story created")
    }catch(err){
        res.status(500).json(err)
    }

}

// GET A POST 
const getPost = async(req,res) =>{
    const id = req.params.id;
    try {
        const post = await postModel.find({userId:id})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}
// UPDATE A POST 
const updatePost = async(req,res) =>{
    const postId = req.params.id;
    const {userId} = req.body;
    try {
        const post = await postModel.findById(postId)
        if(post.userId === userId){
            await post.updateOne( {$set : req.body})
            res.status(200).json("Post updated");
        }else[
            res.status(403).json("Action forbidden!")
        ]
    } catch (error) {
        res.status(500).json(error)
    }
}

// DELETE A POST 
const deletePost = async(req,res) =>{
    const id = req.params.id;
    const {userId} = req.body
    try {
        const post  = await postModel.findById(id)
        if(post.userId === userId){
            res.status(403).json("Action forbidden!")
        }else{
            await post.deleteOne();
            res.status(200).json("Post deleted.")

        }
    } catch (error) {
        res.status(500).json(error)

    }
}

// LIKE POST 
const likePost = async(req,res) =>{
    const id = req.params.id;
    const {userId , username , profilePicture } = req.body
    try {
        const post = await postModel.findById(id)
        if(!post.likes.includes(userId)){
            await post.updateOne( {$push : {likes : userId }})
            res.status(200).json("Post liked")
        }else{
            await post.updateOne( {$pull : {likes : userId}})
            res.status(200).json("Post disliked")
        }
    } catch (error) {
        
    }
}


// GET TIMELINE POST 

const timelinePost = async(req,res) =>{
    const userId = req.params.id;
    try {
        const currentUserPost = await postModel.find({userId : userId})
        const followingPosts = await userModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "posts",
                    localField:"following",
                    foreignField: "userId",
                    as : "followingPosts"
                }
            },
            {
                $project: {
                    followingPosts:1,
                    _id:0
                }
            }
        ])
        res.status(200).json(currentUserPost.concat(...followingPosts[0].followingPosts)
        .sort((a,b)=>{
            return b.createdAt - a.createdAt
        }))



    } catch (error) {
        res.status(500).json(error)

    } 
}
// LIKED USERS 
const Actionusers = async(req,res)=>{
    const {postId} = req.body;
    const post = await postModel.findById(postId)
    const users = post.likes
    for (let i = 0; i < users.length; i++) {
        // console.log(arr[i]);
        let finalData =  await userModel.findById(users[i])
      }
    const dataArray = []
    dataArray.push(finalData)
    res.json(dataArray)

}

module.exports = {createPost,getPost,updatePost,timelinePost,likePost,Actionusers,deletePost}