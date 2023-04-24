import React from 'react'
import Icons from './Icons'


const Header = () => {
  return (
    <div className='py-2 px-3 flex justify-between'>
      <div>
        <h1 className="windsor text-2xl font-semibold" >brnbs</h1>
      </div>
      <Icons />
    </div>
  )
}

export default Header
