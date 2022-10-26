import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        id: {
            type: String
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

const UserModel = mongoose.model("RedditUser", UserSchema);


export default UserModel;







