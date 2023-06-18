import React, { useState, useContext } from 'react';
import { Timestamp, collection, setDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage, db } from '../../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import HTMLEditor from '../ui/TInyMCE/HTMLEditor';
import { PostContext } from '../../utils/useFetch';

const EditPost = ({ post }) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { useFetch } = useContext(PostContext);
  const [formData, setFormData] = useState({
    title: post.title || '',
    text: post.text || '',
    date: post.date,
    desc: post.desc || '',
    tags: post.tags && post.tags,
    topics: post.topics && post.topics,
    imageUrl: post.imageUrl || '',
    createdAt: post.createdAt || null,
    git: post.git || '',
    url: post.url || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePublish = () => {
    console.log(formData);

    const docRef = doc(db, 'posts', post.id);
    setDoc(docRef, {
      title: formData.title,
      text: formData.text,
      desc: formData.desc,
      date: formData.date,
      imageUrl: formData.imageUrl,
      createdAt: formData.createdAt || Timestamp.now().toDate(),
      tags: formData.tags && formData.tags,
      topics: formData.topics && formData.topics,
      git: formData.git,
      url: formData.url
    })
      .then(() => {
        setProgress(0);
        console.log('Document successfully written!', formData);
        useFetch();
        navigate('/');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  return (
    <div>
      <div className="mt-12 mb-24">
        <div className="flex flex-col border rounded-sm p-3 mt-3 bg-light">
          <h2 className="mb-6">Publish Post</h2>
          <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">
            https://console.firebase.google.com/
          </a>

          <label htmlFor="title">Title</label>
          <input type="text" name="title" value={formData.title} className="form-control" onChange={handleChange} />

          <label htmlFor="date">New Date?</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            className="form-control"
            onChange={handleChange}
          />

          <label htmlFor="text">Text</label>
          {/* <textarea name="text" value={formData.text} className="form-control h-24" onChange={handleChange} /> */}
          <HTMLEditor formData={formData} setFormData={setFormData} />

          <label htmlFor="desc">Description</label>
          <textarea name="desc" value={formData.desc} className="form-control h-24" onChange={handleChange} />


          <label>Git URL</label>
          <input type="url" name="git" value={formData.git} className="form-control" onChange={handleChange} />

          <label>Live URL</label>
          <input type="url" name="url" value={formData.url} className="form-control" onChange={handleChange} />

          {progress === 0 ? null : (
            <div className="form-control my-4">
              <div className="rounded my-2 h-2 bg-yellow-400" style={{ width: `${progress}%` }}></div>
              <p>{`Uploading image ${progress}%`}</p>
            </div>
          )}
          <button className="mt-2 w-36" onClick={handlePublish}>
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;


  // const handleImageChange = (e) => {
  //   setFormData({ ...formData, image: e.target.files[0] });
  // };

  // const handleTagsChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value.toLowerCase().split(/,\s*/)
  //   });
  // };


          {/* <label>Image</label>
          <input type="file" name="image" accept="image/*" className="form-control" onChange={handleImageChange} />

          <label>Tags</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleTagsChange} />

          <label>Topics</label>
          <input type="text" name="topics" value={formData.topics} className="form-control" onChange={handleTagsChange} /> */}


