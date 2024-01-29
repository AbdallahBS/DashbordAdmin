import axios from "axios";
import { jwtDecode } from 'jwt-decode';

axios.defaults.baseURL=process.env.REACT_APP_SERVER_DOMAIN;


/**Make api request */
/** get user name form token*/
export async function getUsername(){
    const token = localStorage.getItem('token');
    if(!token) return Promise.reject("Cannot find token");
    let decode = jwtDecode(token)
    return decode;
}
/**Aithenticate function */
export async function authenticate(username){
    try{
        return await axios.post('/api/authenticate',{username})
    }   
    catch(error){
        return {error :"Username dosent exist"}
    }
}
/**register user function */
 export async function registerUser(credentials){
    try{
        const {data : {msg},status }=await axios.post(`/api/register`,credentials)
        
        return Promise.resolve(msg)
    }
    catch(error){
        return Promise.reject({error})
    }
 }
export async function verifyPassword({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        console.log("gmmmm")
        return Promise.reject({ error: "PASSWORD_MISMATCH", message: "Password doesn't Match...!" });
    }
}
