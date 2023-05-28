import { useState, createContext, useMemo } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const FilteredPostsContext = createContext();

export default function useFilterPosts(posts) {
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [searchValue, setSearchValue] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [clickFilter, setClickFilter] = useState([]);

    // const { posts } = useContext(PostContext);
    
    

    
    // const handleClickFilter = (tag) => {
        
    //     if (selectedFilters.includes(tag)) {
    //         setSelectedFilters(selectedFilters.filter((t) => t !== tag));
    //     } else {
    //         setSelectedFilters([...selectedFilters, tag]);
    //     }
    // };


    return { filteredPosts, setFilteredPosts, searchValue, setSearchValue, selectedFilters, setSelectedFilters }
}