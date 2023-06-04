import { Timestamp, collection, addDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage, db } from '../../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../utils/useAuth';

// https://github.com/vbrnbs/100DaysOfCode/blob/main/%2306-BlogWithFIleUpload/blog-fileupload/src/components/AddArticle.jsx

const CreatePost = () => {

  const [progress, setProgress] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    imageUrl: "",
    // imgSM: "",
    createdAt: Timestamp.now().toDate(),
    date: "",
    tags: "",
    topics: "",
    git: "",
    url: ""
  });

  console.log(user.user)


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  }

  const handleTagsChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value.toLowerCase().split(", ")
    })
  }

  const handlePublish = () => {
    if (!formData.title || !formData.text || !formData.image) {
      alert('fill all the fields!')
      return;
    }

    const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
    const uploadImage = uploadBytesResumable(storageRef, formData.image)

    uploadImage.on("state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err)
      },
      () => {
        setFormData({
          title: "",
          text: "",
          image: "",
          // imageSM: "",
          tags: "",
          topics: "",
          date: "",
          git: "",
          url: ""
          
        });
        getDownloadURL(uploadImage.snapshot.ref)
          .then((url) => {
            const articleRef = collection(db, "posts");
            addDoc(articleRef, {
              title: formData.title,
              text: formData.text,
              imageUrl: url,
              // imgageSM: formData.imageSM,
              createdAt: Timestamp.now().toDate(),
              date: date.length > 0 ? formData.date : Timestamp.now().toDate(),
              tags: formData.tags,
              topics: formData.topics,
              git: formData.git,
              url: formData.url
            })
              .then(() => {
                setProgress(0)
                navigate('/');
              })
              .catch(err => {
              })
          })
      }
    )
  }

  return (
    <div className='mt-12 mb-24 '>
      {user.user && (
        <div className='flex flex-col rounded-sm p-3 mt-3 bg-light' >
          <div className="my-4">
            <Link to={-1} className="my-32">
              back
            </Link>
          </div>
          <div className='flex flex-col rounded-sm p-3 mt-3 bg-light' >
            <h2 className='mb-6'>create Post</h2>
            {/* title */}
            <label htmlFor=''>Title</label>
            <input type="text" name="title" value={formData.title} className="form-control" onChange={(e) => handleChange(e)} />

            {/* text */}
            <label htmlFor=''>Text</label>
            <textarea name="text" value={formData.text} className="form-control h-24" onChange={(e) => handleChange(e)} />

            {/* image */}
            <label>Image</label>
            <input type="file" name='image' accept='image/*' className="form-control" onChange={(e) => handleImageChange(e)} />

            {/* imageSM */}
            <label>ImageSM</label>
            <input type="file" name='imageSM' accept='image/*' className="form-control" onChange={(e) => handleImageChange(e)} />

            {/* date */}
            <label>Date</label>
            <input type="date" name='date' className="form-control" onChange={(e) => handleChange(e)} />

            {/* tags */}
            <label>Tags</label>
            <input type="text" name='tags' className="form-control" onChange={(e) => handleTagsChange(e)} />

            {/* tags */}
            <label>Topics</label>
            <input type="text" name='topics' className="form-control" onChange={(e) => handleTagsChange(e)} />

            {/* git */}
            <label>Git Url</label>
            <input type="url" name='git' className="form-control" onChange={(e) => handleChange(e)} />

            {/* git */}
            <label>Live Url</label>
            <input type="url" name='live' className="form-control" onChange={(e) => handleChange(e)} />

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
        </div>
      )}
    </div >
  );
};

export default CreatePost;
