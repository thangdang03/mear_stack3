const _=require('lodash');
const mongoose = require('mongoose')

const getfiles = ({fildes=[],object={}})=>{
      return _.pick(object,fildes);
}

// [Prodcut_name,Product_thumb] = {Prodcut_nam=1,Prodtct_thumb=1}

const getObject =(select = ['thang ','dawng'])=>{
    const cureent =Object.fromEntries(select.map(el=>[el,1]))
    return cureent
}

//convert to objectid
const ConverOB=(id)=>{
    return  new mongoose.Types.ObjectId(id);
}



// remve null underfind
const removeUnderfineOB =obj=> {
    // objectkey conver objct to array with index is key in object
    console.log({obj})

    Object.keys(obj).forEach(k=>{
            if(obj[k]===null){
                delete obj[k]
            }
    });
    return obj  
}

//prodictname,thumdbdetail
//queryL{ product_atribuet.thuem}


// converOjecttodbs(thang);
module.exports = {
    getfiles,
    getObject,
    ConverOB,
    removeUnderfineOB
}