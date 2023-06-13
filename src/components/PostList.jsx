import {useState, useRef} from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ post, selectedFilters, handleFilterButtonClick }) => {


  return (
    <div>
      {!post && post !== 0 ? (
        <>Loading</>
      ) : (
        post.map((postItem) => (
          <div key={postItem.id} className='flex lg:flex-row flex-col my-36 items-center lg:justify-center'>
            <div>
              {/* 405x205 from 2026/1024 mac*/}
              <img
                className='w-auto w-img rounded-sm drop-shadow-sm object-cover'
                src={postItem.imageUrl}
                alt={postItem.title}
              />
            </div>

            <div className='mt-4 lg:mb-8 lg:ml-8 mt-12 flex flex-col justify-between w-auto'>
              <div>
                <Link to={`./${postItem.id}`}>
                  <h1>{postItem.title}</h1>
                </Link>
                <p>{postItem.date ? postItem.date : new Date(postItem.date.seconds * 1000).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric' })}</p>
                {/* {postItem.date && new Date(postItem.date.seconds * 1000).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric' })} */}
                <p className='mt-3 max-h-24 overflow-scroll'>{postItem.desc && postItem.desc}</p>
              </div>
              <div className='flex justify-between w-auto mt-2 mb-2'>
                <div>
                  {postItem.tags && postItem.tags.map((tag, idx) => (
                    <Link key={`#${tag}-${idx}`} to={`./?tags=${tag}`}>
                      <button
                        filtertype='tags'
                        filtervalue={tag}
                        onClick={handleFilterButtonClick}
                        className={`mr-1 my-2 ${selectedFilters.includes(tag) ? 'active' : ''}`}
                      >
                        {`#${tag}`}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
              <div className='flex justify-between w-auto'>
                <div>
                  {postItem.topics &&
                    postItem.topics.map((tag, idx) => {
                      const withoutSpace = tag.replace(/\s/g, '');
                      return (
                        <Link key={`#${tag}-${idx}`} to={`./?topics=${tag}`}>
                          <button
                            filtertype='topics'
                            filtervalue={tag}
                            onClick={handleFilterButtonClick}
                            className={`mr-1 mt-1 ${withoutSpace}${selectedFilters.includes(tag) ? ' active' : ''}`}
                          >
                            {`#${tag}`}
                          </button>
                        </Link>
                      );
                    })}
                </div>
              </div>
              <hr className='mt-0 '/>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
