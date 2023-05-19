import React, { useContext } from 'react'
import Icons from './Icons'
import { Link } from 'react-router-dom'
import login from '../assets/login.svg'
import { AuthContext } from "../utils/useAuth";


const Header = () => {

  const { toggleLogin } = useContext(AuthContext);
  

  return (
    <div className='py-3 px-4 flex justify-between'>
      <div>
        <Link to='/'>
          <h1 className="windsor text-2xl font-semibold">brnbs</h1>
        </Link>
      </div>
      <div className='flex'>
        <Icons />
        <div className="ml-8 scale-150 cursor-pointer">
          <img src={login} onClick={toggleLogin}/>
        </div>
      </div>
    </div>
  )
}

export default Header
