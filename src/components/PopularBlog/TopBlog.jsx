import { useEffect, useState } from "react";
import BlogList from "../Blog/BlogList";
import LoadingSpinner from "../LoadingSpinner";

const TopBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/posts/most-liked"
        );
        const rawData = await response.json();

        const blogsData = Array.isArray(rawData)
          ? rawData
          : rawData.content || [];

        const sortedBlogs = blogsData
          .sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0))
          .slice(0, 3);

        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết nhiều like:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
     return (
    <div className="flex justify-center items-center h-40 absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
  }

  return blogs.length === 0 ? (
    <p className="text-center text-gray-500 text-lg">
      Không có bài viết nào để hiển thị.
    </p>
  ) : (
    <BlogList blogs={blogs} setBlogs={setBlogs} />
  );
};

export default TopBlog;
