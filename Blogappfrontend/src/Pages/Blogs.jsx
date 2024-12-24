import  { useState, useEffect } from "react";
import axiosInstance from "../axiosInterceptor";
import { useNavigate } from "react-router-dom";
import SearchFilter from "./SearchFilter";

const Blogs = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/blogs");
      setData(response.data);
      setFilteredData(response.data); // Initialize with full data
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "2rem", marginTop: "10px" }}>
      <SearchFilter data={data} onFilter={setFilteredData} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredData.map((blog, index) => (
          <div
            key={index}
            style={{
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={blog.imageUrl}
              alt={blog.blogName}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px 8px 0 0",
                marginBottom: "1rem",
              }}
            />
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: "600",
                color: "#333",
                marginBottom: "0.8rem",
              }}
            >
              {blog.blogName}
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#555",
                lineHeight: "1.6",
              }}
            >
              {blog.blogDescription
                ? blog.blogDescription.substring(0, 200) + "..."
                : "No content available"}
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/blog/${blog._id}`, { state: { blog } });
              }}
              style={{
                display: "inline-block",
                marginTop: "1rem",
                fontSize: "1rem",
                color: "#007BFF",
                textDecoration: "none",
              }}
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
