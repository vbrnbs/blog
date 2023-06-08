import { useContext} from 'react';
import { Link } from 'react-router-dom';
import { FilteredPostsContext } from '../utils/useFiltering';
import PostList from './PostList';

const FilteredPosts = ({ filterPosts, handleFilterButtonClick }) => {

  const { selectedFilters, filteredPosts } = useContext(FilteredPostsContext);
  // console.log('filterPosts_posts: ', filterPosts);
  // console.log('selectedFilters', selectedFilters)

  return (
    <>
      <hr className='my-5' />
      {
      filteredPosts.length > 0 ? (
        <>
        <h1>
          Search Results:
        </h1>
        
        <PostList post={filteredPosts} selectedFilters={selectedFilters} handleFilterButtonClick={handleFilterButtonClick} />
        </>
        
      ) : (  
        <PostList post={filterPosts} selectedFilters={selectedFilters} handleFilterButtonClick={handleFilterButtonClick} />
      )}
    </>
  );
};

export default FilteredPosts;
