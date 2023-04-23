import React from 'react'

const SearchBar = ({posts, onSearch, searchKeyword, searchValue}) => {
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
