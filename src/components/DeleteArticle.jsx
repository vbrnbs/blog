import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { storage, db } from './../firebaseConfig';
import React from 'react';


const DeleteArticle = ({id, imageUrl, display}) => {
    const handleDelete = async() => {
        try {
           await deleteDoc(doc(db, "posts", id))
           const storageRef = ref(storage, imageUrl)
           await deleteObject(storageRef)
        } catch (error) {
            console.log(error)
        }  
    } 
  return (
    
        <button className='btn btn-danger'
        onClick={handleDelete}
        >Delete</button>
    
  )
}

export default DeleteArticle