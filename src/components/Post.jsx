import { Link, useParams } from "react-router-dom";
import { FilteredPostsContext } from "../utils/useFiltering";
import { useContext, useEffect, useReducer, useState } from "react";
import DeletePost from './Editing/DeletePost';
import EditPost from './Editing/EditPost';
import useFetch from "../utils/useFetch";
import Loading from "./ui/Loading";
import { AuthContext } from "../utils/useAuth";

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
      <div className="mt-4 mb-16">
        <Link to={-1} className="text-xl hover:underline">
          ⬅back
        </Link>
      </div>
      <h1>{post.title}</h1>
      {post.date ?
        (<p>{post.date}</p>)
        :
        (<p> {new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US")}</p>)
      }
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
            to={`/?tags=${tag}`}
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
      <div className="">
      {post.topics &&
                    post.topics.map((tag, idx) => {
                      const withoutSpace = tag.replace(/\s/g, '');
                      return (
                        <Link
                          key={`#${tag}-${idx}`}
                          to={`/?topics=${tag}`}
                        >
                          <button
                            filtertype="topics"
                            filtervalue={tag}
                            className={`${withoutSpace}${selectedFilters.includes(tag) ? ' active' : ''}`}
                          >
                            {`#${tag}`}
                          </button>
                        </Link>
                      );
                    })}
      </div>
      {user.user &&
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
