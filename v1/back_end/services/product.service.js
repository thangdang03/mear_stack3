const { BAD_REQUEST, NOT_FOUND } = require("../cores/responsive.error");
const { Clothes,Electronics,beautify,product}=  require("../models/product.model");
const { findProductbyquery, findAllProduct, findProductById, deleproductbyid, SearchProduct } = require("../models/repostory/product.repostory");
const { ConverOB, removeUnderfineOB } = require("../ultils/get.fields");
class productFactory{
    static objclass ={};

    static registerclass({type,classs }){
       productFactory.objclass[type] = classs;
    }
    //create product
    static createFactory({type,payload}){
        console.log(payload)
       const classfind = productFactory.objclass[type];
       if(!classfind) throw new NOT_FOUND(`type is not underfinded ${type}`);
       return new classfind(payload).create_product()
    }
    // find product
    static async getallproduct ({limit=20,skip=20}){
        const findproduct = await findAllProduct({limit,skip, sort : 'ctime'});
        if(! findproduct) throw new NOT_FOUND('cant not get all product');
        return findproduct
    }


    static async getproduct (productid){
        const findproduct = await findProductById(productid);
        if(!findproduct) throw new NOT_FOUND('cant not get product with id:: ');
        return findproduct
    }

    static async searchProduct({keySearch}){
        if(!keySearch) throw new NOT_FOUND('keySearch not found');
        const querying = await SearchProduct({keysearch: keySearch});
        if(!querying) throw new BAD_REQUEST('null ');
        return querying
    }

    static async getproductbyUser(userid){
      
      if(!userid) throw new NOT_FOUND('userid not found');
      const querying = await product.find({product_user: ConverOB(userid)}).lean();
      if(!querying) throw new NOT_FOUND('cant not get ');
      return querying
  }

    //detele product
    static async deletproduct (productid){
        const deleting = await deleproductbyid(productid);
        if(!deleting) throw new BAD_REQUEST('cant not delete');
        return 'delete sucesss full'
    }
    //update product
    static async updateProduct({productid,type,payload}){
       const classfind = productFactory.objclass[type];
       if(!classfind) throw new NOT_FOUND(`type is not underfinded ${type}`);
       return new classfind(payload).uppdate_Product({product_id: productid,payload});
    }
    

}

class productclass{
    constructor({product_sold,product_thumb,product_name,product_dicription,product_price,product_quantity,product_user,product_type,product_atrributes,product_rating})
    {   this.product_thumb = product_thumb;
        this.product_sold = product_sold;
        this.product_name = product_name;
        this.product_dicription = product_dicription;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_user = ConverOB(product_user);
        this.product_type = product_type;
        this.product_atrributes = product_atrributes;
        this.product_rating = product_rating;
    }
    async CEARTE (detailid){
        const creating = await product.create({...this,_id: detailid});
        return creating;
    }
}


class clothessClass extends productclass{
    async create_product(){
          console.log(this.product_atrributes)
          const creating = await Clothes.create(this.product_atrributes);
          if(!creating) throw new BAD_REQUEST('creating err');
          const productsave = await super.CEARTE(creating._id);
          if(!creating) throw new BAD_REQUEST('creating err');
          return productsave
    }
    
    async uppdate_Product({product_id,payload}){
        const ojeparams = await removeUnderfineOB(payload);
        console.log({product_id,ojeparams})
        if(ojeparams.product_atrributes){
          //updaet child
             const childobjec = await removeUnderfineOB(payload.product_atrributes);
             const uppdating_child = await Clothes.findOneAndUpdate({_id: ConverOB(product_id)},
             {$set:{...childobjec}}
             ,{new: true,upsert:false});
             if(!uppdating_child) throw new BAD_REQUEST("can' not uppdate");
          //const parther
             const child = childobjec;
             for(const key in child){
                ojeparams[`product_atrributes.${key}`]  = child[key];
              }
              const {product_atrributes,...other} = ojeparams;
              const newupdate = await product.findOneAndUpdate({_id:ConverOB(product_id)},{$set:{
                ...other
              }},{new: true,upsert: false});
             if(!newupdate) throw new BAD_REQUEST("can' not uppdate");
             return newupdate
        }

        const newupdate2 = await product.findOneAndUpdate({_id:ConverOB(product_id)},{
          ...ojeparams
        },{new: true,upsert: false});
        if(!newupdate2) throw new BAD_REQUEST("can' not uppdate");
        return newupdate2
  }
}

class electroincClass extends productclass{
    async create_product(){
          console.log(this.product_atrributes);
          const creating = await Electronics.create(this.product_atrributes);
          if(!creating) throw new BAD_REQUEST('creating err');
          const productsave = await super.CEARTE(creating._id);
          if(!creating) throw new BAD_REQUEST('creating err');
          return productsave
    }  
    async uppdate_Product({product_id,payload}){
        const ojeparams = await removeUnderfineOB(payload);
        if(ojeparams.product_atrributes){
          //updaet child
             const childobjec = await removeUnderfineOB(payload.product_atrributes);
             const uppdating_child = await Electronics.findOneAndUpdate({_id: ConverOB(product_id)},
             {$set:{...childobjec}}
             ,{new: true,upsert:false});
             if(!uppdating_child) throw new BAD_REQUEST("can' not uppdate");
          //const parther
             const child = childobjec;
             for(const key in child){
                ojeparams[`product_atrributes.${key}`]  = child[key];
              }
              const {product_atrributes,...other} = ojeparams;
              const newupdate = await product.findOneAndUpdate({_id:ConverOB(product_id)},{$set:{
                ...other
              }},{new: true,upsert: false});
             if(!newupdate) throw new BAD_REQUEST("can' not uppdate");
             return newupdate
        }

        const newupdate2 = await product.findOneAndUpdate({_id:ConverOB(product_id)},{
          ...ojeparams
        },{new: true,upsert: false});
        if(!newupdate2) throw new BAD_REQUEST("can' not uppdate");
        return newupdate2
  } 

}

class beautifyClass  extends productclass{
    async create_product(){
          const creating = await beautify.create(this.product_atrributes);
          if(!creating) throw new BAD_REQUEST('creating err');
          const productsave = await super.CEARTE(creating._id);
          if(!creating) throw new BAD_REQUEST('creating err');
          return productsave
    }   

    async uppdate_Product({product_id,payload}){
      console.log(product_id,payload)
        const ojeparams= await removeUnderfineOB(payload);
        
        if(ojeparams.product_atrributes){
          //updaet child
             const childobjec = await removeUnderfineOB(payload.product_atrributes);
             const uppdating_child = await beautify.findOneAndUpdate({_id: ConverOB(product_id)},
             {$set:{...childobjec}}
             ,{new: true,upsert:false});
             if(!uppdating_child) throw new BAD_REQUEST("can' not uppdate");
          //const parther
             const child = childobjec;
             for(const key in child){
                ojeparams[`product_atrributes.${key}`]  = child[key];
              }
              const {product_atrributes,...other} = ojeparams;
              const newupdate = await product.findOneAndUpdate({_id:ConverOB(product_id)},{$set:{
                ...other
              }},{new: true,upsert: false});
             if(!newupdate) throw new BAD_REQUEST("can' not uppdate");
             return newupdate
        }
        console.log(ojeparams)
        const newupdate2 = await product.findOneAndUpdate({_id:ConverOB(product_id)},{
          ...ojeparams
        },{new: true,upsert: false});
        if(!newupdate2) throw new BAD_REQUEST("can' not uppdate");
        return newupdate2
  }
}
productFactory.registerclass({type:'colthes',classs: clothessClass});
productFactory.registerclass({type:'electroinc',classs:  electroincClass});
productFactory.registerclass({type:'beautify',classs: beautifyClass});

module.exports = productFactory;