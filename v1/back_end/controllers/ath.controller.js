const {OK, CREATED}=require("../cores/resposive.sucess");
const ATHService = require("../services/ath.service");
class athController{
    async register (req,res){
        new CREATED({
            message: 'uppdate sucess',
            metadata: await ATHService.resgister(req.body)
        }).send({res})
    }
    async login (req,res){
        console.log(req.body);
        const dataget= await ATHService.login(req.body);
        new OK({
            message: 'login sucess',
            metadata: {user: dataget.user,acesstoken: dataget.tokens.acesstoken}
        }).send({res,cookie:{store:"refeshtoken",data: dataget.tokens.refeshtoken}})
    }

    async logout (req,res){
        new OK({
            message: 'uppdate sucess',
            metadata: await ATHService.logout(req.headers.userid)
        }).send({res,cookie:{clear: true ,store: "refeshtoken"}})
    }

    async hadelRefeshtoken (req,res){
        const dataget = await ATHService.handelRefeshtoken({
            refeshtoken: req.cookies.refeshtoken,
            user: req.user,
            keystore: req.keystore,res});
            
        new OK({
            message: 'logout sucess',
            metadata: dataget
        }).send({res,cookie:{store:"refeshtoken",data: dataget.tokens.refeshtoken}});
    }
}

module.exports = new athController;