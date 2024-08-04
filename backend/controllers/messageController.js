
export const sendMessage = async (req,res)=>{
try {
    const {message}= req.body;
    const {id} = req.params;
    const senderId = 
    
} catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.log(error);
    
}
};