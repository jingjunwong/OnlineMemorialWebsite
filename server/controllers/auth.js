const User = require("../models/user");
const jwt = require('jsonwebtoken');

const jwtSecret = 'arandomstring';

module.exports = class UserAPI {
    static async registerAccount(req, res, next){
        const user = req.body;
        const usernameObject = { 'username': user.username};
        const foundUser = await User.findOne(usernameObject);
        if(foundUser)
        {
            return res.status(206).json({message: "Username is taken, please try another username!"});
        }
        if(user.password.length < 8){
            return res.status(206).json({message: "Password length must be atleast 8 characters long!"});
        }
        try{
            await User.create(user);
            res.status(201).json({message: 'Account registered successfully! Please proceed to login!'});
        }
        catch (err){
            res.status(404).json({message: "User registration failed!", error: err.message})
        }
    }

    static async login(req, res, next){
        const user = req.body

        if(!user.username){
            return res.status(400).json({message: "Please enter username!"});
        }
        if(!user.password){
            return res.status(400).json({message: "Please enter password!"});
        }

        try{
            const foundUser = await User.findOne(user);
            if(!foundUser){
                return res.status(206).json({message:"Login not successful! Wrong Username or Password!", error:"User not found"});
            }
            else{
                //var session;
                //session = req.session;
                //session.userid = user.username;
                //console.log(req.session);
                const maxAge = 60*60;
                /*const token = jwt.sign(
                    {username: user.username},
                    jwtSecret,
                    {expiresIn: maxAge}
                );*/
                res.cookie("jwt", user.username, {
                    httpOnly:false,
                    maxAge: maxAge*1000
                });
                console.log(user);
                res.status(200).json({message:"Login successful!", user});
            }
        }
        catch(err){
            return res.status(400).json({message:"An error occurred", error:err.message});
        }
    }

    static async findUser(req, res)
    {
        const username = req.params.username;
        const usernameObject = {'username': username};
        try
        {
            const foundUser = await User.findOne(usernameObject);
            if(!foundUser)
            {
                console.log("no user found")
                return res.status(404).json({message:"User not found!", error:"User not found"});
            }
            else
            {
                return res.status(200).json(foundUser);
            }
        }
        catch(err)
        {
            return res.status(400).json({message:"An error occurred", error:err.message});
        }
    }

    static async updateUser(req, res)
    {
        const id = req.params.id;
        const newUser = req.body;
        try
        {
            await User.findByIdAndUpdate(id, newUser);
            res.status(200).json({message:"User Updated Successfully"});
        }
        catch(err)
        {
            res.status(404).json({message:err.message});
        }
    }
}