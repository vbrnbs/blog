import React from 'react'
import AddArticle from './AddArticle'
import Articles from './Articles'
import DeleteArticle from './DeleteArticle'

const Admin = () => {
  return (
    <div>
        <AddArticle />
        <Articles edit={true}/>
    </div>
  )
}

export default Admin