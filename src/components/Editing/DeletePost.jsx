import React, { useContext } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { storage, db } from './../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../utils/useFetch';

const DeletePost = ({ id, imageUrl }) => {
    const navigate = useNavigate();
    const { useFetch } = useContext(PostContext);
    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "posts", id))
            const storageRef = ref(storage, imageUrl)
            await deleteObject(storageRef)
            console.log("Document successfully deleted!");
            useFetch();
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }


    return (

        <button
            className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
            onClick={handleDelete}
            >Delete
        </button>
    )
}

export default DeletePost