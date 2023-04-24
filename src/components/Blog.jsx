import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import Posts from './Posts'
import Filter from './Filter'
import Header from './Header'
import Footer from './Footer'

const Blog = ({ data: posts }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);

  if (!posts) {
    return <div>Sorry, the data blog is not available at the moment. </div>;
  }

  return (
    <div>
      <Header />
      <div className='container'>
        <SearchBar posts={posts} setFilteredPosts={setFilteredPosts} />
        <Filter posts={posts} setFilteredPosts={setFilteredPosts} filteredPosts={filteredPosts} />
        <Posts filteredPosts={filteredPosts} />
      </div>
      <Footer />
    </div >
  )
}

export default Blog
