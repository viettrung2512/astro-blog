import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import PropTypes from "prop-types";

const BlogsPaginated = ({ currentPage = 1, postsPerPage = 6 }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/posts?page=${currentPage - 1}&size=${postsPerPage}`);
        const data = await res.json();
        setBlogs(data.content || []);
      } catch (err) {
        console.error("Lỗi fetch blogs:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [currentPage, postsPerPage]);

  if (loading) return <p className="text-center">Đang tải bài viết...</p>;

  return (
    <div className="w-full bg-gray-100 py-[50px] mt-10">
      <div className="max-w-7xl mx-auto">
        <BlogList blogs={blogs} setBlogs={() => {}} layout="grid" />
      </div>
    </div>
  );
};
BlogsPaginated.propTypes = {
  currentPage: PropTypes.number,
  postsPerPage: PropTypes.number,
};
export default BlogsPaginated;
