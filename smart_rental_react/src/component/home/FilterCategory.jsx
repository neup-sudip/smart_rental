import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FilterCategory.css"; // Importing a CSS file for styling

const FilterCategory = ({ locations, categories }) => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    navigate(
      `/property?location=${encodeURIComponent(
        location.trim()
      )}&category=${category}`
    );
  };

  return (
    <div className="filter-container">
      <h3 className="filter-title">Filters</h3>

      <div className="filter-group">
        <label htmlFor="location">Location</label>
        <select
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc.value}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.value}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default FilterCategory;
