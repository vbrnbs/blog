import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../utils/useFetch';
import { FilteredPostsContext } from '../utils/useFiltering';
// import sepFilters  from '../utils/sepFilters';
import GetFilters from '../utils/sepFilters';

const Filter = () => {
  const { posts } = useContext(PostContext);
  const { filteredPosts, setFilteredPosts, selectedFilters, setSelectedFilters, handleClickFilter, setSearchValue } = useContext(FilteredPostsContext);

  // console.log("tags", posts.map(post => post["topics"]))
  const filters = GetFilters(filteredPosts, "tags");
  const topics = GetFilters(filteredPosts, "topics");
  // const filters = sepFilters.GetFilters(filteredPosts, "tags");
  // const topics = sepFilters.GetFilters(filteredPosts, "topics");
  // const flts = sepFilters.printFilters(filters)

  // return sorted, and posts
  // const sort = ( param ) => {
  //   return posts.sort((a, b) => b[param].filter(tag => selectedFilters.includes(tag)).length - a[param].filter(tag => selectedFilters.includes(tag)).length);
  // }
  // console.log('topppp', sort("topics"))

  // useEffect(() => {
  //   if (selectedFilters.length > 0) {
  //     const filtered = posts.filter(post => {
  //       const matchingTags = selectedFilters.filter(tag => post.tags && post.tags.includes(tag));
  //       const matchingTopics = selectedFilters.filter(topic => post.topics && post.topics.includes(topic));
  //       console.log('matchingTags', matchingTags, 'matchingTopics', matchingTopics)
  //       return matchingTags && matchingTopics;
  //     });
  //     console.log('TEST', filtered)
  //     setFilteredPosts(filtered);
  //   } else {
  //     setFilteredPosts(posts);
  //   }
  // }, [selectedFilters, posts]);

  useEffect(() => {
    if (selectedFilters.length > 0) {
      const filtered = filterObjectsByString(posts, selectedFilters )
      // const filtered = posts.filter(post => {
      //   selectedFilters.filter(tag => post.tags && post.tags.includes(tag))
      //   ||
      //   selectedFilters.filter(topic => post.topics && post.topics.includes(topic));
      // });
      
      // console.log(filteredPosts.filter(post => post.topics && post.topics.includes("visual")))
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedFilters, posts]);

  // function filterObjectsByString(arr, searchStr) {
  //   return arr.filter(obj =>
  //     Object.keys(obj).some(key =>
  //       (key === 'topics' || key === 'tags') && obj[key].includes(searchStr)
  //     )
  //   );
  // }
  // const test = selectedFilters.map(tag =>
  //   posts.filter(post => post.topics && post.topics.includes(tag))
  //   &&
  //   posts.filter(post => post.tags && post.tags.includes(tag))
  // )

  // console.log('fltTopics', test) 
  
  function filterObjectsByString(arr, searchStrings) {
    function contains (arr, search) {
      return arr.filter(item => search.includes(item));
    }
    const filteredObjects = arr.filter(obj => {
      const hasAllTopics = contains(obj.topics, searchStrings);
      const hasAllTags = contains(obj.tags, searchStrings);
      console.log('hasAllTopics', hasAllTopics, 'hasAllTags', hasAllTags)
      return hasAllTopics && hasAllTags;
    });
  
    return filteredObjects;
  }
  
  
  const clearFilters = () => {
    setSelectedFilters([]);
    setSearchValue("");
  }

  // console.log("filters :>>", filters)
  // console.log("topics :>>", topics)

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
      <div className='mb-3 flex-warp w-100'>
      {
          topics &&
          Object.entries(topics)
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
