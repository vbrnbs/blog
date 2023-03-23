import React, { useState } from "react";
import search from "../icons/search.svg";
import expand from "../icons/expand.svg";
import Button from "./Button";
import AddFilter from "./AddFilter";
import SearchBar from "./SearchBar";
import AllNone from "./AllNone";

const FilterData = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    setTimeout(() => {
      setIsVisible(!isVisible);
    }, 500); // add a delay of 1 second (1000 milliseconds)
  };

  const rotation = isClicked ? "180deg" : "0deg";
  const scale = isClicked ? "scale(1)" : "scale(1.5)";

  return (
    <div className="top-16 left-0 w-full p-4 rounded-lg border-1 border-black">
      <div className="flex justify-between">
        <SearchBar logo={search} width="w-60" right="right-2" />
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
        <div className="flex justify-between">
          <div className="mt-2 flex flex-wrap">
            {/* Filter options content goes here <Button title="gsap" /> */}
            <Button tag="GSAP" />
            <Button tag="React" />
            <Button tag="google aws" />
            <Button tag="io" />
            <Button tag="arduino" />
            <AddFilter />
          </div>
          <AllNone />
        </div>
      )}
    </div>
  );
};

export default FilterData;
