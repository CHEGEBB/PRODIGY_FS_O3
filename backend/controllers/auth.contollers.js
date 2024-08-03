import User from '../models/auth.model.js';
import bcryptjs from 'bcryptjs';

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

export const login = (req, res) =>{
    console.log('Login user');
    alert('Login user');

};

export const logout = (req, res) =>{
    console.log('Logout user');
}

