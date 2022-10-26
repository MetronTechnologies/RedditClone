import PostModel from "../Model/PostModel.js";
import SubredditModel from "../Model/SubredditModel.js";
import UserModel from "../Model/UserModel.js";

const PostService = {
    createPost: async function createPost(request, response){
        try{
            const userId = request.userId;
            const body = request.body;
            if(userId !== body.user){
                response.status(404).json("Access denied. No user")
            }
            const posts = await PostModel.find();
            const number = posts.length;
            const user = await UserModel.find({ _id: body.user });
            if(user.length === 0){
                response.status(404).json("Access denied.")
            }
            const subreddit = await SubredditModel.find({ _id: body.subreddit });
            if(subreddit === 0){
                response.status(404).json("Access denied")
            }
            const savedPost = await PostModel.create(
                {
                    ...body,
                    id: number,
                    user: user[0],
                    subreddit: subreddit[0],
                    comment: []
                }
            );
            const updatedSubreddit = subreddit[0].posts;
            updatedSubreddit.push(savedPost._id);
            const newSubreddit = await SubredditModel.findByIdAndUpdate({_id: body.subreddit}, {posts: updatedSubreddit});
            response.status(200).json({post: {savedPost, newSubreddit}});
        } catch (error) {
            response.status(500).json(
                {
                    message: "Something went wrong"
                }
            )
        }
    }
}



export default PostService;


