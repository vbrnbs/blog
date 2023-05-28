import React from 'react'
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <>
      <div className="my-4">
        <Link to={-1} className="my-32">
          back
        </Link>
      </div>
      <div className="flex justify-center items-center h-screen">
        <h1>Page not found</h1>
      </div>
    </>

  )
}

export default Notfound
