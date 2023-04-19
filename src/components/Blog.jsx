
import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Filter from "./Filter";

function Blog() {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
    }, []);

// console.log(postLists)

return(
    <div className="homePage">
      {/* {postLists.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
            </div>
            <div className="postTextContainer"> {post.tags.map(tag => (
                <p>#{tag}</p>
            ))} 
            </div>
            <h3>@{post.git}</h3>
          </div>
        );
      })} */}
      {/* <Filter data={postLists}/> */}
    </div>
)

}


export default Blog;
