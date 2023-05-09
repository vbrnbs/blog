import "./App.css";
import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Blog from "./components/Blog";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "./firebaseConfig";
import CreatePost from './Components/Editing/CreatePost';
import Header from './Components/Header';
import Post from "./components/Post";
// import Post from './Components/Post';

export const PostContext = createContext();

function App() {
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const postsCollectionRef = collection(db, "posts");
      const q = query(postsCollectionRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(data);
      setLoading(false);
    };

    getPosts();
  }, []);

  return (
    <>
      <Header />
      <PostContext.Provider value={{ posts, setPosts }}>
      <Router>
        <Routes>
          <Route path="/" element={<Blog data={posts} />} />
          <Route path='/new' element={<CreatePost />} />
          {/* <Route path='/:id' element={<Post />} />
          <Route path="*" element={<h1>Not Found</h1>} /> */}
        </Routes>
      </Router>
      </PostContext.Provider>
    </>
    
  );
}

export default App;

{/* {loading ? 
            (<Route>Loading...</Route> )
            :
            (<Route path="/" element={<Blog data={postLists} />} />
            )
         } */}