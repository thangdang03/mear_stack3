const { BAD_REQUEST } = require("../../cores/responsive.error");
const { ConverOB } = require("../../ultils/get.fields");
const {product, Clothes} = require("../product.model");
const findallproduct=()=>{

}


const findAllProduct=async({limit,sort,page })=>{
    const skip = (page-1)*limit;
    const sortby = sort === 'ctime'?{_id: -1}: {_id: 1};
    const products = product.find()
    .sort(sortby)
    .skip(skip)
    .limit(limit)
    .lean()
    return products
} 

const findProductById =async(productid)=>{
     console.log(productid)
    const find = await product.findById(ConverOB(productid)).populate('product_user','name name -_id');
    return find;
}

const SearchProduct =async({keysearch})=>{
    console.log('ádfkjalksjre')
    const regexSearch = await new RegExp(keysearch);
    console.log(regexSearch)
    const result = await product.find({
        $text:{$search: regexSearch}
       },{score:{$meta: 'textScore'}}
    ).lean().sort({score:{$meta: 'textScore'}});
    return result
}

const deleproductbyid =async(productid)=>{
    const find = await product.findByIdAndDelete(ConverOB(productid));
    const find2  = await Clothes.findByIdAndDelete(ConverOB(productid));
    if(!find&& !find2) throw new BAD_REQUEST('cant not delte');
    return 'delete sucess'
}


module.exports={
    findProductById,
    findAllProduct,
    deleproductbyid,
    SearchProduct
}



