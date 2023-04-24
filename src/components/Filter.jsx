import React, { useEffect, useState } from 'react'

const Filter = ({ posts, filteredPosts, setFilteredPosts }) => {
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

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

  const clearFilters = () => {
    setSelectedFilters([]);
    setSearchValue("");
  }

  console.log("filters :>>", filters)
  console.log("selected Filters :>>", selectedFilters)

  return (
    <div>
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
        <button onClick={clearFilters}>
          Clear
        </button>
      </div>
    </div>
  )
}

export default Filter
