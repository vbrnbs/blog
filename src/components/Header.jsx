import React, { useContext } from 'react'
import Icons from './ui/Icons'
import { Link } from 'react-router-dom'
import login from '../assets/login.svg'
import { AuthContext } from "../utils/useAuth";


const Header = () => {

  const { toggleLogin, user } = useContext(AuthContext);

  return (
    <div className='py-3 px-4 flex justify-between'>
      <div>
        {/* <Link to='/' reloadDocument> */}
        <Link to='/'>
          <h1 className="windsor text-2xl font-semibold">brnbs</h1>
        </Link>
        {/* <Link to='/' >
          <h1 className="windsor font-semibold">reload</h1>
        </Link> */}
      </div>
      <div className='flex'>
        
        {user.user ?
          <div className='text-sm items-center flex justify-center align-middle'>
            <p className='mr-2 cursor-pointer' onClick={toggleLogin} >{user._tokenResponse.email}</p>
            <Icons />
          </div>
          :
          <div className="ml-8 cursor-pointer flex items-center">
            <Icons />
            <p
              className='align-middle ml-2'
              onClick={toggleLogin} >LOGIN</p>
          </div>
        }
      </div>
    </div>
  )
}

export default Header
