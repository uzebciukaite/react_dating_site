import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import mainContext from '../context/mainContext'



const Toolbar = () => {

const {logedinUser, setLogedinUser, canSwipe, setCanSwipe} = useContext(mainContext)  
const nav = useNavigate()

function loguserout(){

  const autologin = localStorage.getItem("autologin")

  if(autologin === true) {
      const options = {
            method: "GET",
            headers: {
                "content-type":"application/json"
            },
            credentials: "include"
        }

      fetch('http://localhost:4000/logout', options)
        .then(res => res.json())
        .then(data => {
          console.log(data.message)
        })      
        } 
  localStorage.setItem("autologin", "false")
  setLogedinUser(null)
  setCanSwipe(false)
  nav("/")
  
  
}

  return (

       <Navbar sticky="top"  expand="md" variant="light">
            <Container>
           <Navbar.Brand as={Link} to="/">
               <img className='tinderimg' src={require("../images/tinder_logo.png")} alt="tinderLogo" />
            </Navbar.Brand>    
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='text-center'>
          <Nav className=" d-flex w-100 justify-content-end gap-5  ">
            
            {canSwipe &&  (
              <>
              <Nav.Link className='text-light' as={Link} to="/profile">My profile</Nav.Link>
              <Nav.Link className='text-light' as={Link} to="/swipe">Swipe</Nav.Link>
              <Nav.Link className='text-light' as={Link} to="/likes">My likes</Nav.Link> 
              </>
            ) }
                       
                       
        
          {logedinUser !== null ? (
            <Button onClick={loguserout} className='btn-grad border-0 fs-6' >Logout</Button>  
          )
        
        :
          (
            <>
            <Button className='btn-grad border-0 fs-6'  as={Link} to="/" > Login</Button>
            <Button className='btn-grad border-0 ' as={Link} to="/register">Register</Button>
            </>
          )
        }
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>

  )
}

export default Toolbar