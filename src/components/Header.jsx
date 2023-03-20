import React from "react";
import { Logos } from "./Logos";

export const Header = () => {
  return (
    <nav className="flex justify-between windsor font-extrabold text-2xl pt-4 px-4">
      <ul className="p-0">
        <li>
          <a href="#" className="no-underline text-black">
            brnbs
          </a>
        </li>
      </ul>

      <Logos className="h-2" />
    </nav>
  );
};
