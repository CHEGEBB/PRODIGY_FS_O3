import User from '../models/auth.model.js';
import bcryptjs from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup =async (req, res) =>{
    try {
        const {fullname, username,password,confirmPassword,gender} = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const user = await User.findOne({ username });
        if(user) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        //hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);


        //profile pic
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender === 'male'? boyProfilePic : girlProfilePic
        });
        
        await newUser.save();

        if(newUser){
            //generate token and set cookie
            generateTokenAndSetCookie(newUser._id,res);
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }
        else{
            res.status(400).json({ message: 'Failed to create user' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
        
    }

};

export const login = async (req, res) =>{
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isCorrectPassword = await bcryptjs.compare(password, user?.password || "");
        
        if(!user ||!isCorrectPassword){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        //generate token and set cookie
        generateTokenAndSetCookie(user._id,res);
        res.json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        });
        
        
    } catch (error) {
        
    }

};

export const logout = (req, res) =>{
    console.log('Logout user');
}

