import React from "react";

const Button = ({ tag, count, props }) => {
  // console.log(tag, count);
  /*
  const handleSearch = (event) => {
    const searchText = event.target.value;
    // filter posts based on searchText
    const filteredData = props.onFilter(filteredData); // ...some filtering logic // call callback function with filtered data
    console.log(filteredData);
  };
*/
  const close = () => {
    console.log("x clicked!", tag);
  };

  return (
    <div
      className={`p-2 pl-0 bg-${tag.toLowerCase()} ring-gray-500 h-18 text-white border rounded-xl flex justify-around cursor-pointer mr-2 mb-2`}
      // onClick={handleSearch}
    >
      <span className="mr-3 p-0">
        <strong /* onClick={close} */>x</strong>
      </span>
      <span className="mr-3 p-0">
        <p className="p-0 m-0">
          {tag} {count > 1 ? `(${count})` : ""}
        </p>
      </span>
    </div>
  );
};

export default Button;
