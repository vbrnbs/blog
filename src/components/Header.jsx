import React, { useContext } from 'react'
import Icons from './ui/Icons'
import github from '../assets/github.svg'
import linkedin from '../assets/linkedin.svg'
import vimeo from '../assets/vimeo.svg'
import { Link } from 'react-router-dom'
import login from '../assets/login.svg'
import { AuthContext } from "../utils/useAuth";
import { PostContext } from '../utils/useFetch'


const Header = () => {

  const { toggleLogin, user } = useContext(AuthContext);
  const { useFetch } = useContext(PostContext);

  return (
    <div className='py-3 px-4 flex justify-between'>
      <div className='align-bottom'>
        {/* <Link to='/' reloadDocument> */}
        <Link to='/'>
          <h1 className="windsor text-2xl font-semibold" onClick={useFetch} >brnbs</h1>
        </Link>
        {/* <Link to='/' >
          <h1 className="windsor font-semibold">reload</h1>
        </Link> */}
      </div>
      <div className='flex'>

        {user.user ?
          <div className='flex lg:flex-row flex-col'>
            <div className='text-sm items-center flex justify-end align-middle'>
              <p className='lg:mr-2 cursor-pointer' onClick={toggleLogin} >{user._tokenResponse.email}</p>
            </div>
            <div className='text-sm items-center flex justify-center align-middle order-first lg:order-last'>
              <Link to={"/new"}>
                <p className='mr-1 border-4 border-black px-1 rounded-md text-sm hover:underline'>new</p>
              </Link>
              <Icons />
            </div>
          </div>
          :
          <div className="ml-8 cursor-pointer flex items-center">
            
            <p
              title='Login'
              className='align-middle mr-1 text-3xl'
              onClick={toggleLogin} >💥
            </p>
            <Icons />
          </div>
        }
      </div>
    </div>
  )
}

export default Header
