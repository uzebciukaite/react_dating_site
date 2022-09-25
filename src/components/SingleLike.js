import React from 'react'
import {Card, Button} from 'react-bootstrap';

const SingleLike = ({user}) => {


  return (
     <Card className='customCard'>
      <Card.Img className='h-75' variant="top" src={user.userphotos[0]} />
      <Card.Body>
        <Card.Text className='text-start'>
          <p className='m-0 fw-bold'>{user.username}, {user.userage}</p>
          <p className='text-secondary'>{user.usercity}</p>
        </Card.Text>
        
      </Card.Body>
    </Card>
  )
}

export default SingleLike