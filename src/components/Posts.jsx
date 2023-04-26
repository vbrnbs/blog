import React, { useState } from 'react'
// import { db } from "../firebaseConfig";
// import { doc, deleteDoc } from "firebase/firestore";


const Posts = ({ filteredPosts, handleClickFilter, selectedFilters }) => {

    // const deletePost = async (id) => {
    //     await deleteDoc(doc(db, "posts", id));
    // }

    const formattedDate = (d) => {
        const date = new Date(0); // create a new Date object with the value of zero (January 1, 1970)
        date.setTime(d * 1000); // set the date value to the specified number of seconds since January 1, 1970
    }



    return (
        <div>
            {
                !filteredPosts ?
                <>Loading</>
                :
                filteredPosts.map((post) => (
                    <div key={post.id} className='flex my-24'>
                        <div>
                            {/* 405x205 from 2026/1024 */}
                            <img className='w-img rounded-sm drop-shadow-sm object-cover' src={post.imageUrl} alt={post.title} />
                        </div>
                        <div className='ml-8 flex flex-col justify-between'>
                            <div>
                            <h1>{post.title}</h1>
                            <h2>{Date(post.createdAt.miliseconds)}</h2>
                            <p className='mt-3 max-h-32 overflow-scroll'>{post.text}</p>
                            {/* <button onClick={deletePost(post.id)}>delete</button> */}
                            </div>
                            <div>
                            {post.tags.map((tag, idx) => (
                                <button
                                key={`#${tag}-${idx}`}
                                onClick={() => handleClickFilter(tag)}
                                className={selectedFilters.includes(tag) ? "active" : ""}
                              >
                                {`#${tag}`}
                              </button>
                            ))}
                            </div>
                    
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Posts


// import React, { useState } from 'react'
// import firebase from "firebase/app";
// import "firebase/firestore";

// const Posts = ({ filteredPosts }) => {
//     console.log(filteredPosts)

//     const formattedDate = (d) => {
//         const date = d.toDate();
//         const dateFormated = date.toDateString(); // Example format: "Sun Apr 24 2022"
//         return dateFormated;
//     }

//     return (
//         <div>
//             {
//                 filteredPosts.map((post) => (
//                     <div key={post.id} className='flex my-24'>
//                         <div className='max-w-img'>
//                             {/* 405x205 from 2026/1024 */}
//                             <img className='w-img rounded-sm drop-shadow-sm object-cover' src={post.imageUrl} alt={post.title} />
//                         </div>
//                         <div className='ml-8'>
//                             <h1>{post.title}</h1>
//                             <h2>{formattedDate(post.createdAt)}</h2>
//                                        <p>{post.text}</p>
//                             {post.tags.map((tag, idx) => (
//                                 <span key={`#${tag}-${idx}`}>{`#${tag}`}</span>
//                             ))}
//                             <div>------------------</div>
//                         </div>
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }

// export default Posts
