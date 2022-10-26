import CommentModel from "../Model/CommentModel.js";
import PostModel from "../Model/PostModel.js";
import UserModel from "../Model/UserModel.js";

const CommentService = {
    createComment: async function createComment(request, response){
        console.log(request.body)
        try{
            const userId = request.userId;
            const body = request.body;
            if(userId !== body.user){
                response.status(404).json("Access denied. No user")
            }
            const previousComments = await CommentModel.find();
            const number = previousComments.length;
            const post = await PostModel.find({_id: body.post});
            if(post.length === 0) {
                response.status(404).json("Access denied.")
            }
            const user = await UserModel.find({_id: body.user});
            if(user.length === 0){
                response.status(404).json("Access denied.")
            }
            const theComment = await CommentModel.create(
                {
                    ...body,
                    id: number,
                    post: post[0],
                    user: user[0]
                }
            );
            console.log(theComment)
            const updatedPost = post[0].comments
            updatedPost.push(theComment._id);
            console.log(updatedPost)
            const newPost = await PostModel.findByIdAndUpdate(
                {_id: body.post},
                {comments: updatedPost}
            )
            response.status(200).json({comment: {theComment, newPost}});
        } catch(error){
            response.status(500).json(
                {
                    message: "Something went wrong"
                }
            )
        }
    }
}


export default CommentService;



