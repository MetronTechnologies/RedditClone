import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        id: {
            type: String
        },
        postname: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "RedditUser"
        },
        subreddit: {
            type: Schema.Types.ObjectId,
            ref: "Subreddit"
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "RedditComment"
            }
        ]
    }
);

const PostModel = mongoose.model("RedditPost", PostSchema);


PostModel
    .watch()
    .on(
        'change',
        data => console.log(data)
    )

export default PostModel;

















