import User from '../models/auth.model.js';

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

        //profile pic
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            fullname,
            username,
            password,
            gender,
            profilePic: gender === 'male'? boyProfilePic : girlProfilePic
        });
        
        await newUser.save();

        res.status(201).json(newUser);

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

