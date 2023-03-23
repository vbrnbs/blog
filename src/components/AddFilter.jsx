import { useState } from "react";
import add from "../icons/add.svg";
import SearchBar from "./SearchBar";

const AddFilter = () => {
  const [isHidden, setIsHidden] = useState(true);

  const addFilter = () => {
    setIsHidden(!isHidden);
    console.log("Filter Active");
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`p-2 scale-200 cursor-pointer ${
          isHidden ? "block" : "hidden"
        }`}
        onClick={addFilter}
      >
        <img src={add} alt="add" style={{ transform: "translateY(-15%)" }} />
      </div>
      {!isHidden && (
        <SearchBar
          width="w-40"
          logo={add}
          right="right-2"
          addFilter={addFilter}
          // style={{ display: isHidden ? "block" : "none" }}
        />
      )}
    </div>
  );
};

export default AddFilter;
