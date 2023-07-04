const keyModel = require("../models/key.model");
const { ConverOB } = require("../ultils/get.fields");

class keyService {
    static async findadnupdatekey({userID,publickey,refeshtoken}){
        try {
            const fitler ={
                user : userID,
              };
              const update ={
                  publicKey: publickey,
                  refreshtokened: [],
                  refreshtoken: refeshtoken
              };
              const option ={
                upsert: true,
                new: true
              }
            const tokens = await keyModel.findOneAndUpdate(fitler,update,option);
            return tokens ? tokens.publicKey :null;
        } catch (error) {
             console.log(error);
             return null;
        }
    }

    static async delekeybyid (keyid){
        try {
            const deleting = await keyModel.findOneAndRemove({user: ConverOB(keyid)});
        } catch (error) {
            return error;
        }
    }
    
    static async findkeybyuserid (id){
        try {
            return await keyModel.findOne({user: ConverOB(id)});
        } catch (error) {
            return error;
        }
    }
   
}


module.exports = keyService