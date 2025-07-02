import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import PropTypes from "prop-types";

const WithState = ({ tag }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!tag) return;

    const fetchBlogs = async () => {
      try {
        const res = await fetch(`/api/tag/${tag}.json`);
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch tag blogs:", err);
      }
    };

    fetchBlogs();
  }, [tag]);

  return <BlogList blogs={blogs} setBlogs={setBlogs} />;
};

WithState.propTypes = {
  tag: PropTypes.string,
};

export default WithState;
