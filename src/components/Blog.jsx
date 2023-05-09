import React, { useState, useContext, createContext } from 'react';
import SearchBar from './SearchBar';
import Posts from './Posts';
import Filter from './Filter';
import Footer from './Footer';
import { Route, Routes } from 'react-router-dom';
import Post from './Post';
import { PostContext } from '../App';

export const FilteredPostsContext = createContext();

const Blog = () => {
  const { posts } = useContext(PostContext);

  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleClickFilter = (tag) => {
    if (selectedFilters.includes(tag)) {
      setSelectedFilters(selectedFilters.filter((t) => t !== tag));
    } else {
      setSelectedFilters([...selectedFilters, tag]);
    }
  };

  if (!posts) {
    return <div>Sorry, the data blog is not available at the moment. </div>;
  }

  return (
    <div className='lg:max-w-7xl container mx-auto'>
      <FilteredPostsContext.Provider value={{ filteredPosts, setFilteredPosts }}>
      <SearchBar filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts} searchValue={searchValue} setSearchValue={setSearchValue} />
      <Filter setFilteredPosts={setFilteredPosts} filteredPosts={filteredPosts} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} handleClickFilter={handleClickFilter} searchValue={searchValue} setSearchValue={setSearchValue} />
      <hr className='my-5' />
      <Routes>
        <Route path='/' element={<Posts filteredPosts={filteredPosts} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} handleClickFilter={handleClickFilter} />} />
        <Route path=':id' element={<Post />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Footer />
      </FilteredPostsContext.Provider>
    </div>
  );
};

export default Blog;
