import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Write = () => {
  const token = Cookies.get('token')

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState('');
  const navigate = useNavigate();

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handlesummary(e) {
    setSummary(e.target.value);
  }
  function handleContent(value) {
    setContent(value);
  }
  function handlePictureChange(e) {
    const file = e.target.files[0];
    setFile(file);

  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(file)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("file", file);


    fetch('http://localhost:8080/upload', {
      method: 'POST',
      // Include the file and other data in the request body
      body: formData,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }

    })
      .then((response) => {
        if (response.status === 201) {

          console.log("Successfully posted");
          navigate('/')
        } else {
          console.log("Error sending the data");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }


  return (
    <div className=" write min-h-screen font-normal    flex justify-center items-center py-8  ">
      <div className="w-full max-w-md backdrop-filter backdrop-blur-lg bg-opacity-40  p-8 rounded-lg shadow-xl bg-stone-300">
        <h1 className="text-3xl font-bold mb-4 font-signature text-center ">
          Create Post
        </h1>
        <form action="http://localhost:8080/profile" encType="multipart/form-data" onSubmit={handleSubmit} className="space-y-4" >
          <label htmlFor="title" className="font-bold text-lg font-normal">
            TITLE:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="border border-gray-800 bg-slate-200 px-4 py-2 rounded w-full "
            required
          />
          <label htmlFor="title" className="font-bold text-lg font-normal">
            SUMMARY:
          </label>
          <input
            type="text"
            id="summary"
            value={summary}
            onChange={handlesummary}
            className="border border-gray-800 bg-slate-200 px-4 py-2 rounded w-full "
            required
          />
          <input type="file" name="picture" onChange={handlePictureChange} />

          <ReactQuill
            className="shadow-md    "
            value={content}
            onChange={handleContent}
          />
          <button
            type="submit"
            className="bg-black font-normal text-white font-bold py-2 px-4 rounded "
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Write;
