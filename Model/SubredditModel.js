import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubredditSchema = new Schema(
    {
        id: {
            type: String
        },
        name: {
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
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "RedditPost",
                default: ""
            }
        ]
    }
);



const SubredditModel = mongoose.model("Subreddit", SubredditSchema);

SubredditModel
    .watch()
    .on(
        'change',
        data => console.log(data)
    )




export default SubredditModel;










