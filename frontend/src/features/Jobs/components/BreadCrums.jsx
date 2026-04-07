import React from "react";
import { Link } from "react-router-dom";

const BreadCrums = ({ items }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.link ? (
            <Link to={item.link} className="hover:text-gray-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-medium">{item.label}</span>
          )}

          {index !== items.length - 1 && <span>›</span>}
        </div>
      ))}
    </div>
  );
};

export default BreadCrums;