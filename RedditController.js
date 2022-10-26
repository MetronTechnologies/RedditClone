import express from "express";
import UserService from "./Services/UserService.js";
import AuthService from "./Services/AuthService.js";
import CommentService from "./Services/CommentService.js";
import SubredditService from "./Services/SubredditService.js";
import PostService from "./Services/PostService.js";
const RedditController = express.Router();


RedditController.post("/createuser", UserService.register);
RedditController.post("/login", UserService.login);
RedditController.post("/logout", AuthService, UserService.logout);


RedditController.post("/createsubreddit", AuthService, SubredditService.createSubreddit);
RedditController.get("/getallsubreddit", SubredditService.findAllSubreddits);
RedditController.post("/editsubreddit", AuthService, SubredditService.editSubreddit);
RedditController.get("/getusersubreddit/:id", SubredditService.findSubredditByUserId);


RedditController.post("/createpost", AuthService,  PostService.createPost);


RedditController.post("/createcomment", AuthService,  CommentService.createComment);



export default RedditController;

