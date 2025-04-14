import { PostModel } from "../models/PostModel.js";

export const getPosts = async (req, res) => {
	try {
		const posts = await PostModel.find({});
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createPost = (req, res) => {
	try {
		const post = req.body;
		const newPost = new PostModel(post);
		newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	try {
		const updatePost = req.body;
		const post = await PostModel.findOneAndUpdate(
			{ _id: updatePost._id },
			updatePost,
			{ new: true }
		);    // new: true sẽ trả về bản ghi đã được cập nhật
		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
