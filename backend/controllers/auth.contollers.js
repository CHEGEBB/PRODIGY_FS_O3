

export const signup =async (req, res) =>{
    try {
        const {fullname, username,password,confirmPassword,gender} = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
    } catch (error) {
        
    }

};

export const login = (req, res) =>{
    console.log('Login user');
    alert('Login user');

};

export const logout = (req, res) =>{
    console.log('Logout user');
}

