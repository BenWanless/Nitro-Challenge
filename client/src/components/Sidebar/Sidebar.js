import { useEffect, useState } from "react";
import { useGroupData } from "../../hooks/useGroupData";
import useTransformGroupedData from "../../hooks/useTransformedData";
import TreeMenu from "../TreeMenu/TreeMenu";
import SidebarLogo from "./components/SideBarLogo";

function Sidebar({ handleCriteriaChange, groupedBy }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data"));
    setData(storedData);
  }, []);

  const groupedData = useGroupData(groupedBy, data);
  const transformedData = useTransformGroupedData(groupedData, groupedBy);

  return (
    <>
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a
            href="/"
            className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <SidebarLogo />
          </a>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            {transformedData?.map((item) => (
              <TreeMenu key={item.label} item={item} />
            ))}
          </ul>
          <div className="mt-auto ml-auto ">
            <div className=" align-items-center col">
              <div className="me-2">Filter By:</div>
              <select
                className="form-select ms-auto mb-4"
                aria-label="Default select example"
                onChange={(e) => handleCriteriaChange(e.target.value)}
              >
                <option value="week">Week</option>
                <option value="author">Author</option>
                <option value="location">Location</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
