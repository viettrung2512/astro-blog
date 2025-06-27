import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import LoadingSpinner from "../LoadingSpinner";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:8080/api/posts?page=0&size=6`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || `Lỗi ${response.status}: ${response.statusText}`
          );
        }

        const blogsArray = Array.isArray(data.content) ? data.content : [];
        setBlogs(blogsArray);
      } catch (error) {
        console.error("Chi tiết lỗi:", error);
        setError(error.message);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Lỗi: {error}</div>;
  }

  if (!blogs.length) {
    return (
      <div className="text-center py-10 text-gray-400">
        Không có bài viết nào.
      </div>
    );
  }

  return (
    <div className="blogs-section">
      <BlogList blogs={blogs} setBlogs={setBlogs} layout="grid" />
      <div className="flex justify-center mt-8">
      </div>
    </div>
  );
};

export default Blogs;
