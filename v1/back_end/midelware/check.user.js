const {FofbidentError,Authererror,NOT_FOUND}=require("../cores/responsive.error");
const jwt = require("jsonwebtoken");
const keyService = require("../services/key.serviec");
const {Handelerrormidelware}= require('../ultils/hadellerror');

const checkacesstoken=Handelerrormidelware(
        async(req,res,next)=>{
            //get tokens user id
            const tokens = req.headers.tokens;
            const userid = req.headers.userid;
            if(!userid) throw new NOT_FOUND('undifind userid');
            if(!tokens) throw new NOT_FOUND('undifind tokens');
            const acess = tokens.split(" ")[1];
            //verify user
            const findkey  = await keyService.findkeybyuserid(userid);
            console.log(findkey);
            if(!findkey) throw new Authererror('invalid request');
            const decode =  await jwt.verify(acess,findkey.publicKey,(err,user)=>{
                  if(err){
                    throw new Authererror("invalid token");
                  }
                  req.user =user;
                  req.keystore= findkey;
                  return next();
            });
      }
    )

    module.exports = {checkacesstoken}