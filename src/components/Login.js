import React, {useRef, useState, useContext, useEffect} from 'react'
import {Container, Button, Form} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import mainContext from '../context/mainContext'

const Login = () => {

const {setLogedinUser, logedinUser, socket} = useContext(mainContext) 
const [staylogged, setStaylogged] = useState(false)
const userLogRef = useRef()
const passLogRef = useRef()
const [message, setMessage] = useState("")
const nav = useNavigate()


const validateUser = () => {

  const user = {
    username: userLogRef.current.value,
    userpass: passLogRef.current.value

  }

  const options = {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(user),
            credentials: "include"
        }

  fetch("http://localhost:4000/logUser/", options)
    .then(res => res.json())
    .then(data => {
    if(data.error){
    setMessage(data.message)
    } else {
      socket.emit("connect_user", data.result)
      
      nav("/profile")
      }
    })
}


  const autoLoginTrigger = (e) => {
      localStorage.setItem("autologin", String(e.target.checked))
      setStaylogged(e.target.checked)

    }

    useEffect(() => {
        const autologin = localStorage.getItem("autologin")
        console.log(autologin)
        if(autologin === "true") {
            const options = {
                method: "GET",
                headers: {
                    "content-type":"application/json"
                },
                credentials: "include"
            }

            fetch('http://localhost:4000/autologin', options)
                .then(res => res.json())
                .then(data => {
                  
                  if(!data.error) {
                        socket.emit("connect_user", data.result)
                        nav('/profile')
                    }
                    
                })
        }
    }, [])


   






  return (
    <Container className='flex-center flex-column py-5 customHeight m-auto text-light w-100'>
        <h2 className='py-5'>Log in</h2>
        <div className='d-flex flex-column w-50  flex-center gap-4 mediaContainer'>
           
    <input type="text" ref={userLogRef} placeholder="username"/>
    <input type="password" ref={passLogRef} placeholder="password"/>
    <Form.Check 
        type="switch"
        id="custom-switch"
        label="Keep me signed in"
        className={!staylogged ? "" : "stayloggedin"}
        
        onChange={autoLoginTrigger}
      />
    
       
    <Button
    onClick={validateUser}
    className='btn-grad w-50 fs-5 border-0 py-2 mt-5'>Login</Button>
         {message !== "" ? <p className='fs-5 text-light'>{message}</p> : <p></p>}    
        
        </div>
<div className='flex-center gap-4 mediaColumn'>Don't have an account? 
  <Button className='btn-grad' as={Link} to="/register">Register</Button>
</div>
    </Container> 
  )
}

export default Login