import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ post, selectedFilters, handleFilterButtonClick }) => {
  return (
    <div>
      {!post && post !== 0 ? (
        <>Loading</>
      ) : (
        post.map((post) => (
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
                {post.date ? (
                  <p>{post.date}</p>
                ) : (
                  <p> {new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US")}</p>
                )}
                <p className='mt-3 max-h-32 overflow-scroll'>{post.text}</p>
              </div>
              <div className='flex justify-between border w-auto'>
                <div>
                  {post.tags.map((tag, idx) => (
                    <Link
                      key={`#${tag}-${idx}`}
                      to={`./?tags=${tag}`}
                    >
                      <button
                        filtertype="tags"
                        filtervalue={tag}
                        onClick={handleFilterButtonClick}
                        className={selectedFilters.includes(tag) ? 'active' : ''}
                      >
                        {`#${tag}`}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
              <div className='flex justify-between border w-auto'>
                <div>
                  {post.topics &&
                    post.topics.map((tag, idx) => {
                      const withoutSpace = tag.replace(/\s/g, '');
                      return (
                        <Link
                          key={`#${tag}-${idx}`}
                          to={`./?topics=${tag}`}
                        >
                          <button
                            filtertype="topics"
                            filtervalue={tag}
                            onClick={handleFilterButtonClick}
                            className={`${withoutSpace}${selectedFilters.includes(tag) ? ' active' : ''}`}
                          >
                            {`#${tag}`}
                          </button>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
