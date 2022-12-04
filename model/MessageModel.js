const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatId: { type: String },
    senderId: { type: String },
    senderPic: { type: String , default:"https://th.bing.com/th/id/OIP.SqTcfufj92gVRBT45d045wAAAA?pid=ImgDet&rs=1" },
    text: { type: String },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model('Message',MessageSchema)
module.exports = MessageModel