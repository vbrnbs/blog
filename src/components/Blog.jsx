import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import Posts from './Posts'
import Filter from './Filter'

const Blog = ({ data: posts }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchValue, setSearchValue] = useState('');

 

  const searchKeyword = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchValue(keyword);
    const filtered = posts.filter(post => post.text.toLowerCase().includes(keyword) || post.title.toLowerCase().includes(keyword) || post.tags.includes(keyword));
    setFilteredPosts(filtered);
  }

  const onSearch = (searchTerm) => {
    setSearchValue(searchTerm);
    setSearchValue("");
  }

  const clearFilters = () => {
    setSelectedFilters([]);
    setSearchValue("");
  }

  // console.log("filters :>>", filters)
  // console.log("selected Filters :>>", selectedFilters)

  if (!posts) {
    return <div>Sorry, the data blog is not available at the moment. </div>;
  }

  return (
    <div>
      {/* Searchbar */}
      <SearchBar posts={posts} onSearch={onSearch} searchKeyword={searchKeyword} searchValue={searchValue} />
      {/* Filters    filters, selectedFilters*/}
      <Filter posts={posts} setFilteredPosts={setFilteredPosts} filteredPosts={filteredPosts} selectedFilters={selectedFilters}  clearFilters={clearFilters} />
      {/* Posts filteredPosts*/}
      <Posts filteredPosts={filteredPosts} />
    </div >
  )
}

export default Blog
