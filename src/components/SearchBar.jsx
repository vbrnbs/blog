const style = {
  transform: "translateY(-63%)",
};

const SearchBar = ({ width, logo, right, addFilter, onFilter }) => {
  const addChosenFilter = () => {
    addFilter();
    console.log("filter added and closed bar");
  };

  return (
    <div className="relative">
      <input
        className={`py-2 pl-4 ${width} rounded-lg h-18`}
        type="text"
        placeholder=""
      />
      <img
        className={`h-6 absolute border-0 top-50 ${right} cursor-pointer`}
        style={style}
        src={logo}
        alt={logo}
        onClick={addChosenFilter}
      />
    </div>
  );
};

export default SearchBar;
