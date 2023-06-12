import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import axios from 'axios';
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
const Layout = () => {
  const [username, setUsername] = useState("");


  useEffect(() => {
    const token = Cookies.get('token');
    axios.get('https://blogapp-em6i.onrender.com/auth', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    })
      .then((response) => {
        
        if (response.data.username) {
          console.log(response.data.username)
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