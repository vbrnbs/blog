import React, { useEffect, useState } from 'react'

const Blog = ({ data: posts }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts)
  const [filters, setFilters] = useState([])
  const [selectedFilters, setSelectedFilters] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const getTags = filteredPosts.reduce((acc, post) => {
      post.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    setFilters(getTags)
  }, [filteredPosts])

  const handleClickFilter = (tag) => {
    if (selectedFilters.includes(tag)) {
      setSelectedFilters(selectedFilters.filter((t) => t !== tag))
    } else {
      setSelectedFilters([...selectedFilters, tag])
    }
  }

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

  const searchKeyword = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchValue(keyword);
    const filtered = posts.filter(post => post.text.toLowerCase().includes(keyword) || post.title.toLowerCase().includes(keyword) || post.tags.includes(keyword));
    setFilteredPosts(filtered);
  }

  const onSearch = (searchTerm) => {
    setSearchValue(searchTerm);
  }



  console.log("filters :>>", filters)
  console.log("selected Filters :>>", selectedFilters)

  if (!posts) {
    return <div>Sorry, the data blog is not available at the moment. </div>;
  }

  return (
    <div>
      {/* Filters    filters, selectedFilters*/}
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
            <div onClick={()=> onSearch(post.text)} key={post.id}>{post.title}{post.text}{post.tags}</div>
            )}
            

            </div> 
      </div>
      {/* Filters    filters, selectedFilters*/}
      <div>
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
        <button onClick={() => setSelectedFilters([])}>
          Clear
        </button>
      </div>
      {/* Posts filteredPosts*/}
      <div>
        {
          filteredPosts.map((post) => (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.text}</p>
              {post.tags.map((tag, idx) => (
                <span key={`#${tag}-${idx}`}>{`#${tag}`}</span>
              ))}
              {/* <img src={post.imageUrl} alt={post.title} /> */}
            </div>
          ))
        }
      </div>
    </div >
  )
}

export default Blog
