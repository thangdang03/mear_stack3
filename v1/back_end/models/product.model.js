const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./user.model");
const DOCUMENTNAME = "Product";
const COLLECTIONNAME ="Products";
const productSchema = new Schema({
      product_thumb:{type:String,default: ' '},
      product_name:{type:String,required: true},
      product_dicription:{type:String,required: true}, 
      product_price:{type:Number,required: true},
      product_quantity:{type:Number,required: true},
      product_sold:{type:Number,required: true},
      product_user:{type: Schema.Types.ObjectId,ref: user,required: true},
      product_type:{type:String,required: true},
      product_atrributes:{type: Schema.Types.Mixed,required: true},
      product_rating:{type: Number,default: 4.5,min:[0.1,'min is 0.1'],max:[5,"max is 5"],Set:(data)=>{
        return Math.round(data *10) /10
      }}
},{
    timestamps: true,
    collection: COLLECTIONNAME
});

//creater index for full text search 
productSchema.index({product_name: 'text',product_dicription: 'text'});

const Clothesschema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref:'user',required: true},
    thumb_detail:{type:[],default: [],required: true},
    origin:{type:String,default: 'updating'},
    brand: {type:String,default: 'updating'},
    material:{type:String,default: 'updating'},
    sent_from:{type:String,default: 'updating'}
},{
    timestamps: true,
    collection: 'Clothess'
});

const electronicSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref:'user',required: true},
    thumb_detail:{type:[],default: [],required: true},
    guarantee:{type:String,default: 'updating'},
    brand: {type:String,default: 'updating'},
    connection_type:{type:String,default: 'updating'},
    sent_from:{type:String,default: 'updating'},
    
},{
    timestamps: true,
    collection: 'Electronic'
});

const beautifyshema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref:'user',required: true},
    thumb_detail:{type:[],default: [],required: true},
    Expiry:{type:String,default: 'updating'},
    brand: {type:String,default: 'updating'},
    material:{type:String,default: 'updating'},
    sent_from:{type:String,default: 'updating'},
}
,{
    timestamps: true,
    collection: 'beautifys'
});

const product = mongoose.model(DOCUMENTNAME,productSchema);
const Clothes = mongoose.model('Clothes',Clothesschema);
const Electronics= mongoose.model('Electronic',electronicSchema);
const beautify= mongoose.model('beautifys',beautifyshema);

module.exports = {
    product,
    Clothes,
    Electronics,
    beautify
}