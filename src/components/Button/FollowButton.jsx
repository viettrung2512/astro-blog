import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaUserPlus, FaUserTimes } from "react-icons/fa";

const FollowButton = ({ userId, isFollowing, setIsFollowing, onFollowChange }) => {
  const [token, setToken] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // Chỉ chạy trên client
    setToken(localStorage.getItem("token"));
    setCurrentUserId(localStorage.getItem("userId"));
  }, []);

  if (!token || !currentUserId || userId === currentUserId) {
    return null;
  }

  const handleToggleFollow = async (e) => {
    e.stopPropagation();

    const url = `http://localhost:8080/api/follows/${userId}`;
    const method = isFollowing ? "DELETE" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsFollowing(!isFollowing);
        onFollowChange(isFollowing ? -1 : 1);
      } else {
        const errorData = await response.json();
        console.error("Lỗi từ API:", errorData.message || "Không thể cập nhật trạng thái follow.");
        alert(errorData.message || "Không thể cập nhật trạng thái follow.");
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
      alert("Lỗi kết nối API. Vui lòng thử lại.");
    }
  };

  return (
    <div
      onClick={handleToggleFollow}
      className={`flex items-center space-x-1 cursor-pointer ${isFollowing ? "text-blue-500" : "hover:text-blue-500"
        }`}
    >
      {isFollowing ? <FaUserTimes /> : <FaUserPlus />}
      <span>{isFollowing ? "Unfollow" : "Follow"}</span>
    </div>
  );
};

FollowButton.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isFollowing: PropTypes.bool,
  setIsFollowing: PropTypes.func,
  onFollowChange: PropTypes.func.isRequired,
};

export default FollowButton;
