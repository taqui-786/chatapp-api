const mongoose = require('mongoose');


const NotificationSchema = mongoose.Schema({
    senderName: {type:String},
    senderPic: {type:String},
    senderId: {type:String},
    to: {type:String},
    notifications: {type:Array},
})
const NotificationModel = mongoose.model('Notification',NotificationSchema);

module.exports= NotificationModel;