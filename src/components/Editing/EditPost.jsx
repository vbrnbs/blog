// That sounds like a good approach! Creating a separate page for each post using React Router and handling the delete and update functionality there can provide a better user experience and more control over the editing process.

// By using React Router, you can define a route for each post and pass the necessary data as props to the corresponding component. This allows you to have a dedicated page for editing a specific post, where you can implement the delete and update functionality.

// Here's a high-level example of how you can structure your code using React Router:

// Set up your routes in your main App component:
// jsx
// Copy code
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Posts from './Posts';
import PostPage from './PostPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route path="/post/:postId" component={PostPage} />
      </Switch>
    </Router>
  );
};

export default App;

// Modify the Posts component to include a link to the individual post page:
// jsx
// Copy code

import { Link } from 'react-router-dom';

const Posts = ({ filteredPosts }) => {
  // Render each post
  const renderPosts = () => {
    return filteredPosts.map((post) => (
      <div key={post.id}>
        <h1>{post.title}</h1>
        <p>{post.text}</p>
        <Link to={`/post/${post.id}`}>View Post</Link>
      </div>
    ));
  };

  return <div>{renderPosts()}</div>;
};

export default Posts;
Create the PostPage component for editing a specific post:
jsx
Copy code
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  // Fetch the post data on component mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', postId);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setPost(snapshot.data());
          setTitle(snapshot.data().title);
          setText(snapshot.data().text);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  // Handle update post
  const handleUpdate = async () => {
    try {
      const docRef = doc(db, 'posts', postId);
      await updateDoc(docRef, {
        title: title,
        text: text,
      });
      console.log('Post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Handle delete post
  const handleDelete = async () => {
    try {
      const docRef = doc(db, 'posts', postId);
      await deleteDoc(docRef);
      console.log('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <input type="text" value={title




// import React, { useState } from 'react';
// import { db } from "../../firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";

// const EditPost = ({ post }) => {
//   console.log(post.title);
//   const [title, setTitle] = useState(post.title);
//   const [text, setText] = useState(post.text);
//   const [isEditing, setIsEditing] = useState(false);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async () => {
//     setDoc(doc(db, "posts", post.id), {
//       title: title,
//       text: text,
//     });

//     setIsEditing(false);
//   };

//   return (
//     <div>
//       {isEditing ? (
//         <>
//           <input
//             type="text"
//             onChange={(e) => {
//               console.log('New title:', e.target.value);
//               setTitle(e.target.value);
//             }}
//             value={title}
//             placeholder={post.title}
//           />

//           <textarea
//             type="text"
//             onChange={(e) => {
//               console.log('New text:', e.target.value);
//               setText(e.target.value);
//             }}
//             value={text}
//             placeholder={post.text}
//           />

//           <button
//             className='bg-green-500 hover:bg-green-600 font-bold py-2 px-4 rounded'
//             onClick={handleSave}
//           >
//             Save
//           </button>
//           {/* <p>{JSON.stringify(post)}</p> */}
//         </>
//       ) : (
//         <button
//           className='bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded'
//           onClick={handleEdit}
//         >
//           Edit
//         </button>
//       )}
//     </div>
//   );
// };

// export default EditPost;
