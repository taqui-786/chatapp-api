const ChatModel = require('../model/ChatModel')
const userModel = require('../model/Usermodel')
const CreateChat = async(req,res) => {
const newChat = new ChatModel({
    members :[req.body.senderId , req.body.receiverId]

})
try {
    const result = await newChat.save();
    res.status(200).json(result)
} catch (error) {
    res.status(500).json(error)
}
}

const userChat = async(req,res) =>{
    try {
        const chat = await ChatModel.find({
            members: {$in: [req.params.userId]}
        })
        let ResultMembers = chat.map((elem)=> elem.members )
        let FinalResult =[ ] 
        
        for (let i = 0; i < ResultMembers.length; i++) {
    FinalResult.push( await (await userModel.find({_id:ResultMembers[i].filter((val)=> val !== req.params.userId)})).concat(chat[i]))
//   console.log(arr[i]);
}
res.status(200).json(FinalResult)
   
    } catch (error) {
        res.status(500).json(error)
    }
}

const findChat = async(req,res) => {
    try {
        // const chat = await ChatModel.findOne({
        //     members: {$all: [req.params.firstId, req.params.secondId]}
        // })
        // res.status(200).json(chat)
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
    } catch (error) {
        res.status(500).json(error)

    }
}

module.exports={CreateChat,userChat,findChat}