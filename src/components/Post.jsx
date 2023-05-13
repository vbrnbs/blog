import { Link, useParams } from "react-router-dom";
import { FilteredPostsContext } from "../hooks/useFiltering";
import { useContext, useEffect, useState } from "react";
import DeletePost from './Editing/DeletePost';
import EditPost from './Editing/EditPost';
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";

const Post = () => {
  const { id } = useParams();
  const { loading, posts } = useFetch();
  const { filteredPosts, setSelectedFilters } = useContext(FilteredPostsContext);
  const [post, setPost] = useState(null);
  const [editStates, setEditStates] = useState(false);
  const isAuth = true;

  useEffect(() => {
    const checkSource = () => {
      if (filteredPosts.length > 0) {
        return filteredPosts.find((post) => post.id === id);
      }
      else {
        return posts.find((post) => post.id === id);
      }
    }
    checkSource();
    setPost(checkSource)
  }, [id, posts, filteredPosts]);

  const toggleEdit = () => {
    setEditStates(!editStates)
   };    

  if (loading || !post) {
    return <Loading />;
  }


  return (
    <div>
      <div className="my-4">
        <Link to={-1}>
          back
        </Link>
      </div>
      <h1>{post.title}</h1>
      {new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US")}
      <div className="flex justify-center items-center">
        <img
          className='w-img rounded-sm drop-shadow-sm object-cover'
          src={post.imageUrl}
          alt={post.title}
        />
      </div>
      <p> {post.text} </p>
      <div className="mt-4">
        {post.tags.map((tag, idx) => (
          <Link
            to="/"
            key={`#${tag}-${idx}`}
          >
            <button
              href="#"
              onClick={() => setSelectedFilters([tag])}
            >
              {`#${tag}`}
            </button>
          </Link>
        ))}
      </div>
      {isAuth &&
        <div className="flex mt-2">
          <DeletePost id={post.id} imageUrl={post.imageUrl} />
          {/* <EditPost
                      key={post.id}
                      post={post}
                      editStates={editStates}
                      setEditStates={setEditStates}
                    /> */}
          <button
            className='bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded'
            onClick={toggleEdit}
          >Edit
          </button>

        </div>
      }
      {editStates &&
        <EditPost post={post} editStates={editStates} setEditStates={setEditStates} />
      }
    </div>
  )
}

export default Post
