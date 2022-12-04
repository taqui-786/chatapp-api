const storyModel = require('../model/stories')
const userModel = require("../model/Usermodel")
const mongoose = require('mongoose');


const CreateStory = async(req,res) =>{
    const newPost = new storyModel(req.body)
    try{
        await newPost.save()
        res.status(200).json("Story created")
    }catch(err){
        res.status(500).json(err)
    }
}

// GET TIMELINE POST 

const timelineStory = async(req,res) =>{
    const userId = req.params.id;
    try {
        const currentUserPost = await storyModel.find({userId : userId})
        const followingPosts = await userModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "stories",
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

module.exports = { CreateStory , timelineStory }