import React from "react";

const Button = ({ tag, count }) => {
  // console.log(tag, count);
  const close = () => {
    console.log("x clicked!", tag);
  };
  return (
    <div
      className={`p-2 pl-0 bg-${tag.toLowerCase()} ring-gray-500 h-18 text-white border rounded-xl flex justify-around cursor-pointer mr-2 mb-2`}
      onClick={close}
    >
      <span className="mr-3 p-0">
        <strong>x</strong>
      </span>
      <span className="mr-3 p-0">
        {tag} {count > 1 ? `(${count})` : ""}
      </span>
    </div>
  );
};

export default Button;
