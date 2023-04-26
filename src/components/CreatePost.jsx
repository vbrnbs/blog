import React, { useState } from 'react'
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";


const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [tags, setTags] = useState([])

    const handleNewPost = async () => {
        const collectionRef = collection(db, "posts")
        const payload = {
            title: "My First Post",
            text: "Hello World",
            tags: ["react", "firebase"]
            // No routes matched location "/?title=&text=&tags=" 
            // title: title,
            // text: text,
            // tags: tags
        };
        await addDoc(collectionRef, payload);
    }

    const handleClickEvent = async (e) => {
        const docRef = doc(db, "posts", "post-id");
        const payload = { title: "My First Post", text: "Hello World", tags: ["react", "firebase"] };
        await setDoc(docRef, payload);
    }

    return (
        <div className='flex-col mt-12 mb-24'>
            <h2>Create Blog Post</h2>
            <form>
                <label htmlFor="title"></label>
                <input type="text" placeholder='Title' id="title" name="title" onChange={e => setTitle(e.target.value)} />
                <label htmlFor="text"></label>
                <textarea id="text" placeholder='Text' name="text" onChange={e => setText([e.target.value])} />
                <label htmlFor="tags"></label>
                <input type="text" id="tags" placeholder='Tags' name="tags" onChange={e => setTags([e.target.value])} />
                <button type="submit" onSubmit={(handleNewPost)}>Create Post</button>
            </form>
        </div>
    )
}

export default CreatePost
