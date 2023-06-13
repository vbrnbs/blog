import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FilteredPostsContext } from '../utils/useFiltering';
import { AuthContext } from '../utils/useAuth';
import DOMPurify from 'dompurify';
import useFetch from '../utils/useFetch';
import Loading from './ui/Loading';
import DeletePost from './Editing/DeletePost';
import EditPost from './Editing/EditPost';
import github from '../assets/github.svg';
import url from '../assets/url.svg';

const Post = () => {
  const { id } = useParams();
  const { loading, posts } = useFetch();
  const { filteredPosts, selectedFilters, setSelectedFilters } = useContext(FilteredPostsContext);
  const [post, setPost] = useState(null);
  const [editStates, setEditStates] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const checkSource = () => {
      if (filteredPosts.length > 0) {
        return filteredPosts.find((post) => post.id === id);
      } else {
        return posts.find((post) => post.id === id);
      }
    };
    const selectedPost = checkSource();
    setPost(selectedPost);
  }, [id, posts, filteredPosts]);

  const toggleEdit = () => {
    setEditStates(!editStates);
  };

  if (loading || !post) {
    return <Loading />;
  }

  // const sanitizedText = { __html: DOMPurify.sanitize(post.text, { ADD_TAGS: ['style'] }) };
  const sanitizedText = { __html: DOMPurify.sanitize(post.text, {
    ADD_TAGS: ['iframe','style'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'src'],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|ftp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  })
}
  
  return (
    <div className="container">
      <div className="mt-4 mb-24">
        <Link to={-1} className="text-xl hover:underline">
          ⬅ back
        </Link>
      </div>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      {/* <p>{new Date(post.date.seconds * 1000).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric' })}</p> */}
      <div className="flex justify-center items-center mt-12">
        <div dangerouslySetInnerHTML={sanitizedText}></div>
      </div>
      <div className="mt-12">
        {post.tags.map((tag, idx) => (
          <Link to={`/?tags=${tag}`} key={`#${tag}-${idx}`}>
            <button href="#" onClick={() => setSelectedFilters([tag])}>
              #{tag}
            </button>
          </Link>
        ))}
      </div>
      <div className="mt-4 mb-8">
        {post.topics &&
          post.topics.map((tag, idx) => {
            const withoutSpace = tag.replace(/\s/g, '');
            return (
              <Link key={`#${tag}-${idx}`} to={`/?topics=${tag}`}>
                <button filtertype="topics" filtervalue={tag} className={`mt-2 ${withoutSpace}${selectedFilters.includes(tag) ? ' active' : ''}`}>
                  #{tag}
                </button>
              </Link>
            );
          })}
      </div>
      <div className="flex items-center lg:w-1/4 justify-around lg:justify-between mb-32">
      {post.git && 
      <div className='flex flex-col justify-center'>
        <a className='text-2xl flex justify-center mb-2' target='_blank' href={post.git} title='View on Github'>
          <img src={github} />
        </a>
        View On GitHub
      </div>
      }
      {post.url && 
      <div className='flex flex-col justify-center'>
        <a className='text-2xl flex justify-center mb-2'  target='_blank' href={post.url} title='Visit URL'>
          <img src={url} />
        </a>
        Visit Site
      </div>
      }
      </div>
      
      {user.user && (
        <div className="flex mt-2">
          <DeletePost id={post.id} imageUrl={post.imageUrl} />
          <button className="bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded" onClick={toggleEdit}>
            Edit
          </button>
        </div>
      )}
      {editStates && <EditPost post={post} editStates={editStates} setEditStates={setEditStates} />}
    </div>
  );
};

export default Post;
