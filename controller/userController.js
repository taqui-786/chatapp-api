const userModel = require('../model/Usermodel');
const bcrypt = require('bcrypt');
// get a User 
const getUser = async(req,res) =>{
    const id = req.params.id;
    try {
        const user = await userModel.findById(id);
        if(user){
            const {password , ...otherDetails } = user._doc
            res.status(200).json(otherDetails)
        }else{
            res.status(404).json("No such user exists.")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// update user 
const updateUser = async(req,res) =>{
    const id = req.params.id;
    const {currentUserId , currentUserAdminStatus , password} = req.body;
    if(id === currentUserId || currentUserAdminStatus){
        try {

            if(password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password , salt)
            }
            
            const user = await userModel.findByIdAndUpdate(id,req.body, {new:true})
            res.status(200).json(user)


        } catch (error) {
            
        res.status(500).json(error)
        }
    }else{
        res.status(404).json("Access denied !")
    }
}

// DELETE USER 
const deleteUser = async(req,res) =>{
    const id = req.params.id;
    const {currentUserId,currentUserAdminStatus} = req.body;
    if(currentUserAdminStatus || currentUserId){


        try {
        await userModel.findByIdAndDelete(id)
        res.status(200).json("user Deleted Successfully")    
        } catch (error) {
            res.status(500).json(error)

        }
    }else{
        res.status(404).json("Access denied !")

    }
}

// FOLLOW USER 
const followUser = async(req,res) =>{
    const id = req.params.id;
    const {currentUserId} = req.body
    if(currentUserId === id){
        res.status(403).json("Action Forbidden")
    }else{
        try {
            const Followuser = await userModel.findById(id)
            const followinguser = await userModel.findById(currentUserId)
            if(!Followuser.followers.includes(currentUserId)) {
                await Followuser.updateOne({$push : {followers: currentUserId}})
                await followinguser.updateOne({$push : {following: id}})
                res.status(200).json("User followed")
            }else{
                res.status(403).json("User is already followed")
            }
        } catch (error) {
            
        }
    }
}

// UNFOLLOW USER 
const UnFollowUser = async(req,res) =>{
    const id = req.params.id;
    const {currentUserId} = req.body
    if(currentUserId === id){
        res.status(403).json("Action Forbidden")
    }else{
        try {
            const Followuser = await userModel.findById(id)
            const followinguser = await userModel.findById(currentUserId)
            if(Followuser.followers.includes(currentUserId)) {
                await Followuser.updateOne({$pull : {followers: currentUserId}})
                await followinguser.updateOne({$pull : {following: id}})
                res.status(200).json("User Unfollowed")
            }else{
                res.status(403).json("User is not followed")
            }
        } catch (error) {
            
        }
    }
}


// SEARCH USER FUNCTION 
const searchUser = async (req,res) =>{
    const {id} = req.body;
    const keyword = req.query.search ?{
        $or:[
            {username: {$regex: req.query.search, $options: "i"}},
            {firstname: {$regex: req.query.search, $options: "i"}},
            {lastname: {$regex: req.query.search, $options: "i"}},
        ]
    }:{}
    const users = await userModel.find(keyword)
    .find({_id: { $ne: id}})
    res.send(users)
    
}


const whoPost = async (req,res)=>{
    const {id} = req.body
    const users = await userModel.findById(id)
    res.send(users)
}





module.exports = {getUser ,updateUser,deleteUser,followUser,UnFollowUser,searchUser,whoPost}