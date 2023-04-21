import React, { useEffect, useState } from 'react'

const Blog = (posts) => {
  const [filteredPosts, setFilteredPosts] = useState(posts.data)
  const [filters, setFilters] = useState([])
  const [selectedFilters, setSelectedFilters ] = useState([])

  useEffect(() => {
    const getTags = filteredPosts.reduce((acc, post) => {
      post.tags.forEach((tag) => {
        acc[tag] ? acc[tag]++ : acc[tag] = 1
      })
      return acc;
    }, {})
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
      selectedFilters.map((tag) => 
        setFilteredPosts(posts.data.filter((post) => post.tags.includes(tag)))
      )
    } else {
      setFilteredPosts(posts.data)
    }
  }, [selectedFilters])

  return (
    <div>
      {/* Filters    filters, selectedFilters*/}
      <div>
        {
          filters && Object.entries(filters).map(([tag, count], idx) => (
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
    </div>
  )
}

export default Blog
