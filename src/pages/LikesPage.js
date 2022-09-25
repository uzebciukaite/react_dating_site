import React, {useContext, useEffect} from 'react'
import {Container, Tabs, Tab} from 'react-bootstrap'
import SingleLike from '../components/SingleLike'

import mainContext from '../context/mainContext'

const LikesPage = () => {
const {logedinUser, setLogedinUser, socket} = useContext(mainContext) 


  useEffect(()=> {
    socket.on("likes_added", (data) => {
            setLogedinUser(data.userInfo)
            console.log("came from likes added in like page")
        })    
  },[socket])

useEffect(() => {

socket.emit("swipe_users", "canswipe")

},[])



    
  return (
    <Container>
      <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="my-3 tab fs-5"
      justify
    >
      <Tab 
      eventKey="yourlikes" 
      title={`People who you liked  ${logedinUser.userlikes.length > 0? `( ${logedinUser.userlikes.length} )` : "" } `}>
      
        <div className='flex-center gap-3 flex-wrap py-4'>
          
        {logedinUser.userlikes.length > 0 ? (
          logedinUser.userlikes.map((x, i) => (
            
            <SingleLike user={x} key={i}/>
          ))
        ) : <h2 className='text-light'>You have no likes.</h2>}
        </div>
        
      </Tab>
      <Tab eventKey="profile"
       
       title={`People who liked you  ${logedinUser.userlikedby.length > 0? `( ${logedinUser.userlikedby.length} )` : "" } `}>
       
        <div className='flex-center gap-3 flex-wrap py-4'>
        
        {logedinUser.userlikedby.length > 0 ? (
          logedinUser.userlikedby.map((x, i) => (
            
            <SingleLike user={x} key={i}/>
          ))
        ) : <h2 className='text-light'>You were liked by no one.</h2>}
      </div>
      </Tab>
      
    </Tabs>
      
      

    </Container>
  )
}

export default LikesPage