import React, {useRef, useState} from 'react'
import {Container, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router'
const Register = () => {

const [userGender, setUserGender] = useState()
const [message, setMessage] = useState("")
const userNameRef = useRef()
const passOneRef = useRef()
const passTwoRef = useRef()
const ageRef = useRef()
const cityRef = useRef()
const nav = useNavigate()

const usersGender = (gen) => {
    setUserGender(gen)
}




const registerUser = () => {
    console.log("clicked")
    const newUser = {
        username : userNameRef.current.value,
        userpass: passOneRef.current.value,
        userpass2: passTwoRef.current.value,
        usercity: cityRef.current.value,
        userage: ageRef.current.value,
        usergender: userGender
    }

    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newUser)

    }
       fetch("http://localhost:4000/regUser", options)
      .then(res => res.json())
      .then((data) => {
        if(!data.error){
          setMessage("Registered successfully")
          setTimeout(() => {
            nav("/")
          },500)
        } else {
          setMessage(data.message)
        }
      })


}


  return (
    <Container className='flex-center py-5'>
   
        <div className='d-flex flex-column w-50 customHeight flex-center '>
            <h2 className='pb-5 text-light'>Register</h2>
            <div className='flex-center flex-column w-100 gap-4'>
            <input type="text" ref={userNameRef}  placeholder="username"/>
        <input type="password" ref={passOneRef} placeholder="password"/>
        <input type="password"  ref={passTwoRef} placeholder="repeat password"/>
       
         
      <div className='d-flex justify-content-around gap-3 w-75'>
         <input type="text"  ref={cityRef} placeholder="city"/>
         <input type="number"  ref={ageRef} placeholder="age"/>
         <select
         onChange={(event) => usersGender(event.target.value)}
          value={userGender}
         
         >
        <option defaultValue>gender</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </select>
      </div>
       
        <Button
        onClick={registerUser}
        className='btn-grad w-50 fs-5 border-0 py-2 mt-5'>Register</Button>
         {message !== "" ? <p className='fs-5 text-light'>{message}</p> : <p ></p>}   
            </div>
        
        </div>

    </Container> 
  )
}

export default Register