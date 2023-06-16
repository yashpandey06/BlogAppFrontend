/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axios from "axios";

const Section = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const token = Cookies.get("token");

    axios
      .get("https://blogapp-em6i.onrender.com/upload", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response.data)
        setData(response.data);
      })
      .catch((err) => {
       
        alert("Error while fetching your posts....try again later");
        res.status(500).json({
          error:err
        })
      });
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get("https://blogapp-em6i.onrender.com/user", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
      .then((response) => {

        setUsername(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(()=>{
    axios.get('https://blogapp-em6i.onrender.com/render')
    .then((response)=>{
      console.log(response);
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  const renderImage = (item) => {
    if (item.picture) {
      return `data:image/png;base64,${item.picture}`;
    } else {
      return null; 
    }
  };

  return (
    <div className="flex flex-col justify-between  py-16 px-8 md:px-12  gap-6 ">

      {data.map((item) => (
        
        <div key={item._id}>
          <Link className="flex justify-around items-center  md:p-2 mb-3  shadow-md  rounded-lg duration-150 shadow-slate-500 ">
            <div className="flex flex-col  w-full md:w-3/5 gap-4 p-4">
              <div className="flex flex-row justify-between  items-center">
                <div className="flex  flex-col gap-4">
                  <h1 className="font-bold font-signature text-xl">
                    {item.title}
                  </h1>
                  <h3 className="">{item.summary}</h3>
                </div>
                <div className="flex  flex-col gap-4">
                  <div>
                    <span className=" font-bold">author: </span> {username}
                  </div>
                  <div></div>
                </div>
              </div>

              <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
            </div>
            <div className="">
              {item.picture  && (
                <img
                className="rounded-md pr-2"
                src={renderImage(item)}
                alt=""
                />

              )}

            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Section;
