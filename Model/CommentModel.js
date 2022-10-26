import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        id: {
            type: String
        },
        text: {
            type: String,
            required: true
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "RedditPost"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "RedditUser"
        }
    }
);

const CommentModel = mongoose.model("RedditComment", CommentSchema);

CommentModel
    .watch()
    .on(
        'change',
        data => console.log(data)
    )


export default CommentModel;























