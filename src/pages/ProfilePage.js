import React, {useState, useContext, useEffect} from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import PhotoSlider from '../components/PhotoSlider'
import {BsPersonFill} from 'react-icons/bs'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import {FiInfo} from 'react-icons/fi'
import {MdLocationCity} from 'react-icons/md'
import {CgGenderMale} from 'react-icons/cg'
import {GiAges, GiCancel} from 'react-icons/gi'
import ModalBox from '../components/ModalBox'
import mainContext from '../context/mainContext'
import ModalFilter from '../components/ModalFilter'

const ProfilePage = () => {

const {logedinUser, setCanSwipe, setLogedinUser, canSwipe, socket, setUsersSwipe} = useContext(mainContext)     
const [show, setShow] = useState(false);
const [showFilter, setShowFilter] = useState(false);
const [picturesCheck, setpicturesCheck] = useState(false);
const [filterCheck, setFilterCheck] = useState(false);

const handleShow = () => setShow(true);
const handleFilterShow = () => setShowFilter(true)

useEffect(()=> {
        
        socket.on("user_updated", (data) => {
            setLogedinUser(data.userInfo)
        }) 

    },[socket])



useEffect(() => {
    if(logedinUser){
        if(logedinUser.userphotos.length >= 2){
        setpicturesCheck(true)
    }
    if(logedinUser.userfilter.city !== "" || logedinUser.userfilter.gender !== "" ||  logedinUser.userfilter.age !== null ){
        setFilterCheck(true)
    }
    }
    
},[logedinUser])


useEffect(()=> {

    if(picturesCheck && filterCheck){
        setCanSwipe(true)
        socket.emit("swipe_users", "canswipe")
        socket.on("user_filterset", (data) => {
        setUsersSwipe(data)
        console.log("received from profile")
    })
        
    } else {
        setCanSwipe(false)
    }

},[picturesCheck, filterCheck])

 

  return (
    <Container className='d-flex flex-column customHeight py-5 text-light'>
        {logedinUser && (
            <div className='flex-center flex-column'>

            <Row xs={2} md={4} lg={4} className="w-100 d-flex rounded text-light fs-5"> 
            <Col className='d-flex flex-column py-2'>
            <p className='fw-bold'>
                    <BsPersonFill className='fs-2 me-2'/>
                    Username
                    </p>
                <p className='w-100'>{logedinUser.username}</p>
            </Col>
            <Col className='d-flex flex-column py-2'>
                  <p className='fw-bold'>
                    <MdLocationCity className='fs-2 me-2'/>
                    City
                    </p>
                <p className='w-100 '>{logedinUser.usercity}</p>
            </Col>
            <Col className='d-flex flex-column py-2'>
                 <p className='fw-bold'> <CgGenderMale className='fs-2 me-2'/> Gender</p>
                <p className='w-100'>
                    
                    {logedinUser.usergender}
                    </p>
            </Col>
            <Col className='d-flex flex-column py-2'>
                <p className='fw-bold'><GiAges className='fs-2 me-2'/>   Age</p>
                <p className='w-100' >
                    {logedinUser.userage}
                </p>
            </Col>
            
            </Row>
         
        {!canSwipe &&  <div className='w-100 bg-light text-dark my-4 rounded'>
            <div className='flex-center mx-4 py-3'>
                <FiInfo className='fs-1'/>
            <h4 className=' ms-1'>In order to start swiping, you need to update your profile.</h4>
            </div>
                <div className='flex-center py-2 gap-3'>
                {picturesCheck ? <AiOutlineCheckCircle className='fs-5 text-success my-auto'/> : <GiCancel className='fs-5 text-danger my-auto'/>}
                
                <p className='fs-5 my-auto'>Upload at least two photos</p>
            </div>
            <div className='flex-center py-2 gap-3'>
                {filterCheck ?  <AiOutlineCheckCircle className='fs-5 text-success my-auto'/> : <GiCancel className='fs-5 text-danger my-auto'/>}
                 
                 <p className='fs-5 my-auto'>Save filter preferences</p>
            </div>
            
        </div>}
        
        <div className='w-100 d-flex my-5 cutomProfHeight mediaColumn'>

         <div className='w-50 d-flex justify-content-between align-items-center flex-column'>
            
             <h2 className='py-3 w-100'>Your profile photos</h2>
            <PhotoSlider photos={logedinUser.userphotos}  />
            <Button
            onClick={handleShow}
            className='my-3 w-50 btn-grad'>Add photos</Button>
            <ModalBox setShow={setShow} show={show} setpicturesCheck={setpicturesCheck}/> 
     
        </div>
         <div className='w-50 d-flex justify-content-between align-items-center flex-column'>
              <h2 className='py-3'>Your current filter</h2>
             <div className='w-50 fs-5 '>
                {(logedinUser.userfilter.city !== "" || logedinUser.userfilter.gender !== "" ||  logedinUser.userfilter.age !== null) ? (
                    <>
                   
                    <p>City: {logedinUser.userfilter.city}</p>
                    <p>Gender: {logedinUser.userfilter.gender}</p>
                    <p>Age:  {logedinUser.userfilter.age[0]} - {logedinUser.userfilter.age[1]}</p>
                    </>
                ):
                <p>Not selected</p>}
            </div>
             <Button
            onClick={handleFilterShow}
            className='my-3 w-50 btn-grad'
            >Change filter</Button>
            
            <ModalFilter setFilterCheck={setFilterCheck} showFilter={showFilter} setShowFilter={setShowFilter}/>

         </div>
          </div>
        </div>
        )}
        
        
           
       


    </Container>
  )
}

export default ProfilePage