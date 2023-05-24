import { useContext, useMemo } from 'react';
import { PostContext } from '../utils/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';

// const FilterButtons = ({ filterType, filterValue, onClick, freq }) => (

//     <button onClick={() => onClick(filterType, filterValue)}>
//       {filterValue} 
//       {/* {freq} */}
//       {/* {JSON.stringify(fr)} */}
//       {/* {Object.keys(freq)} {Object.values(freq)} */}
//     </button>
// );

const FilterButtons = ({ filterType, onClick, freq }) => {
  // console.log('freq',freq)

  return (
    <>
      {Object.entries(freq).map(([key, value]) => (
        <button key={key}
        onClick={() => onClick(filterType, key)}
        >
          {key} ({value})
        </button>
      ))}
    </>
  )
};

const FilteredPosts = () => {

  const { posts } = useContext(PostContext);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const handleFilterButtonClick = (filterType, filterValue) => {
    const currentValues = searchParams.getAll(filterType);
    if (currentValues.includes(filterValue)) {
      searchParams.delete(filterType);
      currentValues
        .filter((value) => value !== filterValue)
        .forEach((value) => searchParams.append(filterType, value));
    } else {
      searchParams.append(filterType, filterValue);
    }
    navigate({ search: searchParams.toString() });
  };

  const filteredPosts = useMemo(() => {
    const tagFilters = searchParams.getAll('tags');
    const topicFilters = searchParams.getAll('topics');

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


  const allTags = useMemo(() => {
    const tagsSet = new Set();
    if (filteredPosts && filteredPosts.length > 0) {
      filteredPosts.forEach(post => post.tags.forEach(tag => tagsSet.add(tag)));
    }
    return Array.from(tagsSet);
  }, [posts]);

  const allTopics = useMemo(() => {
    const topicsSet = new Set();
    if (filteredPosts && filteredPosts.length > 0) { // Check if posts is defined and not empty
      filteredPosts.forEach((post) => {
        if (post.topics && post.topics.length > 0) { // Check if topics is defined and not empty
          post.topics.forEach((topic) => topicsSet.add(topic));
        }
      });
    }
    return Array.from(topicsSet);
  }, [posts]);

  const freq = (data, field) => {
    const frequency = {};
    data && data.length > 0 &&
      data.map(obj => {
        obj[field].map(tag => {
          // console.log(tag)
          if (frequency[tag]) {
            frequency[tag]++;
          } else {
            frequency[tag] = 1;
          }
        });
      });
    // console.log(typeof frequency)
    console.log("frequency", field, frequency)
    return frequency;
  };
  freq(filteredPosts, "tags")
  // freq(filteredPosts, "topics")

  // console.log(freq(posts, "tags"))
  // console.log(posts && posts.map(value => value["tags"]))


  const calculateFrequency = (data, field) => {
    const frequencyMap = new Map();
    data && data.length > 0 &&
      data.forEach(item => {
        if (item[field] && item[field].length > 0) {
          item[field].forEach(value => {
            if (frequencyMap.has(value)) {
              frequencyMap.set(value, frequencyMap.get(value) + 1);
            } else {
              frequencyMap.set(value, 1);
            }
          });
        }
      });

    return frequencyMap;
  };
  const tagFrequency = useMemo(() => {
    return calculateFrequency(filteredPosts, 'tags');
  }, [posts]);

  const topicFrequency = useMemo(() => {
    return calculateFrequency(filteredPosts, 'topics');
  }, [posts]);



  return (
    <>
      <h2>Tags:</h2>
      
        
          <FilterButtons
            // key={tag}
            filterType="tags"
            // filterValue={tag}
            freq={freq(filteredPosts, "tags")}
            onClick={handleFilterButtonClick}
          />
        

      <h2>Topics:</h2>
      {/* {filteredPosts.map(post => post.topics.map(topic => */}
        <FilterButtons
          // key={topic}
          filterType="topics"
          // filterValue={topic}
          freq={freq(filteredPosts, "topics")}
          onClick={handleFilterButtonClick}
        />
      {/* ))} */}

      <h2>Filtered Posts:</h2>
      <ul>
        {filteredPosts.map((post, index) => (
          <li key={index}>{post.title}</li>
        ))}
      </ul>
    </>
  );
};

export default FilteredPosts;
