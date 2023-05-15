import React, { useState } from 'react'
import { Timestamp, collection, setDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage, db } from '../../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';

const EditPost = ({ post }) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: post.title,
    text: post.text,
    date: post.date,
    tags: post.tags.join(", "),
    imageUrl: post.imageUrl,
    createdAt: post.createdAt,
    git: post.git,
    url: post.url
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  }

  const handleTagsChange = (e) => {
    setFormData({
      ...formData, tags: e.target.value.toLowerCase().split(",")
    })
  }

  const handlePublish = () => {

    // const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
    // const uploadImage = uploadBytesResumable(storageRef, formData.image)

    // uploadImage.on("state_changed",
    //   (snapshot) => {
    //     const progressPercent = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    //     setProgress(progressPercent);
    //   },
    //   (err) => {
    //     console.log(err)
    //   },
    //   () => {
    //     getDownloadURL(uploadImage.snapshot.ref)
    //       .then((url) => {
            const docRef = doc(db, "posts", post.id);
            setDoc(docRef, {
              title: formData.title,
              text: formData.text,
              date: formData.date,
              imageUrl: formData.imageUrl,
              createdAt: Timestamp.now().toDate(),
              tags: formData.tags,
              git: formData.git,
              url: formData.url
            })
              .then(() => {
                setProgress(0)
                navigate('/');
              })
              .catch(err => {
              })
          }
          //)
    //    }
    //  )
  //}

  console.log("posts", formData)
  console.log(post.tags.join(","))


  return (
    <div>
      <div className='mt-12 mb-24 '>
        {/* <div className='mt-12 mb-24 '>
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
      </div> */}
        <div className='flex flex-col border rounded-sm p-3 mt-3 bg-light' >
          <h2 className='mb-6'>Publish Post</h2>
          {/* title */}
          <label htmlFor=''>Title</label>
          <input type="text" name="title" value={formData.title} className="form-control" onChange={(e) => handleChange(e)} />
          {/* date */}
          <label for="date">New Date?</label>
          <input type="text" name="date" value={formData.date} className="form-control" onChange={(e) => handleChange(e)} />
          {/* text */}
          <label htmlFor=''>Text</label>
          <textarea name="text" value={formData.text} className="form-control h-24" onChange={(e) => handleChange(e)} />

          {/* image */}
          <label>Image</label>
          <input type="file" name='image' accept='image/*' className="form-control" onChange={(e) => handleImageChange(e)} />

          {/* tags */}
          <label>Tags</label>
          <input type="text" name='tags' value={formData.tags} className="form-control" onChange={(e) => handleTagsChange(e)} />

          {/* git */}
          <label>Git Url</label>
          <input type="url" name='git' value={formData.git} className="form-control" onChange={(e) => handleChange(e)} />

          {/* git */}
          <label>Live Url</label>
          <input type="url" name='url' value={formData.url}  className="form-control" onChange={(e) => handleChange(e)} />

          {/* progress */}
          {progress === 0 ? null : (
            <div className="form-control my-4 ">
              <div className="rounded my-2 h-2 bg-yellow-400" style={{ width: `${progress}%` }}>
              </div>
              <p>{`uploading image ${progress}%`}</p>
            </div>
          )}
          <button className='mt-2 w-36' onClick={handlePublish}>Publish</button>
        </div>
      </div >
    </div>
  )
}

export default EditPost
