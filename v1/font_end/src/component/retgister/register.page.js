import { NavLink, useNavigate } from 'react-router-dom'
import './register.page.scss'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { regiserUser } from '../../redux/api.call'
const Register=()=>{
    const [email,setemail]=useState('')
    const [name,setname]=useState('')
    const [password,setpassword]=useState('')
    const dispath=useDispatch();
    const navigate = useNavigate();
    const hadelsubmit=async (e)=>{
        e.preventDefault();
        const newuser={
            name,
            email, 
            password
        }
        console.log(newuser);
        regiserUser({dispath: dispath,navigate: navigate,user: newuser});
    }
    return(
      <div className="containter">
        <div className="item_firt">
            <div className="img_login">
                <img src="https://as1.ftcdn.net/v2/jpg/02/81/99/20/1000_F_281992044_pZTbeLjQrVvYPWpm5aJcolfsYXMfi59N.jpg" alt="logo_wite" />
            </div>
            <div className="inputform">
                <div className="hadel_nested">
                    <div className="icon">
                        <span>đăng ký</span> 
                    </div>
                    <div className="nested_fomr">
                        <br/>
                        <form >
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="hãy nhập email tại đây" required 
                                 onChange={(e)=>{
                                    setemail(e.target.value)
                                 }}
                            />
                            <div id="hadelemail"></div>
                            <label htmlFor="username">username</label>
                            <input type="text" name="username" id="username" placeholder="hãy nhập email tại đây" required 
                                onChange={(e)=>{
                                    setname(e.target.value)
                                 }}
                            />
                            <div id="hadelemail"></div>
                            <label htmlFor="password">password</label>
                            <input type="text" name="password" id="password" placeholder="hãy nhập password tại đây" required 
                                 onChange={(e)=>{setpassword(e.target.value)}}
                            />
                            <div id="hadelpasswordl"></div>
                            <input type="submit" value="đăng ký" id="btn_login" onClick={(e)=>{
                                hadelsubmit(e)
                            }}/>
                        </form>
                        <div className="suggest">
                            bạn chưa có thể <NavLink to="/login">đăng nhập tại đây!</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
}

export default Register