import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Chip,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import axiosInstance from "../axiosInterceptor"; // Assuming you're using Axios for API calls
import CommentsSection from "./CommentSection"; // Import the CommentsSection component

export default function Openblog() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allBlogsInCategory, setAllBlogsInCategory] = useState([]);
  const [category, setCategory] = useState("");

  // Fetch blog data when the component mounts
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axiosInstance.get(`/api/blogs/${blogId}`);
        setBlogData(response.data);
        setCategory(response.data.category);
        setLoading(false);
      } catch (error) {
        setError("Failed to load blog data");
        setLoading(false);
      }
    };

    const fetchBlogsInCategory = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/blogs?category=${category}`
        );
        setAllBlogsInCategory(response.data);
      } catch (error) {
        console.log("Failed to fetch blogs in the category:", error);
      }
    };

    fetchBlogData();
    fetchBlogsInCategory();
  }, [blogId, category]);

  const handleBackToHome = () => {
    navigate("/blogs");
  };

  const handlePreviousBlog = () => {
    const currentIndex = allBlogsInCategory.findIndex(
      (blog) => blog._id === blogId
    );
    if (currentIndex > 0) {
      navigate(`/blog/${allBlogsInCategory[currentIndex - 1]._id}`);
    }
  };

  const handleNextBlog = () => {
    const currentIndex = allBlogsInCategory.findIndex(
      (blog) => blog._id === blogId
    );
    if (currentIndex < allBlogsInCategory.length - 1) {
      navigate(`/blog/${allBlogsInCategory[currentIndex + 1]._id}`);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        overflowX: "hidden", // Prevent horizontal scrolling
        width: "100vw",
        margin: 0,
        padding: 0,
        backgroundColor: "#f7f7f7",
        background: "linear-gradient(to bottom right, #f4f4f4, #e0e0e0)",
      }}
    >
      {/* Back to Home Button */}
      <Box sx={{ padding: "1rem", textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={handleBackToHome}
          sx={{
            marginBottom: "2rem",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
            padding: "10px 20px",
            fontSize: "1rem",
          }}
        >
          Back to Blogs
        </Button>
      </Box>

      {/* Blog Title */}
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        {blogData?.blogName}
      </Typography>

      {/* Blog Metadata */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Chip label={`Author: ${blogData?.author}`} color="primary" />
        <Chip
          label={`Published: ${new Date(
            blogData?.createdAt
          ).toLocaleDateString()}`}
          color="secondary"
        />
        <Chip label={`Category: ${blogData?.category}`} color="default" />
      </Box>

      {/* Blog Image */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}
      >
        <img
          src={blogData?.imageUrl}
          alt="Blog"
          style={{
            width: "675px", // Set fixed width
            height: "390px", // Set fixed height
            objectFit: "cover", // Ensures the image covers the dimensions without distortion
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          }}
        />
      </Box>

      {/* Blog Content */}
      <Box
        sx={{
          padding: "2rem", // Increased padding for better spacing
          margin: "2rem auto", // Center align the box
          maxWidth: "800px", // Limit width for better readability
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            fontSize: "1.15rem",
            color: "#333", // Darker text for better contrast
            textAlign: "justify", // Align text for a polished look
            letterSpacing: "0.02em", // Add slight letter spacing
          }}
        >
          {blogData?.blogDescription}
        </Typography>
      </Box>

      {/* Comments Section */}
      <CommentsSection blogId={blogId} />

      {/* Navigation Arrows */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
          padding: "0 1rem",
        }}
      >
        <IconButton
          onClick={handlePreviousBlog}
          disabled={
            allBlogsInCategory.findIndex((blog) => blog._id === blogId) === 0
          }
          sx={{
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s",
            color: "#1976d2",
          }}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          onClick={handleNextBlog}
          disabled={
            allBlogsInCategory.findIndex((blog) => blog._id === blogId) ===
            allBlogsInCategory.length - 1
          }
          sx={{
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s",
            color: "#1976d2",
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
}
