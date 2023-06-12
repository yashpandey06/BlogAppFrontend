import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import axios from 'axios';
import { useEffect, useState } from "react";
const Layout = () => {
  const [username, setUsername] = useState("");


  useEffect(() => {
    axios.get('https://blogapp-em6i.onrender.com/auth', {
      withCredentials: true,
    })
      .then((response) => {
        
        if (response.get.username) {
          setUsername(response.data.username)
        }
        else{
          setUsername(" ");
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Navbar username={username} />
      <Outlet />
    </div>
  )
}

export default Layout