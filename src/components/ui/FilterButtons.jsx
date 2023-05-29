import { useContext } from "react";
import { FilteredPostsContext } from "../../utils/useFiltering";

const FilterButtons = ({ filtertype, onClick, freq }) => {
  const { selectedFilters } = useContext(FilteredPostsContext);

  return (
    <>
      {Object.entries(freq).map(([key, value]) => {
        const withoutSpace = key.replace(/\s/g, '');

        return (
          <button
            key={key}
            filtertype={filtertype}
            filtervalue={key}
            className={`mr-1 mt-1 ${withoutSpace}${selectedFilters.includes(key) ? ' active' : ''}`}
            onClick={() => onClick(filtertype, key)}
          >
            {key} ({value})
          </button>
        );
      })}
    </>
  );
};

export default FilterButtons;
