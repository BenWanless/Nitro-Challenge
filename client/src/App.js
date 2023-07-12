import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import EditPage from "./pages/EditPage/EditPage";
import HomePage from "./pages/HomePage/HomePage";
import "./App.scss";

function App() {
  const [groupedBy, setGroupedBy] = useState("week");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        localStorage.setItem("data", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCriteriaChange = useCallback((groupedBy) => {
    setGroupedBy(groupedBy);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Router>
          <Sidebar
            groupedBy={groupedBy}
            handleCriteriaChange={handleCriteriaChange}
          />
          <div className="col py-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/edit/:id" element={<EditPage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
