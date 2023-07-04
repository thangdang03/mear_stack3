const { ConverOB } = require("../../ultils/get.fields");
const user = require("../user.model")

const findbyemail=async({email})=>{
    return user.findOne({email: email}).lean();
}

const finduserbyid = async(userid)=>{
    try {
        return await user.findById(ConverOB(userid)).lean();
    } catch (error) {
        return error;
    }
}
module.exports ={
    findbyemail,
    finduserbyid
}
