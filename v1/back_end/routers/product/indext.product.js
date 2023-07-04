const express = require("express");
const productController = require("../../controllers/product.controller");
const router = express.Router();
const {Handelerror} = require("../../ultils/hadellerror");
const { checkacesstoken } = require("../../midelware/check.user");
const uppload = require("../../midelware/uppload.product");
router.get('/search',Handelerror(productController.searchproduct));
router.get('/user',Handelerror(productController.getprodctbyuser));
router.get('',Handelerror(productController.getallproducy));
router.get('/:id',Handelerror(productController.getaproducy));
router.put('/:id',Handelerror(productController.updateproduct));
router.delete('/:id',Handelerror(productController.deleteproduct));
router.post('',uppload.array('avata'),Handelerror(productController.createProduct));

router.use(checkacesstoken);
//get prodcut 
//create product


module.exports = router;