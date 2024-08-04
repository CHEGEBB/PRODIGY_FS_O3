
export const sendMessage = async (req,res)=>{
try {
    const {message}= req.body;
    const {id} = req.params;
    const senderId = req.user._id;

  let conversation =  await Conversation.findOne({
        participants:{
            $all:[senderId,id]
        }
    });
    
    if(!conversation){
        conversation = await Conversation.create({
            participants:[senderId,id]
        });
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message,
    });
		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

    
} catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.log(error);
    
}
};