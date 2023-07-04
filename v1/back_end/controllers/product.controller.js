const { OK, CREATED } = require("../cores/resposive.sucess");
const { product } = require("../models/product.model");
const productFactory= require("../services/product.service");
const { ConverOB } = require("../ultils/get.fields");

class productController{
     async createProduct(req,res){
      let curent_detail  = await JSON.parse(JSON.stringify(req.body));
         if(req.files){
            let curentdata = [];
            await req.files.map(data=>{
               curentdata = [...curentdata,data.filename]
            });
            curent_detail.product_atrributes.thumb_detail =  curentdata;
            curent_detail.product_thumb = curent_detail.product_atrributes.thumb_detail[0];
         }
         new CREATED({
            message:"create product sucess",
            metadata: await productFactory.createFactory({type: req.body.product_type,payload: curent_detail})
         }).send({res})
     }
     async getallproducy (req,res){
      new OK({
         message:"get all product sucess",
         metadata: await productFactory.getallproduct({ })
      }).send({res})
     }

     async getaproducy(req,res){
          console.log(req.params)
      new OK({
         message:"get a product sucess",
         metadata: await productFactory.getproduct(req.params.id)
      }).send({res})
     }

     async getprodctbyuser(req,res){
      console.log(req.headers.userid)
      new OK({
        message:"get a product sucess",
         metadata: await productFactory.getproductbyUser(req.headers.userid)
      }).send({res})
      }

     async searchproduct(req,res){ 
      console.log(req.query.keysearch)
      new OK({
         message:"get all product sucess",
         metadata: await productFactory.searchProduct({keySearch: req.query.keysearch})
      }).send({res})
     }



     async deleteproduct(req,res){
      new OK({
         message:"get all product sucess",
         metadata: await productFactory.deletproduct(req.params.id)
      }).send({res})
     }

     async updateproduct(req,res){
        new OK({
         message:"uppdate success",
         metadata: await productFactory.updateProduct({productid: req.params.id || req.query.id , payload: req.body, type:req.body.product_type})
      }).send({res})
     }
}

module.exports = new productController;   