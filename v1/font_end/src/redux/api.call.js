import axios from "axios";
import { loginstart,loginerrr,loginsucess, registerstart, registersucess, registererrr } from "./ath.slide";
import jwt_decode from "jwt-decode"
const axiosnew = axios.create();

const hadelrefeshtoken=async()=>{
    const user = JSON.parse(window.localStorage.getItem("user"));
    try {
        const data =  axios.post('http://localhost:7070/v1/ath/hadelrefeshtoken',{},{
            headers:{
                userid: user.user._id,
                tokens: `Bear ${user.acesstoken}`
            },
            withCredentials: true
        })
        return data
    } catch (error) {
        console.log(error);
    }
}

axiosnew.interceptors.request.use(async (config)=>{
    console.log(config)
    const user = JSON.parse(window.localStorage.getItem("user"));
    let date = new Date();
    const decodeJwt = await jwt_decode(user.acesstoken);
    console.log(decodeJwt)
    if(decodeJwt.ext < date.getTime()/1000){
        const data = await hadelrefeshtoken();
        const usernew = {
            user: data.metadata.user,
            acesstoken: data.tokens.acesstoken
        }
        window.localStorage.setItem(JSON.stringify(usernew));
        config.headers ={
            userid: data.metadata.user._id,
            tokens: 'Bears '+ data.tokens.acesstoken
        }
    }
    
    config.headers ={
        userid: user.user._id,
        tokens: 'Bears '+ user.acesstoken
    }
    console.log(config.headers)
    return config
},err=>{
    return Promise.reject(err)
});
const loginUser=async({dispath,user,navigate})=>{
      dispath(loginstart);
      
      try {
         const res = await axios.post('http://localhost:7070/v1/ath/login',user, {
            withCredentials: true
          });
          await dispath(loginsucess(res.data.metadata));
          window.localStorage.setItem('user',JSON.stringify(res.data.metadata));
         navigate("/");
      } catch (error) {
        dispath(loginerrr());
      }
}



const regiserUser=async({dispath,user,navigate})=>{
    dispath(registerstart);
    try {
       const res = await axios.post('http://localhost:7070/v1/ath/register',user, {
          withCredentials: true
        });
       dispath(registersucess(res.rerult));
       navigate("/login");
    } catch (error) {
      dispath(registererrr());
    }
}

const getproduct =async()=>{
    try {
        const res = await axios.get('http://localhost:7070/v1/products',{
            withCredentials: true
        });
        return res.data.metadata;
    } catch (error) {
        return null;
    }
}


const getaproduct =async(id)=>{
    try {
        const res = await axios.get(`http://localhost:7070/v1/products/${id}`);
        console.log(res.data.metadata);
        return res.data.metadata;
        
    } catch (error) {
        return null;
    }
}

const searchbykeysearch =async(keySearch)=>{
    try {
        const res = await axios.get(`http://localhost:7070/v1/products/search/?keysearch=${keySearch}`);
        console.log(res.data.metadata);
        return res.data.metadata;
        
    } catch (error) {
        return null;
    }
}

const getproductbyid =async(useid)=>{
    try {
        const res = await axios.get(`http://localhost:7070/v1/products/user`,
        {
            headers: {
              userid: useid
            }
        }
        )
        console.log(res.data.metadata);
        return res.data.metadata;
        
    } catch (error) {
        return null;
    }
}

const createProduct =async(formdata)=>{
    try {
        const res = await axiosnew.post(`http://localhost:7070/v1/products`,formdata,)
        console.log(res.data.metadata)
        return res.data.metadata;
        
    } catch (error) {
        return null;
    }
}

const deletebyid =async(_id)=>{
    try {
        const res = await axiosnew.delete(`http://localhost:7070/v1/products/${_id}`)
        console.log(res.data.metadata)
        return res.data.metadata;
        
    } catch (error) {
        return null;
    }
}

const updateproduct=async(id,payload)=>{
    try {
        const res = await axiosnew.put(`http://localhost:7070/v1/products/${id}`,payload)
        console.log(res.data.metadata)
        return res.data.metadata;
    } catch (error) {
        return null
    }
}
const logout=async()=>{
    try {
        const res = await axiosnew.post(`http://localhost:7070/v1/ath/logout`)
        return res.data.metadata;
    } catch (error) {
        return null
    }
}


export {
    loginUser,
    regiserUser,
    getproduct,
    getaproduct,
    logout,
    searchbykeysearch,
    getproductbyid,
    createProduct,
    deletebyid,
    updateproduct
}