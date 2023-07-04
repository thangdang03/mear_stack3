const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentName = 'user';
const collectionName = 'users';

const userSchema = new Schema({
    name:{
        type:String,
        trim: true,
        maxlength: 150
    },
    email:{
        type:String,
        unique:true,
        trim: true
    },
    password:{
        type: String,
        required: true,
    },status:{
        type:String,
        enum:['active','inactive'],
        default: 'inactive'
    },
    vefify:{
        type: Boolean,
        default: false,
    },
    roles:{
        type: Array,
        default:[]
    }
},{
    timestamps: true,
    collection: collectionName
});

module.exports = mongoose.model(documentName,userSchema);
