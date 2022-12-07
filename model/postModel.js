const mongoose =require('mongoose');


const postSchema = mongoose.Schema(
    {
        userId: {type:String, required:true},
       
        description: String,
        likes: [],
        image: String,
        // expireAt: { 
        //     type: Date, 
        //     default: Date.now,
        //     index: { expires: '2m' }
        //   }
    },
    {
        timestamps: true,

    }
);
// postSchema.index({"expire_at": 1 }, { expireAfterSeconds: 5 });
const PostModel = mongoose.model('Post',postSchema)
module.exports = PostModel;