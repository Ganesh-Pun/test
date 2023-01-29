import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import {Routes , Route} from 'react-router-dom';
import Contact from './Components/Header/Contact/Contact';
import About from './Components/Header/About/About';
import Error from './Components/Header/ErrorPage/Error';
import Home from './Components/Header/Home';
import Donate from './Components/Header/Donate/Donate';
import ProtectedRoute from './Components/ProtectedRoute';
import { useState , useEffect } from 'react';
import Admin from './Components/Admin/Admin';
import History from './Components/History/History';
import User from './Components/Admin/Users/User'
import Volunteer_Signup from './Components/Admin/Volunteers_Signup/volunteers_Signup'
import Donated_stuff from './Components/Admin/Donated_Stuff/Donated_stuff'
import Received_Items from './Components/Admin/Received_Items/Received_Items'



let dummy_data = []; // for storing data

function App() {

  let [item, setItem] = useState(dummy_data);
// getting data from database

  let database = async () =>{
    
    let res = await fetch("http://localhost:8030/register");
    let data = await res.json();
    setItem(data); 
    // console.log(data);
  }
  
  useEffect(()=>{
    database();
  },[]);

//************************************************************************ */

  // Recieving sign Up credentials from SignUp.jsx

  let signUpInfo = (Recieve)=>{
    fetch("http://localhost:8030/register",{
      method : "POST",
      body : JSON.stringify(Recieve),
      headers : {
        'content-Type' : 'Application/json' 
      }
    })
  }

  return (
    <div className="App">

    {/* <Navbar/> */}

      {/* <Login/> */}
      {/* <SignUp/> */}

{/* /************************************************************************* */ }

<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/contact' element={<Contact/>}/>
  <Route path='/donate' element={<ProtectedRoute Component={Donate}/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path='/admin' element={<Admin count_D = {item}/>}/>
  <Route path='/history' element={<History/>}/>
  <Route path='/login' element={<Login sendData = {item}/>}/>
  <Route path='/signUp' element={ <SignUp getDataa={signUpInfo}/> } />
  <Route path='/user' element={<User donar_info = {item}/>}/>
  <Route path='/volunteer' element={<Volunteer_Signup/>}/>
  <Route path='/donated_stuff' element={<Donated_stuff/>}/>
  <Route path='/Received_Items' element={<Received_Items/>}/>
  <Route path='*' element={<Error/>}/>  
  
</Routes>







    </div>
  );
}

export default App;
