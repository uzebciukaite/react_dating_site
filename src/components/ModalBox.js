import React, {useState, useRef, useContext} from 'react'
import {Modal, Button} from 'react-bootstrap';
import mainContext from '../context/mainContext'

const ModalBox = ({setShow, show}) => {
const {logedinUser, socket} = useContext(mainContext)  
const [photos, setPhotos] = useState([])
const imgRef = useRef()


const handleClose = () => {
  setShow(false)
  setPhotos([])
}
const addPhotos = () => {
const newPhoto = imgRef.current.value

setPhotos([...photos, newPhoto])

imgRef.current.value = ""
} 


const savePhotos = () => {

  const datatoUpdate = {
    username: logedinUser.username,
    userphotos: photos

  }
  

   const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(datatoUpdate)

    }
       fetch("http://localhost:4000/uploadPhotos", options)
      .then(res => res.json())
      .then((data) => {
        socket.emit("update_user", data.user)
      })
      setShow(false)
      setPhotos([])

}




  return (
     <Modal
     show={show} 
     onHide={handleClose}
     fullscreen={'md-down'}
     className='font-custom '
     size="lg"
     contentClassName="modal-custom"
     >
      <Modal.Header className='border-0' closeButton>
        <Modal.Title>Upload photos</Modal.Title>
      </Modal.Header>
      <Modal.Body className='w-100 '>
        
        <div className='flex-center flex-column gap-4 align-items-center'>
          <input ref={imgRef} type="text" placeholder='image URL' />
          <Button onClick={addPhotos} className='btn-grad'>add</Button>
        </div>
        <div className='py-4 flex-center h-75 gap-2 flex-wrap'>
          {photos && photos.map((x, i) => (
            <div key={i} className='customPrev'>
              <img className='rounded' key={i} src={x} alt="" />
            </div>
          ))}
        </div>
        
      </Modal.Body>

      <Modal.Footer className='border-0 w-100'>
        <Button className='btn-grad' onClick={savePhotos} >Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalBox