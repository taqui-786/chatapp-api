const MessageModel = require('../model/MessageModel')

const sendMessage =  async(req,res) =>{
    const {chatId , senderId , text} = req.body
    const message = new MessageModel({
        chatId,
        senderId,
        text
    });
    try {
const result = await message.save()
res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}
const receiveMessage =  async(req,res) =>{
    const chatId = req.params.ChatId
    try {
        const result = await MessageModel.find({chatId:chatId});
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {sendMessage , receiveMessage}