import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./TreeMenu.scss";
import Collapsible from "../Collapsible/Collapsible";

function TreeMenu({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = useCallback(
    () => setIsOpen((prevIsOpen) => !prevIsOpen),
    []
  );

  return (
    <>
      <button className="nav-link align-middle px-0" onClick={handleToggle}>
        {item.label}
      </button>

      <Collapsible
        open={isOpen}
        id={generateId(item.label)}
        transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
        expandOnPrint
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
      </Collapsible>
    </>
  );
}

function generateId(label) {
  return `collapse-${label.replace(/\s/g, "")}`;
}

export default TreeMenu;
