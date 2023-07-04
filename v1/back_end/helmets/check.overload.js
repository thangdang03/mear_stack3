const mongoose =require("mongoose");
const os = require('os');
const {time }=require("../constanct/constanct");
const checkconnetion =async()=>{
    const numconnetion =  mongoose.connections.length;
    console.log("num collection ::",numconnetion);
}

const checkoverload =()=>{
    setInterval(() => {
        const numConnection = mongoose.connections.length;
         const numCore = os.cpus().length;
         const nummemory = process.memoryUsage().rss;
         //ex maxcore = 4 8 cocnnect
         console.log(`NumConnection ::${numConnection}`);
         console.log(`numCore ::${numCore}`);
         console.log(`nummemory ::${nummemory/1024/1024} mb`);
         const MaxCore = numCore * 5;
         if(numConnection > MaxCore){
            console.log("server is overload");
         }  
    }, time);
}
module.exports={
    checkconnetion,
    checkoverload
}