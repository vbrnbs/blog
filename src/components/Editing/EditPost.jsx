import { doc, setDoc } from 'firebase/firestore'
import { db } from './../../firebaseConfig'
import React from 'react'

// https://www.youtube.com/watch?v=E2NSV1bEbp4
// amit nem updatelek,az maradjon ugyan az, most csak a title-t es a text-et updateli, tobbit torli

const EditPost = (id) => {
    const handleEdit = (e) => {
        const newTitle = prompt('Enter new title')
        const newText = prompt('Enter new text')
        

        setDoc(doc(db, "posts", id.id), {
            title: newTitle,
            text: newText,
    })
}
  return (
    <div>
      <button className='bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded'
        onClick={handleEdit}
        >Edit</button>
    </div>
  )
}

export default EditPost
