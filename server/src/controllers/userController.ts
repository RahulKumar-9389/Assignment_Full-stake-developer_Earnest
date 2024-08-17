import userModel from '../models/userModel.js';
import { Response, Request } from 'express';


// <-------------- Register Controller ---------------->
export async function registerController(req: Request, res: Response) {
    try {


        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(404).send({
                success: false,
                message: "Please fill the all required fields!"
            })
        }


        // chek if user already registerd
        const isUserExist = await userModel.findOne({ email });
        if (isUserExist) {
            return res.status(200).send({
                success: false,
                message: "Email already registerd!"
            })
        }

        // save user details 
        const user = new userModel({
            username,
            email,
            password
        });

        await user.save();

        res.status(201).send({
            success: true,
            message: "User register successfully!",
            userDetails: {
                name: user.username,
                email: user.email
            }
        });


    } catch (error) {
        console.log(`Error while user register : ${error}`);
        res.status(500).send({
            success: false,
            message: "User registration failed",
            Error: error
        })
    }
};


// <-------------- Login Controller ---------------->
export async function loginController(req: Request, res: Response) {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Please fill the all required fields!"
            })
        };

        // chek user is register user 
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Invalid credentials"
            })
        };

        // compare password
        const compared_password = await user.comparePassword(password);
        if (!compared_password) {
            return res.status(401).send({
                success: false,
                message: "Invalid Password"
            })
        }

        // Generate Token
        const token = await user.generateToken();
        res.status(200).send({
            success: true,
            message: "Login successfully!",
            user: {
                name: user.username,
                email: user.email
            },
            token
        },
        )

    } catch (error) {
        console.log(`Error while user login : ${error}`);
        res.status(500).send({
            success: false,
            message: "Login Failed!",
            Error: error
        })
    }
}