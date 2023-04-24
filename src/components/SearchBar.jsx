import React, { useState } from 'react'

const SearchBar = ({ posts, setFilteredPosts }) => {
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

  return (
    <div>
      <div>
        <input type="text" placeholder="Search" value={searchValue} onChange={(e) => searchKeyword(e)} />
        <div className="search-results">
          {
            posts.filter(post => {
              const query = post.text.toLowerCase();
              const searchTerm = searchValue.toLowerCase();

              return searchTerm && query.includes(searchTerm);
            })
              .map((post) =>
                <div onClick={() => onSearch(post.text)} key={post.id}>{post.title}=|={post.text}|{post.tags}</div>
              )}
        </div>
      </div>
    </div>
  )
}

export default SearchBar
