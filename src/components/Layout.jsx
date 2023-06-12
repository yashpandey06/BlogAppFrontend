import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import axios from 'axios';
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
const Layout = () => {
  const [username, setUsername] = useState('');


  useEffect(() => {
    axios.get('https://blogapp-em6i.onrender.com/auth', {
      withCredentials: true,
    })
      .then((response) => {
        
        if (Cookies.get('token')) {
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
      {username && <Navbar username={username} />}
      <Outlet />
    </div>
  )
}

export default Layout