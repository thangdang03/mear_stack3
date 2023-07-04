import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaSearch } from 'react-icons/fa';
import { getaproduct } from "../../redux/api.call";
import { PiCaretDoubleRightBold,PiCaretDoubleLeftBold } from "react-icons/pi";
import './detail.page.scss'

const { useParams, NavLink } = require("react-router-dom")

const Detail=()=>{
    const id = useParams('id');
    const user =  JSON.parse(window.localStorage.getItem('user'));
    const [product,setproduct]=useState([]);
    const [atributes,setatributes]=useState([]);
   
    const getdata = async()=>{
        const prodcut_detail= await getaproduct(id.id);
        setproduct(prodcut_detail);
        setTimeout(()=>{showslider(siderindex)},1000);
    }


    let siderindex = 1;
    const showslider =(n)=>{
        console.log(siderindex)
        const slider_img = document.getElementsByClassName('slider_img');
        const slider_child = document.getElementsByClassName("columt");
        let i;
        //set max value array 
        if(n > slider_img.length) { siderindex = 1};
        //set min value array 
         if(n < 1)  siderindex = slider_img.length ;
        //remove class 
        for(i = 0 ; i < slider_img.length;i++){
             slider_img[i].style.display = 'none';
        }
        for (i = 0; i < slider_child.length; i++) {
            slider_child[i].className = slider_child[i].className.replace(" active", " ");
        }
    console.log({siderindex})
    slider_img[siderindex-1].style.display = 'block';
    slider_child[siderindex-1].className +=' active2';
} 
   
    const [keysearch,setkeysearch] = useState('');
    const Search=(e)=>{
        e.preventDefault();
        if(keysearch === '' || keysearch ==="@" || keysearch === ' $'){
            alert('bạn cần nhập thông tin để tìm kiếm');
            setkeysearch('');
            return
        }
        window.location = `http://localhost:3000/product/search/${keysearch}`;
    }
    
    useEffect(()=>{
        getdata();
    },[]);

    return(
    <div className="container">
           <div className="Header">
                <div className="nested">
                <ul>
                    <NavLink className='icon' to="/">.store</NavLink>
                    <NavLink to="/">home</NavLink>
                    <NavLink to='product' >product</NavLink>
                </ul>
                <form onSubmit={(e)=>{
                    Search(e);
                }}>
                    <FaSearch/>
                 <input type="text" name="keysearch" id="keySearch" placeholder="tìm kiếm tại đây" onChange={(e)=>{
                     setkeysearch(e.target.value);
                  }}/>
                </form>
                
                
               {user?.user&& <div>
                    <button className="logout"> dang xuat</button>
                </div>}
                {!user && <div className="inputath">
                     <NavLink to="/login">đăng nhập </NavLink>||<NavLink to="/register">đăng ký </NavLink>
                </div>}
                </div>
            </div>
          <div className="content_detail">
               <div className="nested2">
               <div className="navigation">
                <NavLink to='/'>home {">"}</NavLink> 
                <NavLink to={`/product/${id.id}`}>product detail {">"}</NavLink> 
               </div>
               <div className="slider_detail">
                         <div id="slider_content">
                            {product.product_atrributes?.thumb_detail.map(data=>{
                                return(
                                    <div className="slider_img" key={data.product_id}>
                                    <img crossOrigin="anonymous" src={`http://localhost:7070/${data}`}/>
                               </div>
                                )
                            })}
                              
                              <button className="pre font" onClick={()=>{showslider(siderindex =siderindex -1)}}> <PiCaretDoubleLeftBold/> </button>
                              <button className="next font"onClick={()=>{showslider(siderindex= siderindex + 1)}}> <PiCaretDoubleRightBold/>  </button>
                              
                              <div id="slider_child">
                              {product.product_atrributes?.thumb_detail.map((data,index)=>{
                                const curnet = index;
                                return(
                                    <div className="columt" onClick={(index)=>{showslider(siderindex = curnet + 1)}} key={data.product_id} >
                                    <img crossOrigin="anonymous" src={`http://localhost:7070/${data}`}/>
                               </div>
                                )
                            })}
                             </div>
                         </div>
                         <div id="text">
                                    <div>
                                        <h2>{product?.product_name}</h2>
                                        <h4 className="price">₫{product?.product_price}</h4>
                                        <h4>mô tả</h4>
                                        <p>{product?.product_dicription}</p>
                                        <h4>chi  tiết</h4>
                                        <table>

                                        {product?.product_atrributes && Object.keys(product?.product_atrributes).map(data=>{
                                            if(data==='user_id'|| data === 'thumb_detail'){
                                                return;
                                            }
                                            return(
                                                    <tr>
                                                        <td><span>{data}</span> </td>
                                                        <td><p>{product?.product_atrributes[data]}</p></td>
                                                    </tr>
                                            )
                                        })}
                                                <tr>
                                                        <td><span>quantity</span> </td>
                                                        <td><p>{product?.product_quantity}</p></td>
                                                </tr>
                                                <tr>
                                                        <td><span>đã bán</span> </td>
                                                        <td><p>{product?.product_sold}</p></td>
                                                </tr>
                                                <tr>
                                                        <td><span>type</span> </td>
                                                        <td><p>{product?.product_type}</p></td>
                                                </tr>
                                    
                                    </table>
                                    </div>
                         </div>
                    </div>
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
                        <i className="fa-solid fa-phone"></i>
                        <span> Hotline: 091.144.2883</span> 
                    </div>
                    <div className="salon">
                        <i className="fa-solid fa-house-user"></i><span>Dành cho Salon, Môi giới</span>
                    </div>
                </div>    
            </div>
            </div>
    </div>)
}
export default Detail