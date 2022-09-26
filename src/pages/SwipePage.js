import React, {useState, useMemo, useEffect, useContext} from 'react'
import {Container} from 'react-bootstrap'
import TinderCard from 'react-tinder-card'
import mainContext from '../context/mainContext'
import {FaHeart} from 'react-icons/fa'
import {CgClose} from 'react-icons/cg'
import { MdNavigateBefore, MdNavigateNext} from "react-icons/md"

const SwipePage = ({}) => {
  const {usersSwipe, setUsersSwipe, logedinUser, setLogedinUser, socket} = useContext(mainContext)  
  const [currentIndex, setCurrentIndex] = useState()
  const [canSwipe, setCanSwipe] = useState(false)
  const [bgIndex, setBgIndex] = useState(0)


    
  useEffect(()=> {
     
    socket.on("user_filterset", (data) => {
    setUsersSwipe(data)
    
    })
    socket.on("likes_added", (data) => {
        setLogedinUser(data.userInfo)
       })  


  },[socket])

  


  useEffect(()=> {
    if(usersSwipe){
      setCurrentIndex(usersSwipe.length - 1) 
    }

    
  },[usersSwipe])

  useEffect(()=> {
    
    if(currentIndex >= 0){
      setCanSwipe(true)
    } 
    else if(currentIndex < 0 && usersSwipe.length > 0) {
      setTimeout(()=> {
        setCanSwipe(false)
      },[500])
    }
  },[currentIndex])


  const childRefs = useMemo(
    () =>
      Array(usersSwipe.length)
        .fill(0)
        .map((i) => React.createRef()),
    [usersSwipe]
  )


  useEffect(() => {
        if(bgIndex > logedinUser.userphotos.length - 1){
            setBgIndex(0)
        }
        if(bgIndex < 0){
            setBgIndex(logedinUser.userphotos.length - 1 )
        }

    },[bgIndex])

  const outOfFrame = (name, idx) => {
 
  }


const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    
  }

  let userInfo = {}

const swiped = (direction, user, index) => {

    if(direction === "right"){
      userInfo = {
        currentuser: logedinUser.username,
        disliked: null,
        likeduser: user.username
      }
    } else {
      userInfo = {
        currentuser: logedinUser.username,
        disliked: user.username,
        likeduser: null
      }
    }

     const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:3000',
        },
        body: JSON.stringify(userInfo)

    }
       fetch("http://localhost:4000/addlikes", options)
      .then(res => res.json())
      .then((data) => {        
        
        socket.emit("send_likes", userInfo)
        
      })


    updateCurrentIndex(index - 1)
    setBgIndex(0)
  }


   const swipe =  (dir) => {
    if (canSwipe && currentIndex < usersSwipe.length) {
       childRefs[currentIndex].current.swipe(dir)
    }
    setBgIndex(0)

  }




  return (
    <Container className='flex-center flex-column customHeight' >
      {canSwipe && currentIndex < usersSwipe.length ? (
        <>
           <div className='cardContainer my-5'>
            {usersSwipe.map((character, index) => (
        <TinderCard
        className='swipe' 
        ref={childRefs[index]}
        key={index}
        onSwipe={(dir) => swiped(dir, usersSwipe[index], index)}
        onCardLeftScreen={() => outOfFrame(character.username, index)} >
            <div className='card'>
                 <div
            style={{ backgroundImage: 'url(' + character.userphotos[bgIndex] + ')' }}
            className='cardImage d-flex align-items-center justify-content-between'
            >
              <div onClick={() => setBgIndex(bgIndex - 1) } className='slideIcons flex-center'>
            <MdNavigateBefore className='fs-2 text-dark'/>
        </div>
             <div onClick={() => setBgIndex(bgIndex + 1) } className='slideIcons  flex-center text-light'>
            <MdNavigateNext className='fs-2 text-dark'/>
        </div>

            </div>
             <div className='cardText'>
                <p className='fw-bold fs-5 m-0'>{character.username}, {character.userage}</p>
                <p>{character.usercity}</p>
                
                </div> 
            </div>
           
       </TinderCard>
        ))}
        </div>
        <div className='tinderButtons flex-center gap-5'>
            <div onClick={() => swipe('left')} className='tinderBtn'>
                <CgClose strokeWidth="1" className='fs-2 delete'/>
            </div>
            <div onClick={() => swipe('right')} className='tinderBtn'>
                <FaHeart className='fs-2 heart'/>
            </div>
        </div>
        
        
        
        </>
      ):(
        <div>
        <h2 className='text-light'>There are no users to swipe..</h2>
        
        </div>
      )
     
       }
      
       
    </Container>
  )
}

export default SwipePage