import axios from 'axios';
const url = '/api/post';

export default class API{
    //to get all the posts from the server
    static async getAllPost(){
        const res = await axios.get(url);
        return res.data;
    }

    //to get single post by id
    static async getPostByID(id){
        const res = await axios.get(url+'/'+id);
        return res.data;
    }

    //to insert post into database
    static async addPost(post){
        const res = await axios.post(url, post);
        return res.data;
    }

    //to insert tribute into database
    static async addTribute(id, post){
        const res = await axios.put(url+'/'+id, post);
        return res.data;
    }

    //to add visitor to private memorials
    static async addVisitor(id, post){
        const res = await axios.put(url+'/addVisitor/'+id, post);
        return res.data;
    }

    //to create donation campaign
    static async createDonation(id, post){
        const res = await axios.put(url+'/createDonation/'+id, post);
        return res.data;
    }

    //to upload new picture to gallery
    static async addPicture(id, post){
        const res = await axios.put(url+'/gallery/'+id, post);
        return res.data;
    }

    //to update post into database
    static async updatePost(id, post){
        const res = await axios.patch(url+'/'+id, post);
        return res.data;
    }

    //to delete post from database
    static async deletePost(id){
        const res = await axios.delete(url+'/'+id);
        return res.data;
    }
}