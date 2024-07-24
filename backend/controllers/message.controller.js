import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import mongoose from "mongoose";
import { gerRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = await req.body;
		const { id: receiverId } = await req.params;
		const senderId = await req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
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

		// await conversation.save()
		// await newMessage.save()

		await Promise.all([newMessage.save(), conversation.save()]);

		const recieverSocketId = gerRecieverSocketId(receiverId);
		if (recieverSocketId) {
			io.to(recieverSocketId).emit("newMessage", newMessage);
		}

		return res.status(200).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller", error.messag);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: recieverId } = req.params;
		// console.log(mongoose.models);

		const senderId = req.user._id;
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, recieverId] },
		}).populate("messages");

		if (!conversation) {
			res.status(200).json([]);
			return;
		}
		const messages = conversation.messages;
		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
