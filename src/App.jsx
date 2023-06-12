
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import Write from "./components/Write";
import Login from "./components/Login";
import Register from "./components/Register";



const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App