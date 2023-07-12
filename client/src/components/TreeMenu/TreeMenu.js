import React from "react";
import { Link } from "react-router-dom";
import "./TreeMenu.scss";

function TreeMenu({ item }) {
  return (
    <>
      <a
        className="nav-link align-middle px-0"
        data-bs-toggle="collapse"
        href={`#${generateId(item.label)}`}
        role="button"
        aria-expanded="false"
        aria-controls={generateId(item.label)}
      >
        {item.label}
      </a>

      <div
        className="collapse"
        id={`collapseExample${item.label.replace(/\s/g, "")}`}
      >
        {item.children.map((item) => (
          <div key={item.id}>
            <Link
              className="nav-link --bs-emphasis-color"
              to={`/edit/${item.id}`}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

function generateId(label) {
  return `collapseExample${label.replace(/\s/g, "")}`;
}

export default TreeMenu;
