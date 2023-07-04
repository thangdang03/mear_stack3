import { useEffect, useState } from 'react'
import './edit.scss'
import { getaproduct} from '../../redux/api.call';
import { PiCaretDoubleRightBold } from "react-icons/pi";

import { NavLink, useParams } from 'react-router-dom';
import { updateproduct } from '../../redux/api.call';
const Edit =()=>{
    const id = useParams('id');
    const user =  JSON.parse(window.localStorage.getItem('user'));
    const [product_dicription,setproduct_dicription] = useState('');
    const [product_name,setproduct_name] = useState('');
    const [product_price,setproduct_price] = useState('');
    const [product_quantity,setproduct_quantity] = useState('');
    const [product_sold,setproduct_sold] = useState('');
    const [product_rating,setproduct_rating] = useState('');
    const [product,setproduct] = useState([]);
    const getdata =async()=>{
        const data = await getaproduct(id.id);
        setproduct(data);
        setproduct_name(data?.product_name);
        setproduct_price(data?.product_price);
        setproduct_quantity(data?.product_quantity);
        setproduct_sold(data?.product_sold);
        setproduct_rating(data?.product_rating);
        setproduct_dicription(data?.product_dicription);
    }
    
    useEffect(()=>{
        if(!user )window.location = 'http://localhost:3000'
        getdata();
    },[]);
    return(
        <div className="container_edit">
              <div>
              <div className="edit_header">
                    <NavLink to='/product'><h1>edit product</h1></NavLink>
                    <NavLink to='/product'>back <PiCaretDoubleRightBold/></NavLink>
              </div>
              <div className="edit_content">
                 <div className="flex">
                    <form  id="form" encType="multipart/form-data" >
                         <table>
                            <tr>
                                <td>tên sản phẩm</td>
                                <td><input type='text' value={product_name} onChange={(e)=>{
                                    setproduct_name(e.target.value);
                                }}/></td>
                            </tr>
                            <tr>
                                <td>mô tả sản phẩm</td>
                                <td><input type='text' value={product_dicription} onChange={(e)=>{
                                    setproduct_dicription(e.target.value);
                                }}/></td>
                            </tr>
                            <tr>
                                <td>giá sản phẩm</td>
                                <td><input type='text' value={product_price} onChange={(e)=>{
                                    setproduct_price(e.target.value);
                                }}/></td>
                            </tr>
                            <tr>
                                <td>số lượng sản phẩm</td>
                                <td><input type='text' value={product_quantity} onChange={(e)=>{
                                    setproduct_quantity(e.target.value);
                                }}/></td>
                            </tr>
                            <tr>
                                <td>số lượng đã bán </td>
                                <td><input type='text' value={product_sold} onChange={(e)=>{
                                    setproduct_sold(e.target.value);
                                }}/></td>
                            </tr>
                            <tr>
                                <td>số đánh giá sản phẩm </td>
                                <td><input type='text' value={product_rating} onChange={(e)=>{
                                    setproduct_rating(e.target.value);
                                }}/></td>
                            </tr>
                            
                           {product?.product_atrributes && Object.keys(product?.product_atrributes).map(key=>{
                            return(
                            <tr>
                                <td>${key}</td>
                                <td><input type='text' value={`${product?.product_atrributes[key]}`} /></td>

                            </tr>
                            )
                           })}
                           <tr>
                                <td></td>
                                <td><input type='submit' value='uppdate'  onClick={async(e)=>{
                                    const payload={
                                        product_name,
                                        product_price,
                                        product_dicription,
                                        product_rating,
                                        product_sold,
                                        product_rating,
                                        product_type: product.product_type
                                    }
                                    console.log(payload)
                                    const uppdating = await updateproduct(product._id,payload);
                                    if(uppdating){
                                       window.location = 'http://localhost:3000/product'
                                    }
                                }} /></td>
                            </tr>
                         </table>
                    </form>
                 </div>
              </div>
              </div>
        </div>
    )
}
export default Edit