import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import Posts from './Posts'
import Filter from './Filter'
import Header from './Header'
import Footer from './Footer'
import CreatePost from './CreatePost'

const Blog = ({ data: posts }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleClickFilter = (tag) => {
    if (selectedFilters.includes(tag)) {
      setSelectedFilters(selectedFilters.filter((t) => t !== tag))
    } else {
      setSelectedFilters([...selectedFilters, tag])
    }
  }

  if (!posts) {
    return <div>Sorry, the data blog is not available at the moment. </div>;
  }

  return (
    <div className='lg:max-w-7xl container mx-auto'>
      <Header />
      <CreatePost />
        <SearchBar posts={posts} filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts} searchValue={searchValue} setSearchValue={setSearchValue} />
        <Filter posts={posts} setFilteredPosts={setFilteredPosts} filteredPosts={filteredPosts} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} handleClickFilter={handleClickFilter} searchValue={searchValue} setSearchValue={setSearchValue}/>
        <Posts filteredPosts={filteredPosts} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} handleClickFilter={handleClickFilter} note/>
        <Footer />
    </div >
  )
}

export default Blog
