import React, { useState } from "react";
import search from "../icons/search.svg";
import expand from "../icons/expand.svg";

const FilterData = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    setIsVisible(!isVisible);
  };

  const rotation = isClicked ? "540deg" : "0deg";
  const scale = isClicked ? "scale(1.3)" : "scale(1.5)";

  const style = {
    transform: "translateY(-60%)",
  };

  return (
    <div className="top-16 left-0 w-full p-4 rounded-lg border-2 border-black">
      <div className="flex justify-between">
        <div className="relative">
          <input
            className="py-2 pl-4 w-60 rounded-lg"
            type="text"
            placeholder=""
          />
          <img
            className="h-6 absolute top-50 right-5"
            style={style}
            src={search}
            alt="search"
          />
        </div>
        <div className="icon-container cursor-pointer flex mr-2">
          <img
            className="spinAndExpand items-center"
            onClick={handleClick}
            style={{ transform: `rotate(${rotation}) ${scale}` }}
            src={expand}
            alt="expand"
          />
        </div>
      </div>
      {isVisible && (
        <div className="p-4 mt-4">{/* Filter options content goes here */}</div>
      )}
    </div>
  );
};

export default FilterData;
