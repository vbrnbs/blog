import React from "react";

const all = () => {
  console.log("all filters on");
};

const none = () => {
  console.log("filters off");
};

const AllNone = () => {
  return (
    <div className="bold flex items-end">
      <div className="mr-2 cursor-pointer" onClick={all}>
        All
      </div>
      |
      <div className="ml-2 cursor-pointer" onClick={none}>
        None
      </div>
    </div>
  );
};

export default AllNone;
