import { useState, createContext } from "react";

export const FilteredPostsContext = createContext();

export default function useFilterPosts(posts) {
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [searchValue, setSearchValue] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleClickFilter = (tag) => {
        
        if (selectedFilters.includes(tag)) {
            setSelectedFilters(selectedFilters.filter((t) => t !== tag));
        } else {
            setSelectedFilters([...selectedFilters, tag]);
        }
    };
    return { filteredPosts, setFilteredPosts, searchValue, setSearchValue, selectedFilters, setSelectedFilters, handleClickFilter }
}