import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Blog from "./components/Blog";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

function App() {

    const [postLists, setPostList] = useState([]);
    const [loading, setLoading] = useState(true);
    const postsCollectionRef = collection(db, "posts");
  
    useEffect(() => {
      const getPosts = async () => {
        // setLoading(true);
        const data = await getDocs(postsCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      };
  
      getPosts();
      }, []);

  return (
     <Router>
       <Routes>
         {loading ? 
            (<Route>Loading...</Route> )
            :
            
            (<Route path="/" element={<Blog data={postLists} />} />
            )}
         {/*<Route path="/admin" element={<Admin />} />*/}
       </Routes>
     </Router>
  );
}

export default App;
