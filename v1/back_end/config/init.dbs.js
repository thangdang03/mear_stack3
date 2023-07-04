const dev = {
    port: process.env.DEV_APP_PORT,
    db: process.env.DEV_DB_DBS
}

const test = {
    port: process.env.TEST_APP_PORT,
    db:process.env.TEST_DB_DBS
}

const product = {
    port: process.env.PRO_APP_PORT,
    db:process.env.PRO_DB_DBS
}


// get config
const config = {dev,test,product};

const env = process.env.NODE_ENV || 'dev';

module.exports = config[env];