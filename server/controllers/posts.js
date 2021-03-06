import PostMessage from '../models/postMessages.js';
import mongoose from 'mongoose';
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message:error.message}) }
}

export const createPost = async (req, res) => {
    console.log(req.body)
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const updatePost = async(req, res)=>{
    try {
        const {id:_id} = req.params;
        const post = req.body;
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that id');
        const updatedPost = PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({message:error.message});
        
    }
}