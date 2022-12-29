const mongoose = require('mongoose');


const postSchema = mongoose.Schema(
    {
        userId: {type:String, required:true},
       
        description: String,
        likes: [],
        image: String,
       
    },
    {
        timestamps: true,

    }
);
const PostModel = mongoose.model('Post',postSchema)
module.exports = PostModel;