import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../App'
import { FilteredPostsContext } from './Blog';

const Filter = ({ selectedFilters, setSelectedFilters, handleClickFilter, setSearchValue }) => {
  const { posts } = useContext(PostContext);
  const {
    filteredPosts,
    setFilteredPosts
  } = useContext(FilteredPostsContext);
  const [filters, setFilters] = useState([]);
  

  useEffect(() => {
    const getTags = filteredPosts.reduce((acc, post) => {
      post.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    setFilters(getTags)
  }, [filteredPosts])

  useEffect(() => {
    if (selectedFilters.length > 0) {
      const filtered = posts.filter(post =>
        selectedFilters.every(tag => post.tags.includes(tag))
      );
      const sorted = filtered.sort((a, b) => b.tags.filter(tag => selectedFilters.includes(tag)).length - a.tags.filter(tag => selectedFilters.includes(tag)).length);
      setFilteredPosts(sorted);
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedFilters, posts]);

  const clearFilters = () => {
    setSelectedFilters([]);
    setSearchValue("");
  }

  // console.log("filters :>>", filters)
  // console.log("selected Filters :>>", selectedFilters)

  return (
    <div className='flex justify-between'>
      <div className='mb-3 flex-warp w-100'>   
        {
          filters &&
          Object.entries(filters)
            .sort(([, countA], [, countB]) => countB - countA)
            .map(([tag, count], idx) => (
              <button
                key={`#${tag}-${idx}`}
                onClick={() => handleClickFilter(tag)}
                className={selectedFilters.includes(tag) ? "active" : ""}
              >
                {`#${tag}(${count})`}
              </button>
            ))
        }
        
         
      </div>
      <div className='mt-2 flex justify-end'>
         <div className='cursor-pointer windsor truncate' onClick={clearFilters}>
            Clear filters
          </div >
        </div>
    </div>
  )
}

export default Filter
