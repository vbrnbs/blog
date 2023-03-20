import React from "react";
import github from "../icons/github.svg";
import linkedin from "../icons/linkedin.svg";
import behance from "../icons/behance.svg";
import youtube from "../icons/youtube.svg";
import codesandbox from "../icons/codesandbox.svg";

export const Logos = () => {
  return (
    <ul className="flex p-0 m-0 py-0 h-1 justify-center sm:justify-end h-6">
      <li>
        <a href="https://github.com/vbrnbs">
          <img className="h-6" src={github} alt="github" />
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/barnabasvarszegi/">
          <img className="h-6" src={linkedin} alt="linkedin" />
        </a>
      </li>
      <li>
        <a href="https://www.behance.net/barnabsvrszegi">
          <img className="h-6" src={behance} alt="behance" />
        </a>
      </li>
      <li>
        <a href="https://youtube.com/vbrnaaa">
          <img className="h-6" src={youtube} alt="youtube" />
        </a>
      </li>
      <li>
        <a href="https://codesandbox.io/u/vbrnbs">
          <img className="h-6" src={codesandbox} alt="codesandbox" />
        </a>
      </li>
    </ul>
  );
};
