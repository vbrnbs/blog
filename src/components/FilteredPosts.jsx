import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FilteredPostsContext } from '../utils/useFiltering';
import PostList from './PostList';

const FilteredPosts = ({ filterPosts, handleFilterButtonClick }) => {
  const { selectedFilters, filteredPosts, searchValue } = useContext(FilteredPostsContext);

  return (
    <>
      <hr className='my-5' />
      {searchValue.length > 0 ? (
        <>
          <h1>
            Search Results:
          </h1>
          {filteredPosts.length > 0 ? (
            <PostList post={filteredPosts} selectedFilters={selectedFilters} handleFilterButtonClick={handleFilterButtonClick} />
          ) : (
            'No results found'
          )}
        </>
      ) : (
        <PostList post={filterPosts} selectedFilters={selectedFilters} handleFilterButtonClick={handleFilterButtonClick} />
      )}
    </>
  );
};

export default FilteredPosts;
