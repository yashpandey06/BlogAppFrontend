
import { Link } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
// http://localhost:8080/auth


const Header = () => {
   
    const [username, setUsername] = useState('');
    useEffect(() => {
        const token = Cookies.get('token');
        axios.get('https://blogapp-em6i.onrender.com/auth', {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {

                if (Cookies.get('token')) {
                    
                    setUsername(response.data.username)
                }
                else {
                    setUsername("");

                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="Home_Header flex flex-row justify-between  py-16 px-8  md:px-12  ">
          
            <div className="flex flex-col gap-8 lg:pl-16 ">
                <h1 className="text-5xl font-normal " >Stay Bluffing</h1>
                <p className="text-xl">Discover stories , write stories and take inpiration from others</p>
                <p className="text-xl">Keep you stories a secret</p>
                <div>
                    {username ? <Link to="/write" className=' text-xl   bg-black text-white rounded-md px-4 py-1 '>
                        Create Post
                    </Link> :
                        <Link to="/login" className=' text-xl   bg-black text-white rounded-md px-4 py-1 '>
                            Get started
                        </Link>}

                </div>
                <div>

                </div>
            </div>

        </div>
    )
}

export default Header