import PropTypes from "prop-types";
import { FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";

const SaveButton = ({ blog, setBlogs, isSaved, setIsSaved }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const handleToggleSavePost = async (e) => {
    e.stopPropagation();

    if (!token) {
      alert("Bạn cần đăng nhập.");
      return;
    }

    const url = `http://localhost:8080/bookmarks/post/${blog._id}`;
    const method = isSaved ? "DELETE" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedSaved = !isSaved;
        setIsSaved(updatedSaved);
        setBlogs((prevBlogs) =>
          prevBlogs.map((b) =>
            b._id === blog._id ? { ...b, isSaved: updatedSaved } : b
          )
        );
      } else {
        alert("Không thể cập nhật trạng thái lưu bài viết.");
      }
    } catch (error) {
      console.error("Lỗi khi kết nối đến API:", error);
      alert("Lỗi kết nối với API, vui lòng thử lại.");
    }
  };

  return (
    <div
      onClick={handleToggleSavePost}
      className={`flex items-center space-x-1 cursor-pointer ${
        isSaved ? "text-yellow-500" : "hover:text-yellow-500"
      }`}
    >
      <FaBookmark />
    </div>
  );
};

SaveButton.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isSaved: PropTypes.bool,
  }).isRequired,
  isSaved: PropTypes.bool.isRequired,
  setIsSaved: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default SaveButton;
