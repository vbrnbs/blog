import React, { useContext } from 'react';
import SearchBar from './SearchBar';
import Filter from './Filter';
import FilteredPosts from './FilteredPosts';
import { Link } from 'react-router-dom';
import { FilteredPostsContext } from '../utils/useFiltering';

const Posts = () => {
  const { filteredPosts, handleClickFilter, selectedFilters } = useContext(FilteredPostsContext);
  console.log('selectedFilters', selectedFilters);
  console.log('filteredPosts', filteredPosts);
  
  return (
    <div>
      <SearchBar />
      {/* <Filter /> */}
      <FilteredPosts />
      <hr className='my-5' />
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
                { post.date ?
                  (<p>{post.date}</p>)
                  :
                  (<p> {new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US")}</p>)
                }   
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
              </div>
              <div className='flex justify-between border w-auto'>
                <div>
                  {post.topics &&
                  post.topics.map((tag, idx) => (
                    <button
                      key={`#${tag}-${idx}`}
                      onClick={() => handleClickFilter(tag)}
                      className={selectedFilters.includes(tag) ? 'active' : ''}
                    >
                      {`#${tag}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
