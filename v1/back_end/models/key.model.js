const mongoose = require("mongoose");
const Schema =mongoose.Schema;
const user = require("./user.model");
const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';
const KeySchema = new Schema({
    user:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: user
    },
    publicKey:{
        type: String,
        required: true,
    },
    refehstokened:{
        type: Array,
        default: []
    },
    refreshtoken:{
        type: String,
        required: true
    }
},{
    timestamps: true,
    collection: COLLECTION_NAME
}); 

module.exports = mongoose.model(DOCUMENT_NAME,KeySchema);