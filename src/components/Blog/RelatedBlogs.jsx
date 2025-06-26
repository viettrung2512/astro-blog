import BlogCard from "./BlogCard";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const RelatedBlogs = ({ tag, postId }) => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts/related/${tag}/${postId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const postsWithId = data.content.map(post => ({
            ...post,
            _id: post._id || post.id
          }));
          setBlogs(postsWithId);
        } else {
          console.error("Error fetching related posts:", await response.json());
        }
      } catch (error) {
        console.error("API connection error:", error);
      }
    };
    fetchBlogData();
  }, [tag, postId]);

  return (
    <div className="related-blogs text-lg">
      <div className="blogs-container flex flex-wrap gap-4 items-stretch">
        {blogs?.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            category={blog.category}
            title={blog.title}
            imageUrl={blog.imageCloudUrl}
          />
        ))}
      </div>
    </div>
  );
};
RelatedBlogs.propTypes = {
  tag: PropTypes.string.isRequired,
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default RelatedBlogs;
