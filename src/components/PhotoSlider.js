import React, {useEffect, useState} from 'react'
import { Container } from 'react-bootstrap'
import { MdNavigateBefore, MdNavigateNext} from "react-icons/md"


const PhotoSlider = ({photos}) => {
   
    
    const [photoIndex, setPhotoIndex] = useState(0)

    useEffect(() => {
        if(photoIndex > photos.length - 1){
            setPhotoIndex(0)
        }
        if(photoIndex < 0){
            setPhotoIndex(photos.length - 1 )
        }

    },[photoIndex])



  return (
    <Container className='flex-center w-100'>
        {photos.length >= 2 ? (
        
        <div 
        className='d-flex align-items-center justify-content-between w-75 profilePhoto'
        style={{ backgroundImage: 'url(' + photos[photoIndex] + ')' }}>
        <div onClick={() => setPhotoIndex(photoIndex - 1) } className='slideIcons flex-center'>
            <MdNavigateBefore className='fs-2 text-light'/>
        </div>
        <div onClick={() => setPhotoIndex(photoIndex + 1) } className='slideIcons  flex-center text-light'>
            <MdNavigateNext className='fs-2 text-light'/>
        </div>
        </div>
       
        ) : 
        <div className='w-75'>
            <img className='profilePhoto rounded' src="https://odenta32.lt/wp-content/uploads/2022/05/blank-profile-picture-973460_640.png" alt="" />
        </div>
    
    }
        
    </Container>
  )
}

export default PhotoSlider