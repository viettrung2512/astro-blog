/* empty css                                    */
import { c as createComponent, d as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DsJb3smy.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../../chunks/MainLayout_viJGY8AB.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime.js';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaBookmark, FaHeart } from 'react-icons/fa';
export { renderers } from '../../renderers.mjs';

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
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const updatedSaved = !isSaved;
        setIsSaved(updatedSaved);
        setBlogs(
          (prevBlogs) => prevBlogs.map(
            (b) => b._id === blog._id ? { ...b, isSaved: updatedSaved } : b
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      onClick: handleToggleSavePost,
      className: `flex items-center space-x-1 cursor-pointer ${isSaved ? "text-yellow-500" : "hover:text-yellow-500"}`,
      children: /* @__PURE__ */ jsx(FaBookmark, {})
    }
  );
};
SaveButton.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isSaved: PropTypes.bool
  }).isRequired,
  isSaved: PropTypes.bool.isRequired,
  setIsSaved: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired
};

const LikeButton = ({
  blogId,
  likes: initialLikes,
  isLiked: initialIsLiked,
  setBlogs
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
      const newIsLiked = !isLiked;
      const newLikes = newIsLiked ? likes + 1 : likes - 1;
      setIsLiked(newIsLiked);
      setLikes(newLikes);
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error("Lỗi API");
      if (setBlogs) {
        setBlogs(
          (prevBlogs) => prevBlogs.map(
            (blog) => blog._id === blogId ? { ...blog, likeCnt: newLikes, liked: newIsLiked } : blog
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: handleToggleLike,
      className: `like-icon-container flex items-center space-x-1 cursor-pointer ${isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"} ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`,
      children: [
        /* @__PURE__ */ jsx(FaHeart, { style: { fill: "currentColor" } }),
        /* @__PURE__ */ jsx("span", { children: likes })
      ]
    }
  );
};
LikeButton.propTypes = {
  blogId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  likes: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  setBlogs: PropTypes.func
};

const BlogItem = ({ blog, setBlogs }) => {
  const [likes, setLikes] = useState(blog.likeCnt || 0);
  const [isLiked, setIsLiked] = useState(blog.liked ?? false);
  const [isSaved, setIsSaved] = useState(blog.saved ?? false);
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    setIsLiked(blog.liked);
    setIsSaved(blog.saved);
    setLikes(blog.likeCnt);
  }, [blog.liked, blog.saved, blog.likeCnt]);
  const handleNavigate = () => {
    window.location.href = `/articles/${blog._id}`;
  };
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const handleImageError = (e) => {
    e.target.src = "http://localhost:8080/default-blog-image.png";
  };
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  return /* @__PURE__ */ jsxs(
    "article",
    {
      className: "group block cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01]",
      onClick: handleNavigate,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-stretch bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-500 min-h-[500px] backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-shrink-0 w-2/5 overflow-hidden", children: [
            !imageLoaded && /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-full h-full animate-pulse",
                style: {
                  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                  backgroundSize: "200px 100%",
                  animation: "shimmer 1.5s infinite"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "img",
              {
                className: `w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? "opacity-100" : "opacity-0 absolute"}`,
                src: blog.imageCloudUrl || "/placeholder.svg",
                alt: blog.title,
                onLoad: handleImageLoad,
                onError: handleImageError
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 z-10", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg backdrop-blur-sm border border-white/20 transform transition-transform duration-300 group-hover:scale-105", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 mr-1.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                }
              ) }),
              blog.category
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 p-8 flex flex-col justify-between relative bg-gradient-to-br from-white to-gray-50/50", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-6 right-6 z-10", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:scale-110 hover:-translate-y-1",
                onClick: (e) => e.stopPropagation(),
                children: /* @__PURE__ */ jsx(SaveButton, { blog, blogId: blog._id, setBlogs, isSaved, setIsSaved })
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 flex-1 pr-16", children: [
              /* @__PURE__ */ jsx(
                "h3",
                {
                  className: "text-2xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300",
                  style: {
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  },
                  children: blog.title
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 pt-2", children: ["React", "JavaScript", "Web Dev"].map((tag, index) => /* @__PURE__ */ jsxs(
                "span",
                {
                  className: "px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors duration-200",
                  children: [
                    "#",
                    tag
                  ]
                },
                index
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-6 border-t border-gray-100", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-4", children: blog.author ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        className: "w-12 h-12 rounded-full object-cover ring-3 ring-blue-100 shadow-md transition-transform duration-300 group-hover:scale-105",
                        src: blog.author.profilePicture || "/placeholder.svg",
                        alt: blog.author.name || "Author",
                        onError: (e) => {
                          e.target.src = "/default-avatar.png";
                        }
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200", children: blog.author.name || blog.author.username || "Unknown" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-xs text-gray-500", children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        }
                      ) }),
                      /* @__PURE__ */ jsx("span", { children: formatDate(blog.createdAt) })
                    ] })
                  ] })
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-md", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    }
                  ) }) }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900", children: "Unknown Author" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-xs text-gray-500", children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        }
                      ) }),
                      /* @__PURE__ */ jsx("span", { children: formatDate(blog.createdAt) })
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxs("button", { className: "inline-flex items-center px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 group-hover:translate-x-2", children: [
                  /* @__PURE__ */ jsx("span", { children: "Read more" }),
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-gray-50", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6", children: [
                  blog.views && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-2 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors duration-200", children: /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                      /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: blog.views })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-2 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors duration-200", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      }
                    ) }) }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "24" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-2 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors duration-200", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      }
                    ) }) }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Chia sẻ" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "flex items-center space-x-2 p-3 rounded-full hover:bg-red-50 transition-all duration-300 transform hover:scale-110",
                    onClick: (e) => e.stopPropagation(),
                    children: /* @__PURE__ */ jsx(
                      LikeButton,
                      {
                        blogId: blog._id,
                        likes,
                        isLiked,
                        setLikes,
                        setIsLiked,
                        setBlogs
                      }
                    )
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-3xl ring-1 ring-inset ring-gray-900/5 group-hover:ring-blue-500/30 transition-all duration-500 pointer-events-none" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-blue-500/5 to-purple-500/5" })
        ] }),
        /* @__PURE__ */ jsx("style", { jsx: true, children: `
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
      ` })
      ]
    }
  );
};
BlogItem.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    category: PropTypes.string,
    imageCloudUrl: PropTypes.string,
    likeCnt: PropTypes.number,
    liked: PropTypes.bool,
    saved: PropTypes.bool,
    views: PropTypes.number,
    author: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      profilePicture: PropTypes.string,
      username: PropTypes.string
    })
  }).isRequired,
  setBlogs: PropTypes.func.isRequired
};

const BlogList = ({ blogs, setBlogs, layout = "grid" }) => {
  const [currentLayout, setCurrentLayout] = useState("grid");
  useEffect(() => {
    const savedLayout = localStorage.getItem("layout");
    if (savedLayout) {
      setCurrentLayout(savedLayout);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("layout", currentLayout);
  }, [currentLayout]);
  const handleLayoutToggle = () => {
    setCurrentLayout((prevLayout) => prevLayout === "grid" ? "list" : "grid");
  };
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-64", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Không có bài viết nào để hiển thị." }) });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: handleLayoutToggle,
        className: "flex items-center cursor-pointer bg-white border border-gray-600 rounded-full w-fit mt-5 mb-5"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `${currentLayout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full" : "flex flex-col gap-4 w-full"} mx-0 px-4 sm:px-6 md:px-8 lg:px-10`,
        children: blogs.map((blog) => /* @__PURE__ */ jsx(BlogItem, { blog, setBlogs }, blog.id))
      }
    )
  ] });
};
BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  layout: PropTypes.oneOf(["grid", "list"])
};

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
  return /* @__PURE__ */ jsx(BlogList, { blogs, setBlogs });
};
WithState.propTypes = {
  tag: PropTypes.string
};

const $$Astro = createAstro();
const $$tagName = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$tagName;
  const { tagName } = Astro2.params;
  const baseURL = new URL(Astro2.request.url).origin;
  const response = await fetch(`${baseURL}/api/tag/${tagName}.json`);
  await response.json();
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": `Tag: ${tagName}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white text-black min-h-screen px-4 py-8"> <h1 class="text-4xl font-extrabold text-center mb-10">
Blogs in <span class="text-blue-600">#${tagName}</span> </h1> ${renderComponent($$result2, "WithState", WithState, { "tag": tagName, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/TMA-intern/TechPeople-blog/astro-blog/src/components/Blog/WithState.jsx", "client:component-export": "default" })} </section> ` })}`;
}, "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/tag/[tagName].astro", void 0);

const $$file = "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/tag/[tagName].astro";
const $$url = "/tag/[tagName]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$tagName,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
