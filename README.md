- Programming Language --> JavaScript
- Runtime environment ---> NodeJs
Framework ---> ExpressJs
Database (development) ---> MongoDB
Database (production) ---> Mongo Atlas

To Register a user or sign up ---> http://localhost:5000/reddit/createuser
	{
		"firstname": "Clark",
		"lastname": "Kent",
		"username": "superman",
		"email": "clark@gmail.com",
		"password": "clark",
		"confirmPassword": "clark"
	}
copy and keep the jwt token and the _id as this action will log the user in immediately


To Login if a user is registered ---> http://localhost:5000/reddit/login
{
	"email": "clark@gmail.com",
	"password": "clark"
}
copy and keep the jwt token and the _id as this action will log the user in immediately



To create a subreddit (A subreddit can only be created when a user is logged in) ---> http://localhost:5000/reddit/createsubreddit
Add the jwt token in the authorization tab
{
	"name": "Justice And Truth",  //This is the name of the subreddit
	"description": "What are some things superman can do to make metropolis a better place?", //What is the subreddit all about?
	"user": "63598cc9950cd7fdfbf1469f"  //This is the _id from the login or register
}
copy and keep the _id for the subreddit



To edit a subreddit (A subreddit can only be edited if a it has already been created, and by the user who created it)
Add the jwt token in the authorization tab
{
	"id": "6358560d3cc9424448562c83", //This is the _id of the subreddit to be edited
	"name": "America Justice", //The new name of the subreddit
	"description": "Justice the american way",  //The new description of the subreddit
	"user": "635850a274b3f9319d8934a1"  //The _id of the user who created the subreddit
}



To create a post (A post can only be created under a subreddit) ---> http://localhost:5000/reddit/createpost
Add the jwt token in the authorization tab
{
	"postname": "Lana Luthor",  //The name of the post
	"description": "The hide out and lair of the lex luthor has finally been discovered. He is found to have been hiding the injustice society all along",
	"user": "6358411e41b3e1ca5b9d3906", //This is the _id copied from login
	"subreddit": "6358560d3cc9424448562c83" //This is the _id copied from subreddit
}
copy and keep the _id for the post



To write a comment (A comment can only be made under a post) ---> http://localhost:5000/reddit/createcomment
Add the jwt token in the authorization tab
{
	"text": "Finally, Justice will be served",  //This is the comment
	"post": "63594b5c686533d7969f0300", // This is the _id for the post
	"user": "6358411e41b3e1ca5b9d3906"  //This is the _id for the user
}









