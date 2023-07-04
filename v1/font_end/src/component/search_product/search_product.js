import { useParams, NavLink } from"react-router-dom"
import { useSelector } from "react-redux";
import './search.page.scss'
import { useEffect, useState } from "react";
import { searchbykeysearch } from "../../redux/api.call";

const Search=()=>{
    const keyseasr = useParams('keysearch');
    const user = useSelector((state)=> state.auth.login.curentUser);
    const [product,setproduct] = useState([]);
    const [keysearch,setkeysearch] = useState([]);
    const getdata=async()=>{
        const  productlist = await searchbykeysearch(keyseasr.keysearch);
        setproduct(productlist);
        
    }
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
    },[])
    return(
        <div className="container_seach">
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
                 <input type="text" name="keysearch" id="keySearch" placeholder="tìm kiếm tại đây" onChange={(e)=>{
                     setkeysearch(e.target.value);
                  }}/>
                </form>
                
               {user?.user&& <div>
                    <button>dang xuat</button>
                </div>}
                <div className="inputath">
                     <NavLink to="/login">đăng nhập </NavLink>||<NavLink to="/register">đăng ký </NavLink>
                </div>
                </div>
            </div>
            <div className="content">
            <div className="flex">
                 {!product.length && <p>không tìm thấy kết quả phù hợp</p>  }
                 {product.length >= 1 && <p> tìm thấy {product.length} phù hợp</p>  }
                 <div className="grid_contain">
                    {product?.map(data=>{
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
                    </NavLink>
                    <NavLink   to="#" className="contact_item">
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
                    </div>
                </div>    
            </div>
        </div>
        </div>
    )
}
export default Search