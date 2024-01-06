/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axios from "axios";

const Section = () => {
  const [data, setData] = useState([]);
  const [vacData, setVacData] = useState([]);

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!username) {
      axios
        .get("http://localhost:8080/key")
        .then((response) => {
          setVacData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [username]);

  useEffect(() => {
    const token = Cookies.get("token");

    axios
      .get("http://localhost:8080/upload", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        alert("Please Login or Register");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");

    axios
      .get("http://localhost:8080/user", {
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

  const renderImage = (item) => {
    if (item.picture) {
      return `data:image/png;base64,${item.picture}`;
    } else {
      return null;
    }
  };

  return (
    <div className="flex flex-col justify-between py-16 px-8 md:px-12 gap-6">
      {username ? (
        <div>
          {data.map((item) => (
            <div key={item._id}>
              <Link className="flex justify-around items-center md:p-2 mb-3 shadow-md rounded-lg duration-150 shadow-slate-500  my-9">
                <div className="flex flex-col w-full md:w-3/5 gap-4 p-4">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-4">
                      <h1 className="font-bold font-signature text-xl">
                        Title : {item.title}
                      </h1>
                      <h3 className="">Summary : {item.summary}</h3>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <span className="font-bold">author: </span> {username}
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div>Dummy data</div>
          {vacData.map((item) => (

            <div key={item._id}>
            
              <Link className="flex justify-around items-center md:p-2 mb-3 shadow-md rounded-lg duration-150 shadow-slate-500 my-9">
                <div className="flex flex-col w-full md:w-3/5 gap-4 p-4">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-4">
                      <h1 className="font-bold font-signature text-xl">
                        {item.title}
                      </h1>
                      <h3 className="">{item.summary}</h3>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <span className="font-bold">author: Gigachad </span>{" "}
                        {username}
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </div>
                <div className="">
                  {item.picture && (
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
      )}
    </div>
  );
};

export default Section;
