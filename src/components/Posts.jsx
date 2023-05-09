import React, { useState, useContext } from 'react';
import DeletePost from './Editing/DeletePost';
import { Link } from 'react-router-dom';
import { FilteredPostsContext } from './Blog';
// import EditPost from './Editing/EditPost';

const Posts = ({ handleClickFilter, selectedFilters }) => {
  const [editStates, setEditStates] = useState({});
  const { filteredPosts } = useContext(FilteredPostsContext);

  const toggleEdit = (postId) => {
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      [postId]: !prevEditStates[postId]
    }));
  };

  

  return (
    <div>
      {!filteredPosts ? (
        <>Loading</>
      ) : (
        filteredPosts.map((post) => (
          <div key={post.id} className='flex my-24 border border w-auto'>
            <div>
              {/* 405x205 from 2026/1024 mac*/}
              <img
                className='w-img rounded-sm drop-shadow-sm object-cover'
                src={post.imageUrl}
                alt={post.title}
              />
            </div>
            <div className='ml-8 flex flex-col justify-between border w-auto'>
              <div>
                <Link to={`./${post.id}`}>
                    <h1>{post.title}</h1>
                </Link> 
                <h2>{Date(post.createdAt.miliseconds)}</h2>
                <p className='mt-3 max-h-32 overflow-scroll'>{post.text}</p>
              </div>
              <div className='flex justify-between border w-auto'>
                <div>
                  {post.tags.map((tag, idx) => (
                    <button
                      key={`#${tag}-${idx}`}
                      onClick={() => handleClickFilter(tag)}
                      className={selectedFilters.includes(tag) ? 'active' : ''}
                    >
                      {`#${tag}`}
                    </button>
                  ))}
                </div>
                {editStates[post.id] ? (
                  <>
                    <DeletePost id={post.id} imageUrl={post.imageUrl} />
                    {/* <EditPost
                      key={post.id}
                      post={post}
                      imageUrl={post.imageUrl}
                    /> */}
                  </>
                ) : (
                  <button
                    className='bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded'
                    onClick={() => toggleEdit(post.id)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
