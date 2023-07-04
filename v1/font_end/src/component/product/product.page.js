import { NavLink } from 'react-router-dom'
import './product.page.scss'
import { FaEdit } from 'react-icons/fa';
import { FiDelete } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { deletebyid, getproductbyid } from '../../redux/api.call';
import FormClothes from '../form/form';
import FormElectroinc from '../form/form.ecolo';
import FormBuitity from '../form/form.biuty';

const Product =()=>{
      const user =  JSON.parse(window.localStorage.getItem('user'));
      const [typeform,setform] = useState('');
      const [product,setproduct]=useState([]);
      const [loading,setloading] = useState(false);
      const getdata=async()=>{
        const product_list = await getproductbyid(user?.user._id);
        setproduct(product_list);
        setloading(true);
      }
      useEffect(()=>{
        if(user){
          getdata();
        }
        setloading(true);
        },[])
      return(
        <div className='container_product'>
           {!loading && <h1>loadding ..............</h1>}
           {loading && <div>
            <div className="Header">
              <div className="nested">
                <ul>
                    <NavLink className='icon' to="/">.store manage</NavLink>
                    <NavLink to="/">home</NavLink>
                    <NavLink to='' >product</NavLink>
                </ul>
                
                 <div id='add' onClick={()=>{
                     if(!user.user){
                      alert('bạn chưa đăng nhập');
                      window.location  = 'http://localhost:3000/login'
                      return;
                     }
                     document.getElementById('add').style.display = 'none';
                     document.getElementById('checkbox').style.display = 'block';
                 }}>add product</div>
                  <div id='checkbox'>
                        <p>hãy chọn loại sản phẩm </p>
                      <div>
                          <NavLink to="#form" onClick={()=>{setform('colthes')}}>quần áo</NavLink> |
                          <NavLink to="#form" onClick={()=>{setform('electroinc')}}>điện tử </NavLink> |
                          <NavLink to="#form" onClick={()=>{setform('beautify')}}>làm đẹp </NavLink> |
                      </div>
                 </div>
              </div>
            </div>
          <div className='content2'>
              <div className='flex'>
              {user &&  product?.length === 0  && <div>bạn chưa đăng sản phẩm nào </div>}
              {user &&  product?.length > 0  &&
                     <table>
              <tr>
                <th style={{width: '178px'}}>id</th>
                <th style={{width: '400px'}}>name</th>
                <th>image</th>
                <th>price</th>
                <th>action</th>
              </tr>
              {product?.map(data=>{
                return(
                  <tr>
                <td >{data._id}</td>
                <td>{data.product_name}</td>
                <td> <img crossOrigin="anonymous" src={`http://localhost:7070/${data.product_thumb}`} /></td>
                <td>{data.product_price}</td>
                <td><span className='edit'onClick={async()=>{
                          window.location = `/product/edit/${data._id}`
                    }}><FaEdit />edit</span> ||  
                    <span  className='detelte' onClick={async()=>{
                          const deleting =await deletebyid(data._id);
                          window.location = '/product'
                    }}> <FiDelete />delete</span>
                </td>
              </tr>
                )
              })}
                     </table>
                  }
     
                {!user && 
                    <div>bạn chưa đăng nhập <NavLink to='/login'>đăng nhập tại đây </NavLink></div>
                }

                {typeform === 'colthes' &&  <FormClothes/>}
                {typeform === 'electroinc' &&  <FormElectroinc/>}
                {typeform === 'beautify' &&  <FormBuitity/>}
               
             </div>
          </div>
          <div id="footer">
            <div className="information">
                <div className="contact">
                     <p>©2022 by ChoXe.net. All rights reserved. Công Ty Cổ Phần Ô Tô Xuyên Việt; Mã số thuế: 0304013473</p>
                     <p>Lầu 1, B5-B6 Khu Kim Sơn - Đường Nguyễn Hữu Thọ, phường Tân Phong, Quận 7, TPHCM</p>
                     <p>©2022 by ChoXe.net. All rights reserved. Công Ty Cổ Phần Ô Tô Xuyên Việt; Mã số thuế: 0304013473</p>
                     <NavLink to="#" className="contact_item" >
                        <i className="fa-solid fa-envelope"></i> <span>cskh@choxe.vn</span> 
                    </NavLink>
                    <NavLink   to="#" className="contact_item">
                        <i className="fa-solid fa-phone"></i>
                        <span>cskh@choxe.vn</span> 
                    </NavLink>
                    <img src="https://choxe.vn/assets/img/logo-bct.png" alt="" />
                </div>
                <div className="introductio">
                    <NavLink to="#">giới thiệu</NavLink>
                    <NavLink to="#">QUY CHẾ HOẠT ĐỘNG</NavLink>
                    <NavLink to="#">BÁO GIÁ</NavLink>
                </div>  
                <div className="phoneandconact">
                    <div className="phone">
                        <span> Hotline: 091.144.2883</span> 
                    </div>
                    <div className="salon">
                        <i className="fa-solid fa-house-user"></i><span>Dành cho Salon, Môi giới</span>
                    </div>
                </div>    
            </div>
            </div></div>}
        </div>
      )
}
export default Product