import UserModel from "../Model/UserModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const UserService = {
    register: async function createUser(request, response) {
        const user = request.body;
        try {
            const userCheck = await UserModel.find({ email: user.email });
            if (userCheck.length) {
                return response.status(400).json(
                    { message: "User with email " + user.email + " already exists" }
                )
            }
            if (user.password !== user.confirmPassword) {
                return response.status(400).json(
                    { message: "Passwords do not match" }
                )
            }
            const hashedPass = await bcrypt.hash(user.password, 12);
            const users = await UserModel.find();
            const numbers = users.length;
            const newUser = { ...user, password: hashedPass, id: numbers + 1 };
            const savedUser = await UserModel.create(newUser);
            const token = jwt.sign(
                {
                    email: savedUser.email,
                    id: savedUser._id
                },
                "test",
                { expiresIn: "1h" }
            )
            response.status(200).json(
                {
                    redditUser: token, user: savedUser
                }
            )
        } catch (error) {
            response.status(500).json(
                {
                    message: "Something went wrong"
                }
            )
        }

    },
    login: async function login(request, response) {
        const body = request.body;
        try {
            const userCheck = await UserModel.find({ email: body.email });
            if (userCheck.length == 0) {
                return response.status(404).json(
                    {
                        message: "User doesn't exist"
                    }
                )
            }
            const passVerify = await bcrypt.compare(body.password, userCheck[0].password);
            console.log(passVerify)            
            if (!passVerify) {
                return response.status(400).json(
                    {
                        message: "Invalid credentials"
                    }
                )
            }
            const token = jwt.sign(
                {
                    email: userCheck[0].email,
                    id: userCheck[0]._id
                },
                "test",
                { expiresIn: "1h" }
            );
            console.log(token)
            response.status(200).json(
                {
                    redditUser: token, user: userCheck
                }
            )
        } catch (error) {
            response.status(500).json(
                {
                    message: "Something went wrong"
                }
            )
        }
    },
    logout: async function logout(request, response) {
        const body = request.body;
        const userId = request.userId;
        try {
            const userCheck = await UserModel.find({ email: body.email });
            if (userCheck.length == 0) {
                return response.status(404).json(
                    {
                        message: "User doesn't exist"
                    }
                )
            }
            const token = jwt.sign(
                {
                    email: userCheck[0].email,
                    id: userId
                },
                "",
                { expiresIn: "1" }
            );
            console.log(token)
            response.status(200).json(
                {
                    redditUser: token
                }
            )
        } catch (error) {
            response.status(500).json(
                {
                    message: "Something went wrong"
                }
            )
        }
    }
}


export default UserService;



