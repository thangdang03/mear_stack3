const app =require("./app");
const config = require("./config/init.dbs");

const PORT =config.port;

const server = app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ::${PORT}`);
})

process.on("SIGINT",()=>{
    server.close(()=>{
        console.log('server was close')
    });
})