import { Link, useParams } from "react-router-dom";
import { FilteredPostsContext } from "../hooks/useFiltering";
import { useContext } from "react";


const Post = () => {
  const { id } = useParams();
  const { filteredPosts, setSelectedFilters } = useContext(FilteredPostsContext);

  const post = filteredPosts.find((post) => post.id === id);
  console.log(post);

  return (
    <div>
      <h1>{post.title}</h1>
      <p className="my-2">{Date(post.createdAt.miliseconds)}</p>
      <div className="flex justify-center items-center">
        <img
          className='w-img rounded-sm drop-shadow-sm object-cover'
          src={post.imageUrl}
          alt={post.title}
        />
      </div>
      <p> {post.text} </p>
      <div>
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
    </div>
  )
}

export default Post
