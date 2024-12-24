import { useState } from "react";
import PropTypes from "prop-types";

const SearchFilter = ({ data, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // Update search query and filter data accordingly
  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilter(query, filterCategory);
  };

  // Update filter category and filter data accordingly
  const handleFilter = (category) => {
    setFilterCategory(category);
    applyFilter(searchQuery, category);
  };

  // Apply combined search and category filter
  const applyFilter = (query, category) => {
    let filteredData = data;

    // Filter by search query
    if (query) {
      filteredData = filteredData.filter(
        (blog) =>
          blog.blogName.toLowerCase().includes(query.toLowerCase()) ||
          blog.blogDescription.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (category !== "All") {
      filteredData = filteredData.filter(
        (blog) =>
          blog.category &&
          blog.category.toLowerCase() === category.toLowerCase()
      );
    }

    onFilter(filteredData);
  };

  return (
    <div
      style={{
        marginBottom: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          padding: "0.8rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
          width: "250px",
          backgroundColor: "#f5f5f5",
          transition: "background-color 0.3s",
        }}
        onFocus={(e) => (e.target.style.backgroundColor = "#fff")}
        onBlur={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
      />
      
      {/* Category Filter */}
      <select
        value={filterCategory}
        onChange={(e) => handleFilter(e.target.value)}
        style={{
          padding: "0.8rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
          width: "180px",
          backgroundColor: "#f5f5f5",
          transition: "background-color 0.3s",
        }}
        onFocus={(e) => (e.target.style.backgroundColor = "#fff")}
        onBlur={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
      >
        <option value="All">All</option>
        <option value="Technology">Technology</option>
        <option value="Travel">Travel</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>
    </div>
  );
};

SearchFilter.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      blogName: PropTypes.string.isRequired,
      blogDescription: PropTypes.string.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default SearchFilter;
