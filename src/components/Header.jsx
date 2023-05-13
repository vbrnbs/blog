import React from 'react'
import Icons from './Icons'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <div className='p-2 flex justify-between'>
      <div>
        <Link to='/'>
          <h1 className="windsor text-2xl font-semibold">brnbs</h1>
        </Link>
      </div>
      <Icons />
    </div>
  )
}

export default Header
