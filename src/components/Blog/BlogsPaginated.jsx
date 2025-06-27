import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import LoadingSpinner from "../LoadingSpinner";

const BlogsPaginated = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const fetchAllBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/posts?page=0&size=1000"); // Fetch tất cả bài viết
      const data = await res.json();

      const blogArray = Array.isArray(data)
        ? data
        : Array.isArray(data.content)
        ? data.content
        : [];

      setBlogs(blogArray);
    } catch (err) {
      console.error("Lỗi fetch blogs:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div className="blogs-section">
      <div className="">
        {loading ? (
          <LoadingSpinner />
        ) : currentBlogs.length > 0 ? (
          <>
            <BlogList blogs={currentBlogs} setBlogs={() => {}} layout="grid" />

            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded border text-sm bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-3 py-1 rounded border text-sm ${
                      currentPage === idx + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded border text-sm bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500">Không có bài viết nào.</div>
        )}
      </div>
    </div>
  );
};

export default BlogsPaginated;
