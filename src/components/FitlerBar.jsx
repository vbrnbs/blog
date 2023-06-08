import { useContext, useEffect, useMemo } from 'react';
import { PostContext } from '../utils/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilteredPostsContext } from '../utils/useFiltering';
import FilterButtons from './ui/FilterButtons';
import FilteredPosts from './FilteredPosts';
import SearchBar from './ui/SearchBar';

const FilterBar = () => {

  const { posts } = useContext(PostContext);
  const { setSelectedFilters, setSearchValue, setFilteredPosts, searchValue } = useContext(FilteredPostsContext);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const filterPosts = useMemo(() => {
    
    const tagFilters = searchParams.getAll('tags');
    const topicFilters = searchParams.getAll('topics');

    if (!tagFilters.length && !topicFilters.length) {
      return posts;
    }

    return posts.filter((post) => {
      const hasTag = tagFilters.every((tagFilter) =>
        post.tags.includes(tagFilter)
      );

      const hasTopic =
        post.topics &&
        topicFilters.every((topicFilter) => post.topics.includes(topicFilter));

      return hasTag && hasTopic;
    });
  }, [posts, searchParams]);

  const handleFilterButtonClick = (filtertype, filtervalue) => {
    setFilteredPosts([]);
    const updatedValues = searchParams.getAll(filtertype);
    if (updatedValues.includes(filtervalue)) {
      searchParams.delete(filtertype);
      const filteredValues = updatedValues.filter((value) => value !== filtervalue);
      filteredValues.forEach((value) => searchParams.append(filtertype, value));
    } else {
      searchParams.append(filtertype, filtervalue);
      updatedValues.push(filtervalue);
    }

    navigate({ search: searchParams.toString() });
    console.log(searchParams.toString())
    getArrayFromUrl(searchParams.toString())
  };

  useEffect(() => {
    getArrayFromUrl(searchParams.toString())
  }, []);


  const freq = (data, field) => {
    const frequency = {};
    data && data.length > 0 &&
      data.map(obj => {
        obj[field] && obj[field].length > 0 &&
          obj[field].map(tag => {
            if (frequency[tag]) {
              frequency[tag]++;
            } else {
              frequency[tag] = 1;
            }
          });
      });
    return frequency;
  };

  const clearFilters = () => {
    searchParams.delete('tags');
    searchParams.delete('topics');
    navigate({ search: searchParams.toString() });
    getArrayFromUrl("")
    setFilteredPosts([]);
  };

  function getArrayFromUrl(url) {
    // const queryString = url.split('?')[1];
    const queryPairs = url.split('&');
    const resultArray = [];
    queryPairs &&
      queryPairs.forEach((pair) => {
        const [key, value] = pair.split('=');

        if (key === 'tags' || key === 'topics') {
          const decodedValue = decodeURIComponent(value).replace('+', ' ');
          resultArray.push(decodedValue);
        }
      });
    // console.log('resultArray', resultArray)
    setSelectedFilters(resultArray);
    return resultArray;
  }

  return (
    <>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className='flex-wrap'>
        <h2>stack:</h2>
        <FilterButtons
          filtertype="tags"
          freq={freq(filterPosts, "tags")}
          onClick={handleFilterButtonClick}
        />
      </div>

      <div className='mt-4 mb-2 flex-wrap'>
        <h2>topics:</h2>

        <FilterButtons
          filtertype="topics"
          freq={freq(filterPosts, "topics")}
          onClick={handleFilterButtonClick}
        />
      </div>
      <div className='mt-2 flex justify-end'>
        <div className='cursor-pointer windsor truncate hover:underline' onClick={clearFilters}>
          Clear filters
        </div >
      </div>
      <FilteredPosts filterPosts={filterPosts} handleFilterButtonClick={handleFilterButtonClick} />
    </>
  );
};

export default FilterBar;
