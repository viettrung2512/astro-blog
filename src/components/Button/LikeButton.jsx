import { FaHeart } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const LikeButton = ({
  blogId,
  likes: initialLikes,
  isLiked: initialIsLiked,
  setBlogs,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(initialLikes);
  const [isProcessing, setIsProcessing] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const handleToggleLike = async (e) => {
    e.stopPropagation();

    if (!token) {
      alert("Bạn cần đăng nhập.");
      return;
    }

    if (isProcessing) return;

    const url = `http://localhost:8080/api/likes/post/${blogId}`;
    const method = isLiked ? "DELETE" : "POST";

    try {
      setIsProcessing(true);

      // Optimistic update
      const newIsLiked = !isLiked;
      const newLikes = newIsLiked ? likes + 1 : likes - 1;

      setIsLiked(newIsLiked);
      setLikes(newLikes);

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Lỗi API");

      // Cập nhật danh sách blog
      if (setBlogs) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === blogId
              ? { ...blog, likeCnt: newLikes, liked: newIsLiked }
              : blog
          )
        );
      }
    } catch (error) {
      console.error("Lỗi khi like/unlike:", error);
      setIsLiked(initialIsLiked);
      setLikes(initialLikes);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      onClick={handleToggleLike}
      className={`like-icon-container flex items-center space-x-1 cursor-pointer ${
        isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
      } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <FaHeart style={{ fill: "currentColor" }} />
      <span>{likes}</span>
    </div>
  );
};

LikeButton.propTypes = {
  blogId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  likes: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  setBlogs: PropTypes.func,
};

export default LikeButton;
