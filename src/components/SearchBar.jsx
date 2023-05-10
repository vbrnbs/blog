import React, { useState, useContext } from 'react'
import { PostContext } from '../hooks/useFetch';
import { FilteredPostsContext } from '../hooks/useFiltering';


const SearchBar = () => {

  const { posts } = useContext(PostContext);
  const { filteredPosts, setFilteredPosts, setSearchValue, searchValue } = useContext(FilteredPostsContext);
  const [clicked, setClicked] = useState(false);

  const searchKeyword = (e) => {
    setClicked(false)
    console.log (e.target.value)
    const keyword = e.target.value.toLowerCase();
    setSearchValue(keyword);
    const filtered = filteredPosts.filter(post => post.text.toLowerCase().includes(keyword) || post.title.toLowerCase().includes(keyword) || post.tags.includes(keyword));
    keyword === "" ? setFilteredPosts(posts) :
    setFilteredPosts(filtered);
  }
    

  const onSearch = (searchTerm) => {
    setSearchValue(searchTerm);
    const filtered = filteredPosts.filter(post => post.text.toLowerCase().includes(searchTerm) || post.title.toLowerCase().includes(searchTerm) || post.tags.includes(searchTerm));
    setFilteredPosts(filtered);
    setClicked(true) 
  }

  return (
      <div className="mt-2">
        <input type="text" placeholder="Search in text"  value={searchValue} onChange={(e) => searchKeyword(e)} />
        <div className='mb-4'>
          {
            filteredPosts.filter(post => {
              const query = post.text.toLowerCase();
              const searchTerm = searchValue.toLowerCase();

              return searchTerm && query.includes(searchTerm);
            })
              .map((post) =>
                <div 
                onClick={() => onSearch(post.text.toLowerCase())} 
                
                className={`${clicked ? 'hidden' : 'block' } text-sm cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis border-b-2 border-gray-200 hover:border-gray-400 transition duration-300 ease-in-out mb-1 pl-4`}
                key={post.id}>{post.text}</div>
              )}
        </div>
      </div>
  )
}

export default SearchBar
