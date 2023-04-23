import React from 'react'

const Filter = (filters, selectedFilters) => {
    console.log(filters)
    // console.log(selectedFilters)
  return (
    <div>
        {
          filters.filters && Object.entries(filters.filters).map(([tag, count], idx) => (
            <button 
              key={`#${tag}-${idx}`}
              onClick={() => handleClickFilter(tag)}
              className={filters.selectedFilters.includes(tag) ? "active" : ""}
              >
              {`#${tag}(${count})`}
            </button>
          ))
        }

      </div>
  )
}

export default Filter
