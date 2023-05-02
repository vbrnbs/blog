import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Blog from "./components/Blog";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "./firebaseConfig";
import CreatePost from './Components/Editing/CreatePost';
import Header from './Components/Header';

function App() {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const postsCollectionRef = collection(db, "posts");
      const q = query(postsCollectionRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPostList(data);
      setLoading(false);
    };

    getPosts();
  }, []);

  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Blog data={postList} />} />
          <Route path='/new' element={<CreatePost />} />
        </Routes>
      </Router>
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