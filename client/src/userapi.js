import axios from 'axios';
const url = '/api/auth';

export default class UserAPI{
    static async login(user){
        const newURL = url+'/login';
        const res = await axios.post(newURL, user);
        return(res.data);
    }

    static async register(user){
        const newURL = url+'/register';
        const res = await axios.post(newURL, user);
        return (res.data)
    }

    static async findUser(username)
    {
        const newURL = url+'/userProfile/'+username;
        const res = await axios.get(newURL);
        return (res.data);
    }

    static async updateUser(id, user)
    {
        const newURL = url+'/userProfile/'+id;
        const res = await axios.patch(newURL, user);
        return (res.data);
    }
}