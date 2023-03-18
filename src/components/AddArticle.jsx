import { Timestamp, collection, addDoc, setDoc, doc } from 'firebase/firestore';
import React, { useState }from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage, db } from './../firebaseConfig';

const AddArticle = () => {

    const [formData, setFormData] = useState({
        title: "",
        text: "",
        imageUrl: "",
        createdAt: Timestamp.now().toDate(),
        tags: "",
        git: "",
        url: ""
    });

    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    }

    const handleTagsChange = (e) => {
        setFormData({...formData, tags: e.target.value.split(", ")
        })
    }

    const handlePublish = () => {
        if(!formData.title || !formData.text || !formData.image ) {
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
                tags: "",
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
                    createdAt: Timestamp.now().toDate(),
                    tags: formData.tags,
                    git: formData.git,
                    url: formData.url
                })
                .then(() => {
                    setProgress(0)
                })
                .catch(err => {
                })
            })
        }
        )
    }

  return (
    <div className='border p-3 mt-3 bg-light' >
        <h2>Create Article</h2>
        <label htmlFor=''>Title</label>
        <input type="text" name="title" className="form-control" value={formData.title} onChange={(e) => handleChange(e)} /> 

        {/* text */}
        <label htmlFor=''>Text</label>
        <textarea name="text" className="form-control" value={formData.text} onChange={(e) => handleChange(e)} />

        {/* image */}
        <label>Image</label>
        <input type="file" name='image' accept='image/*' className='form-control' onChange={(e) => handleImageChange(e)} />
        
        {/* tags */}
        <label>Tags</label>
        <input type="string" name='tags' className='form-control' onChange={(e) => handleTagsChange(e)} />

        {/* git */}
        <label>Git Url</label>
        <input type="url" name='git' className='form-control' onChange={(e) => handleChange(e)} />

        {/* git */}
        <label>Live Url</label>
        <input type="url" name='live' className='form-control' onChange={(e) => handleChange(e)} />

        {/* progress */}
        {progress === 0 ? null : (
            <div className="progress">
            <div className="progress-bar progress-bar-striped mt-2" style={{width:`${progress}%`}}>
                {`uploading image ${progress}%`}
            </div>
        </div>
        )

        }
        
        <button className='form-control btn-primary mt-2' onClick={handlePublish}>Publish</button>
    </div>
  )
}

export default AddArticle