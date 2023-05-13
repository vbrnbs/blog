import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { storage, db } from './../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const DeletePost = ({ id, imageUrl }) => {
    const navigate = useNavigate();
    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "posts", id))
            const storageRef = ref(storage, imageUrl)
            await deleteObject(storageRef)
            console.log("Document successfully deleted!");
            navigate('/')
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