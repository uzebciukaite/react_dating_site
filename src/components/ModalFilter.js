import React, {useState, useContext} from 'react'
import {Button, Modal} from 'react-bootstrap'
import RangeSlider from 'react-range-slider-input';
import { useNavigate } from 'react-router';
import mainContext from '../context/mainContext'

const ModalFilter = ({setFilterCheck, setShowFilter, showFilter}) => {

const {logedinUser, socket} = useContext(mainContext) 
const [city, setCity] = useState("Not selected")
const [gender, setGender] = useState("Not selected")
const [value, setValue] = useState([18, 90])
const [errorMessage, setErrorMessage] = useState("")
const nav = useNavigate()

const handleClose = () => {
  setShowFilter(false)
  
}

const changeCity = (city) => {
    setCity(city)
}


const changeGender = (gen) => {
    setGender(gen)
}
    
const setFilterSettings = async () => {

  if(city === "Not selected" || gender === "Not selected"){
    setErrorMessage("Filter value cannot be Not Selected")
  } else {

    const filters = {
        currentuser: logedinUser.username,
        city,
        gender,
        value
    }
    

     const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(filters)

    }
       fetch("http://localhost:4000/filter", options)
      .then(res => res.json())
      .then((data) => {
        if(!data.error){
        setFilterCheck(true)
        socket.emit("update_user", data.user)
        socket.emit("swipe_users", "canswipe")
          setTimeout(() => {
            nav("/swipe")
          },1000)
        } else {
          console.log(data.message)
        }
      })

  }
    

}

  return (
    <Modal
     show={showFilter} 
     onHide={handleClose}
     fullscreen={'md-down'}
     className='font-custom '
     size="lg"
     contentClassName="modal-custom"
     >
      <Modal.Header className='border-0' closeButton>
        <Modal.Title className='w-100 text-center'>Filter your preferences</Modal.Title>
      </Modal.Header>
      <Modal.Body className='w-100 flex-center'>
        <div className='d-flex flex-column filterCustom fullWidthMedia'>
          <div className='w-100 pb-3'>
          <div className='d-flex justify-content-between align-items-center fs-5 '>
            <label htmlFor="city">City</label>
            {city}
         </div>
              <select
              onChange={(event) => changeCity(event.target.value)}
              value={city}
              className='w-100 mt-2' id="city" >
                <option defaultValue="none">Not selected</option>
                <option value="Vilnius">Vilnius</option>
                <option value="Kaunas">Kaunas</option>
                <option value="Klaipeda">Klaipeda</option>
              </select>
          </div>
          <div className='w-100 pb-3'>
            <div className='d-flex justify-content-between align-items-center fs-5'  >
            <label htmlFor="gender"> Gender</label>
                {gender}
            </div>
            <select
            onChange={(event) => changeGender(event.target.value)}
            value={gender}
            className='w-100 mt-2' id="gender" >
                <option defaultValue="none">Not selected</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option> 
            </select>
    </div>   
    <div className='w-100 pb-3'>
         <div className='d-flex pb-3 justify-content-between align-items-center fs-5'>
            <label htmlFor="age">Age range</label>
            {value[0]} - {value[1]}
         </div>
        
        <RangeSlider 
        step={1}
        min={18} 
        max={90} 
        onInput={(e) => setValue(e)}
        className="mt-2"
        />
      </div>
       {errorMessage !== "" && <p className='w-100 text-center text-danger fs-5'>{errorMessage}</p>}
    </div>
        
        
      </Modal.Body>

      <Modal.Footer className='border-0 w-100'>
        
        <Button 
          onClick={setFilterSettings}
          className='btn btn-grad'>Save preferences</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalFilter