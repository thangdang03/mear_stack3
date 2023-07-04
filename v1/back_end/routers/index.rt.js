const ath = require('./ath/index.ath');
const product = require('./product/indext.product');
const Router = (app)=>{
     app.use('/v1/ath',ath);
     app.use('/v1/products',product);
}


module.exports = Router;
