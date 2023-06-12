
import { Link } from 'react-router-dom'
import BlurOnOutlinedIcon from '@mui/icons-material/BlurOnOutlined';


// eslint-disable-next-line react/prop-types
const Navbar = ({ username }) => {
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  function Logout() {
    deleteCookie('token');
    window.location.reload();
  }

  return (
    <header className="py-5 px-8 md:px-12 flex bg-fixed items-center justify-between">
      <Link to="/" className="flex items-center gap-2 ">
        <div className="">
          <BlurOnOutlinedIcon className='' style={{ fontSize: 30 }} />
        </div>
        <span className="text-black text-3xl font-bold font-signature">Bluff</span>
      </Link>
      {username ?
        <div className="flex items-center gap-4 text-md  ">
          <button>{username}</button>
          <button className=' bg-black rounded-xl  p-2 text-white' onClick={Logout}>logout</button>
        </div>
        : <Link to="/login" className=' md:flex bg-black rounded-xl  p-2 text-white'>
          <div className="lg:flex items-center gap-4 text-md  ">
            <button>Sign in</button>
          </div>
        </Link>}


    </header>
  )
}

export default Navbar