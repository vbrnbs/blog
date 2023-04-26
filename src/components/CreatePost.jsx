import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

// https://github.com/vbrnbs/100DaysOfCode/blob/main/%2306-BlogWithFIleUpload/blog-fileupload/src/components/AddArticle.jsx

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);

  const handleNewPost = async (e) => {
    e.preventDefault();
    
    const payload = {
      createdAt: Timestamp.now(),
      title: title,
      text: text,
      tags: tags
    };

    await addDoc(collection(db, "posts"), payload);

    setTitle('');
    setText('');
    setTags([]);
  };

  return (
    <div className='mt-12 mb-24 '>
      <h2>Create Blog Post</h2>
      <form onSubmit={handleNewPost} className=' '>
        <label htmlFor="title"></label>
        <input type="text" placeholder='Title' id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
        
        <label htmlFor="text"></label>
        <textarea id="text" placeholder='Text' name="text" value={text} onChange={e => setText(e.target.value)} />
        
        <label htmlFor="tags"></label>
        <input type="text" id="tags" placeholder='Tags' name="tags" value={tags} onChange={e => setTags(e.target.value.split(','))} />
        
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
