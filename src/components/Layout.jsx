import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
const Layout = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    const url =
      "https://blogappbackened.onrender.com/auth" ||
      "http://localhost:8080/auth";
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (Cookies.get("token")) {
          setUsername(response.data.username);
        } else {
          setUsername("");
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
  );
};

export default Layout;
