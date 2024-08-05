// Import necessary models and socket utilities
import Conversation from "../models/convoModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../sockets/socket.js";

// Controller function to send a message
export const sendMessage = async (req, res) => {
    try {
        // Extract message content from request body
        const { message } = req.body;
        // Extract receiver ID from request parameters
        const { id: receiverId } = req.params;
        // Get sender ID from authenticated user
        const senderId = req.user._id;

        // Find existing conversation or create a new one
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        // Add the new message to the conversation
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // Save both conversation and new message in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // Implement Socket.IO functionality for real-time messaging
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // Emit the new message event to the specific receiver
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // Send successful response
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller function to get messages for a conversation
export const getMessages = async (req, res) => {
    try {
        // Extract the ID of the user to chat with from request parameters
        const { id: userToChatId } = req.params;
        // Get the authenticated user's ID
        const senderId = req.user._id;

        // Find the conversation and populate the messages
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // Populate with actual message documents, not just references

        // If no conversation found, return an empty array
        if (!conversation) return res.status(200).json([]);

        // Extract messages from the conversation
        const messages = conversation.messages;

        // Send successful response with messages
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};