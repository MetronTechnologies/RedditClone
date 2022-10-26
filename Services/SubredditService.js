import SubredditModel from "../Model/SubredditModel.js";
import UserModel from "../Model/UserModel.js";


const SubredditService = {
    createSubreddit: async function createSubreddit(request, response) {
        try {
            const userId = request.userId;
            const body = request.body;
            if(userId !== body.user){
                response.status(404).json("Acess denied")
            }
            const user = await UserModel.find({ _id: body.user });
            const subreddits = await SubredditModel.find();
            const number = subreddits.length;
            const savedSubreddit = await SubredditModel.create({ ...body, user: user[0], id: number + 1, posts: [] });
            response.status(200).json(savedSubreddit);
        } catch (error) {
            response.status(500).json(
                {
                    message: "Something went wrong"
                }
            )
        }
    },
    findAllSubreddits: async function findAllSubreddits(request, response) {
        const subreddits = await SubredditModel.find({}).populate("user")
        response.status(200).json(subreddits);
    },
    findSubredditByUserId: async function findSubredditByUserId(request, response) {
        const { id } = request.params;
        const subreddits = await SubredditModel
            .find({ user: id })
            .populate("user")
            .populate("posts");
        response.status(200).json(subreddits);
    },
    editSubreddit: async function editSubreddit(request, response){
        try{
            const {id, name, description, user} = request.body;
            const userId = request.userId;
            const body = request.body;
            if(userId !== user){
                response.status(404).json("You can not edit this.")
            }
            const updatedSubreddit = {name, description}
            const subreddit = await SubredditModel.findByIdAndUpdate({_id: id}, updatedSubreddit);
            response.json(subreddit)
        } catch(error){

        }
    }
}




export default SubredditService;




