import './home.page.scss'
import { FaSearch } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getproduct,logout } from "../../redux/api.call";
const Homepage = ()=>{
    const user =  JSON.parse(window.localStorage.getItem('user'));
    const [listprodcut,setlistprodcut] = useState([]);
    const getdata =async()=>{
        const list_prodcut = await getproduct();
        setlistprodcut(list_prodcut);
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
        <div className="containterhome">
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
                    <FaSearch />
                 <input type="text" name="keysearch" id="keySearch" placeholder="tìm kiếm tại đây" onChange={(e)=>{
                     setkeysearch(e.target.value);
                  }}/>
                </form>
                
                
               {user && <div>
                    <button className="logout" onClick={async()=>{
                        const logouting = await logout();
                         if(logouting){
                            window.localStorage.removeItem('user');
                            window.location  = 'http://localhost:3000/'
                         }
                    }}> dang xuat</button>
                </div>}
                {!user && <div className="inputath">
                     <NavLink to="/login">đăng nhập </NavLink>||<NavLink to="/register">đăng ký </NavLink>
                </div>}
                </div>
            </div>
            <div className="content">
                 <div className="flex">
                 <p>sản phầm nổi bật</p>
                 <div className="grid_contain">
                    {listprodcut?.map(data=>{
                        return(
                            <div className="grid_item" key={data._id}  onClick={()=>{window.location=`http://localhost:3000/product/${data._id}`}}>
                                <img crossOrigin="anonymous" src={`http://localhost:7070/${data.product_thumb}`}/>
                                <div className="text">
                                    <h4>{data.product_name}</h4>
                                    <p>{data.product_price}</p>
                                    <p>đã bán {data.product_sold}</p>
                                </div>
                            </div>
                        )
                    })}
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
    </div>
    );
}

export default Homepage