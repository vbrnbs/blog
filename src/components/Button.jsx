import React from "react";

const close = () => {
  console.log("x clicked!");
};

const Button = ({ tag }) => {
  return (
    <div
      className={`p-2 pl-0 bg-${tag.toLowerCase()} ring-gray-500 h-18 text-white border rounded-xl flex justify-around cursor-pointer mr-2 mb-2`}
      onClick={close}
    >
      <div className="mr-3 p-0">
        <strong>x</strong>
      </div>
      {tag}
    </div>
  );
};

export default Button;
