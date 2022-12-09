import React, { useState,useEffect} from 'react'
import tigerlogo from "../../../src/tiger_logo.png"
import "./Signup.css"
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router'

const Signup = () => {
  const navigate=useNavigate()
    function handleCallback(response){
        console.log("Encoded",jwt_decode(response.credential))
        navigate("/Landingpage")

      }
  
  
      useEffect(()=>{
       
        window.google.accounts.id.initialize({
          client_id: "517514609639-ga9272vk8so3gb0v5hhag5kptg2js60l.apps.googleusercontent.com",
          callback:handleCallback
        })
        
        window.google.accounts.id.renderButton(
          document.getElementById("signingoogle"),
          {theme:"outline",size:"small"}
        )
      },[])
    const [data, setData] = useState({
        username : '',
        password : '',
      })
      const {username,password,confirmPassword}= data;
      const changeHandler= e =>{
        setData({...data,[e.target.name]:e.target.value})
      }
      const submitHandler= e =>{
        e.preventDefault();
        if(username.length <=5){
          alert("username must be 5 character");
        }
        else if(password !== confirmPassword){
          alert("passwords are not matching");
        }
        else{
          console.log(data);
        }
      }
      return (

    <div className="signupC" style={{background:"blue"}}>
       <div className = "loginwrapper">
      <div className='left-section'>
      <center className="center-align">
        <img  style={{marginLeft:"-80px"}} height={100} width={150}src={tigerlogo} alt="logo"/>
        <div style={{marginLeft:"-80px"}} className='solid'>
        </div>
      </center>
      </div>
      <div className="right-section">
      <center className="center-align">
        <form onSubmit={submitHandler}>
          <input className= "input" type ="text" name="username" placeholder='username' value={username} onChange={changeHandler} /> <br />
          <input className="input" type ="password" name="password" placeholder='password' value={password} onChange={changeHandler} /> <br />
          <button className="login-btn" type = "submit">Login</button>
        </form>
        <div className='divider'>
          <div className='left-divider'>
            
          </div>
          <div>
            OR  
          </div>
          <div className='right-divider'>

          </div>
        </div>
        
        <div id="signingoogle"></div>
        
      </center>
      </div>
      
    </div>
    </div>
  )
}

export default Signup
