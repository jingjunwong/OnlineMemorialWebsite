const Post = require('../models/posts');
const fs = require('fs');

module.exports = class API {
    //fetch all posts
    static async fetchAllPost(req, res){
        try{
            const posts = await Post.find();
            //res status 200 means everything ok
            res.status(200).json(posts);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }

    //fetch post by ID
    static async fetchPostById(req, res){
        const id = req.params.id; //get id from url
        try{
            const post = await Post.findById(id);
            res.status(200).json(post);
        }catch(err){
            res.status(404).json({message:err.message});
        }
    }

    //create a post 
    static async createPost(req, res){
        const post = req.body;
        const imagename = req.file.filename;
        post.image = imagename;
        try{
            await Post.create(post);
            res.status(201).json({message: 'Memorial created successfully'}) //status 201 means created something
        }catch(err){
            res.status(400).json({message: err.message});
        }
    }

    //create a tribute message
    static async createTribute(req, res){
        const post = req.body;
        const id = req.params.id;

        const arrayOfDisrespectfulWords = ['arse', 'arsehead', 'arsehole', 'ass', 'asshole', 'bastard', 'bitch', 'bloody', 'bollocks', 'brotherfucker', 'bugger', 'bullshit', 'child-fucker', 'cock', 'cocksucker', 'crap', 'cunt', 'damn', 'damn it', 'dick', 'dickhead', 'dyke', 'frigger', 'fuck', 'fucker', 'goddamn', 'godsdamn', 'hell', 'kike', 'nigga', 'nigra', 'piss', 'prick', 'pussy', 'shit', 'shite', 'slut', 'spastic', 'turd', 'twat', 'whore', 'wanker'];
        const preparedMessage = post.tributeMessage.toLowerCase();
        try
        {
            if(arrayOfDisrespectfulWords.find(v => preparedMessage.includes(v)))
            {
                res.status(208).json({message: 'Disrespectful words detected! Please rewrite your tribute message!'});
            }
            else
            {
                await Post.findByIdAndUpdate(id, {$push:{tributes:post}});
                res.status(200).json({message: 'Tribute created successfully'});
            }
        }
        catch
        {
            res.status(404).json({message: err.message});
        }
    }

    //add visitor to private pages
    static async addVisitor(req, res){
        const visitor = req.body;
        const id = req.params.id;
        try{
            await Post.findByIdAndUpdate(id, {$push:{allowedVisitor:visitor.username}});
            res.status(200).json({message: 'Visitor added successfully'});
        }
        catch{
            res.status(400).json({message: err.message});
        }
    }

    //create donation campaign
    static async createDonation(req, res)
    {
        const data = req.body;
        const id = req.params.id;
        try
        {
            await Post.findByIdAndUpdate(id, {$push:{donation:data}});
            res.status(200).json({message: 'Campaign Initiated Successfully'});
        }
        catch
        {
            res.status(400).json({message: err.message});
        }
    }

    //upload a picture to gallery
    static async addPicture(req, res){
        const post = req.body;
        const imagename = req.file.filename;
        post.image = imagename;
        const id = req.params.id;
        try{
            await Post.findByIdAndUpdate(id, {$push:{gallery:post}});
            res.status(200).json({message: 'Picture Uplaoded to Gallery Successfully'});
        }
        catch{
            res.status(404).json({message: err.message});
        }
    }

    //update a post
    static async updatePost(req, res){
        const id = req.params.id;
        let new_image = '';
        if(req.file){
            new_image = req.file.filename;
            try{
                fs.unlinkSync('./uploads/'+req.body.old_image);
            }catch(err){
                console.log(err);
            }
        }else{
            new_image = req.body.old_image;
        }

        const newPost = req.body;
        newPost.image = new_image;

        try{
            await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({message: 'Memorial updated successfully'});
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }

    //delete a post
    static async deletePost(req, res){
        const id = req.params.id;
        try{
            const result = await Post.findByIdAndDelete(id);
            if(result.image != ''){
                try{
                    fs.unlinkSync('./uploads/'+result.image);
                }catch(err){
                    console.log(err);
                }
            }
            if(result.gallery){
                try{
                    fs.unlinkSync('./uploads/'+result.gallery.image);
                }catch(err){
                    console.log(err);
                }
            }
            res.status(200).json({message: 'Memorial deleted successfully!'});
        }catch(err){
            res.status(404).json({message:err.message});
        }
    }
}