import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import mainContext from './context/mainContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Toolbar from './components/Toolbar';
import Register from './components/Register';
import Login from './components/Login';
import ProfilePage from './pages/ProfilePage';
import SwipePage from './pages/SwipePage';
import LikesPage from './pages/LikesPage';
import io from "socket.io-client"
const socket = io.connect("http://localhost:4000")


function App() {

const [logedinUser, setLogedinUser] = useState(null)
const [allUsers, setAllUsers] = useState(null)
const [canSwipe, setCanSwipe] = useState(false)
const [usersSwipe, setUsersSwipe] = useState([])



 useEffect(()=> {
        
  socket.on("user_connected", (data) => {
    setLogedinUser(data.userInfo)
    }) 
    },[socket])



  return (
   <mainContext.Provider value={{socket, logedinUser, setLogedinUser, canSwipe, setCanSwipe, usersSwipe, setUsersSwipe, allUsers, setAllUsers}}>
<div className="App"> 

<BrowserRouter>
<Toolbar/>
<Routes>
  
 <Route path="/register" element={<Register/>}/>
 <Route path="/" element={<Login/>}/>
 <Route path="/profile" element={<ProfilePage/>}/>
 <Route path="/swipe" element={<SwipePage/>}/>
 <Route path="/likes" element={<LikesPage/>}/>
 

</Routes>

</BrowserRouter>

</div>

</mainContext.Provider>
  );
}

export default App;
