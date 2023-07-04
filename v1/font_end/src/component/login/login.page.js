import { NavLink, useNavigate } from "react-router-dom"
import "./login.page.scss"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/api.call";
const Login=()=>{
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const [loading,setloading] = useState(true);
    const dispath = useDispatch();
    const navigate = useNavigate();
    const hadelsumit=async(e)=>{
        e.preventDefault();
        const newuser = {
            email,
            password
        }
        console.log(newuser)
        loginUser({dispath: dispath,navigate: navigate,user: newuser});
        setloading(false);
    }
    return(
        <div className="containter">
             {!loading && <h1>loading........</h1>}
         {loading &&
         <div className="item_firt">
         <div className="img_login">
             <img src="https://as1.ftcdn.net/v2/jpg/02/81/99/20/1000_F_281992044_pZTbeLjQrVvYPWpm5aJcolfsYXMfi59N.jpg" alt="logo_wite"/>
         </div>
         <div className="inputform">
             <div className="hadel_nested">
                 <div className="icon">
                     <span>đăng nhập</span> 
                 </div>
                 <div className="nested_fomr">
                     <label htmlFor="email">Email</label>
                     <br/>
                     <form >
                         <input type="email" name="email" id="email" placeholder="hãy nhập email tại đây" required onChange={(e)=>{
                             setemail(e.target.value);
                         }}/>
                         <div id="hadelemail"></div>
                         <label htmlFor="password">password</label>
                         <input type="text" name="password" id="password" placeholder="hãy nhập password tại đây" required 
                         onChange={(e)=>{
                             setpassword(e.target.value);
                         }} />
                         <div id="hadelpasswordl"></div>
                         <input type="submit" value="đăng nhập" id="btn_login" onClick={(e)=>{
                             hadelsumit(e);
                         }}/>
                     </form>
                     <div className="suggest">
                         bạn chưa có tài khoản!  <NavLink to="/register">đăng ký tại đây!</NavLink>
                     </div>
                 </div>
             </div>
         </div>
     </div>}
    </div>
    )
}

export default Login