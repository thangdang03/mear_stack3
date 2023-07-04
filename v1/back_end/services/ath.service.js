const { BAD_REQUEST, NOT_FOUND, FofbidentError } = require("../cores/responsive.error");
const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { getfiles } = require("../ultils/get.fields");
const { findbyemail, finduserbyid } = require("../models/repostory/user.repostory");
const { createtokens } = require("../ultils/create.tokens");
const keyService = require("./key.serviec");

class ATHService {

      static async resgister({email,password,name}){
            //validate value
            if(!email &&!password && !name) throw new NOT_FOUND('cant get the vaulue');
            const finduser = await findbyemail({email});
            if(finduser) throw new BAD_REQUEST('The Email was registered');
            const haspassword = await bcrypt.hash(password,10);
            const newuser= await user.create({
                name: name,
                email: email,
                password: haspassword,
                roles: ['user']
            });
            if(!newuser) throw new BAD_REQUEST('create err');
            return getfiles({fildes:['_id','name',"email"],object: newuser});
      }

      static async login({password,email}){
            if(!email && !password) throw new NOT_FOUND('cant get the vaulue');
            const finduser = await findbyemail({email});
            if(!finduser) throw new FofbidentError('You are not regiter ');

            const checkpassword =await  bcrypt.compare(password,finduser.password);
            if(!checkpassword) throw new BAD_REQUEST('invalid request');

            // create private and pulic key
            const {privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
                modulusLength: 4096,
                publicKeyEncoding:{
                    type:'pkcs1',
                    format: 'pem'
                }
            });
            
            const pbstrt = publicKey.toString();
            const pubclickeystr = crypto.createPublicKey(pbstrt);
            const tokens = await createtokens({payload :{
                _id: finduser._id,
                name : finduser.name,
                roles: finduser.roles,
              },publickey: publicKey,privatekey: privateKey});
              
            const publickeystring = await keyService.findadnupdatekey({publickey: publicKey,userID: finduser._id,refeshtoken: tokens.refeshtoken});
            return({
                user: getfiles({fildes: ['_id','name','email'],object: finduser}),
                tokens
            })
      }

      static async logout(useID){
        console.log(useID)
        const deletuserkey = await keyService.delekeybyid(useID); 
        return deletuserkey
    }
   
    static async handelRefeshtoken({refeshtoken,user,keystore,res}){
        if(!refeshtoken) throw new FofbidentError(' you need to login');
        console.log({refeshtoken,user,keystore});

        // find refesh usered 
        console.log(keystore.refehstokened.includes(refeshtoken));
        //check key used
        if(keystore.refehstokened.includes(refeshtoken)){
            const delekey = keyService.delekeybyid(user._id);
            res.clearCookie('refeshtoken');
            throw new FofbidentError('SOMETHING wrong happent , please relogin');
        }

        // find user
        const founduser = await finduserbyid(user._id);
        if(!founduser) throw new NOT_FOUND('your are log register');

        const {privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
            modulusLength: 4096,
            publicKeyEncoding:{
                type:'pkcs1',
                format: 'pem'
            }
        });
        const pbstrt = publicKey.toString();
        const pubclickeystr = crypto.createPublicKey(pbstrt);

        const tokens = await createtokens({payload :{
            _id: founduser._id,
            name : founduser.name,
            roles: founduser.roles,
          },publickey: publicKey,privatekey: privateKey});
          
        const publickeystring = await keyService.findadnupdatekey({publickey: publicKey,userID: founduser._id,refeshtoken: tokens.refeshtoken});
        await keystore.updateOne({$set:{
            refreshtoken: tokens.refeshtoken
        },$addToSet:{
            refehstokened: refeshtoken
        }})
        return({
            user: getfiles({fildes: ['_id','name','email'],object: founduser}),
            tokens
        })
    }

}

module.exports= ATHService