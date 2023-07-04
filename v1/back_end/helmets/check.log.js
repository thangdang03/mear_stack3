const path = require("path");
// work file system
const fs =require("fs").promises;
const {format} = require("date-fns");
const filename = path.join(__dirname,'../logs',"logs.log");

const logevent = async (msg) =>{
    try {
        // add file with async
        const datetime = `${format(new Date(),'dd-MM-yyyy\tss:mm:HH')}`;
        const contentlog = `${datetime} ----- ${msg}\n`
        console.log(msg); 
        fs.appendFile(filename,contentlog);
    } catch (error) {
        console.log(error);
    }
}


module.exports = logevent;