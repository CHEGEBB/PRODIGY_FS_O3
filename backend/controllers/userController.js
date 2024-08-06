import User from "../models/auth.model.js";
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.error("Error in getAllUsers: ", error);  // Log the full error
        res.status(500).json({ error: "Internal server error" });
    }
};

export default  getAllUsers;