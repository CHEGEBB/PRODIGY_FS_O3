import User from '../models/auth.model.js';
import bcryptjs from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import axios from 'axios';

export const signup = async (req, res) => {
    try {
        const {fullname, username, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const user = await User.findOne({ username });
        if(user) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Generate random ID for profile picture
        const randomId = Math.floor(Math.random() * 100) + 1;

        // Get profile picture from RandomUser API
        let profilePic;
        try {
            const response = await axios.get(`https://randomuser.me/api/?gender=${gender === 'male' ? 'male' : 'female'}`);
            profilePic = response.data.results[0].picture.large;
        } catch (error) {
            console.error('Error fetching profile picture:', error);
            // Fallback to a default image if RandomUser API fails
            profilePic = gender === 'male' 
                ? `https://randomuser.me/api/portraits/men/${randomId}.jpg`
                : `https://randomuser.me/api/portraits/women/${randomId}.jpg`;
        }

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic
        });

        await newUser.save();

        if(newUser) {
            // Generate token and set cookie
            generateTokenAndSetCookie(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ message: 'Failed to create user' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isCorrectPassword = await bcryptjs.compare(password, user?.password || "");

        if(!user || !isCorrectPassword){
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token and set cookie
        generateTokenAndSetCookie(user._id, res);
        res.json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', {
            maxAge: 0
        });
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};