import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config({ path: "../.env" });

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// GET ALL IMAGES
router.route('/').get(async(req, res) => {
    try {
        const posts = await Post.find({});

        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, data: error });
    }
});

// POST THE IMAGE
router.route('/').post(async(req, res) => {
    try {
        console.log("post pic");
        const{ name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        console.log(photoUrl.url);

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        });

        const temp = await Post.find({});
        console.log('nope cant get  here: '+ temp);

        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: error });
    }
});


export default router;