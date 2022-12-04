const mongoose = require('mongoose');


const UserSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        firstname:{
            type:String,
            required:true
        }, 
        lastname:{
            type:String,
            required:true
        },
         isAdmin:{
            type:Boolean,
            default: false
        },
       
        profilePicture:{type:String , default:"https://th.bing.com/th/id/OIP.SqTcfufj92gVRBT45d045wAAAA?pid=ImgDet&rs=1"},
        
        coverPicture:{type:String},
        livesIn    :{type:String},
        About:{type:String},
        relationship:{type:String},
        workAt:{type:String},
        followers:[],
        following:[],
    },
    {
        timestamps:true
    }
)

const userModel = mongoose.model('user',UserSchema)
module.exports = userModel