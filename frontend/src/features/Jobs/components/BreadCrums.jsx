import React from "react";
import { Link } from "react-router-dom";

const BreadCrums = ({ items }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#838181]">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.link ? (
            <Link to={item.link} className="hover:text-gray-700 dark:hover:text-[#b5b4b4]">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800 dark:text-[#f3e5e5] font-medium">{item.label}</span>
          )}

          {index !== items.length - 1 && <span>›</span>}
        </div>
      ))}
    </div>
  );
};

export default BreadCrums;