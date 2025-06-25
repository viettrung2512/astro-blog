import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

 useEffect(() => {
  const fetchBlogs = async () => {
    if (!token) {
      setError("Vui lòng đăng nhập để xem bài viết");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/posts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Lỗi ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      const blogsArray = data.content || [];
      setBlogs(blogsArray);
    } catch (error) {
      console.error("Chi tiết lỗi:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchBlogs();
});

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100 py-[50px] mt-10">
      <div className="w-full mx-auto min-h-screen">
        <BlogList 
          blogs={blogs} 
          setBlogs={setBlogs} 
          layout="grid" // Thêm giá trị mặc định
        />
      </div>
    </div>
  );
};

export default Blogs;