import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/posts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0E1217]">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0E1217] py-[50px] mt-10">
      <div className="w-full mx-auto min-h-screen">
        <BlogList blogs={blogs} setBlogs={setBlogs} />
      </div>
    </div>
  );
};

export default Blogs;