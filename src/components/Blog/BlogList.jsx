import PropTypes from "prop-types";
import BlogItem from "./BlogItem";
import { useState, useEffect } from "react";

const BlogList = ({ blogs, setBlogs, layout = "grid" }) => {
  // Thêm giá trị mặc định
  const [currentLayout, setCurrentLayout] = useState(
    localStorage.getItem("layout") || layout
  );

  useEffect(() => {
    localStorage.setItem("layout", currentLayout);
  }, [currentLayout]);

  const handleLayoutToggle = () => {
    setCurrentLayout((prevLayout) => (prevLayout === "grid" ? "list" : "grid"));
  };

  // Kiểm tra nếu blogs không phải mảng hoặc rỗng
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Không có bài viết nào để hiển thị.</p>
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={handleLayoutToggle}
        className="flex items-center cursor-pointer bg-white border border-gray-600 rounded-full w-fit mt-5 mb-5"
      >
        {/* Phần toggle layout (giữ nguyên) */}
      </div>

      <div
        className={`${
          currentLayout === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            : "flex flex-col gap-4 w-full"
        } mx-0 px-4 sm:px-6 md:px-8 lg:px-10`}
      >
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} setBlogs={setBlogs} />
        ))}
      </div>
    </div>
  );
};

// PropTypes (giữ nguyên)
BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  layout: PropTypes.oneOf(["grid", "list"]),
};

export default BlogList;
