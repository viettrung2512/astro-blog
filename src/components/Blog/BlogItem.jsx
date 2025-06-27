"use client"

import PropTypes from "prop-types"
import SaveButton from "../Button/SaveButton"
import LikeButton from "../Button/LikeButton"
import { useState, useEffect } from "react"

const BlogItem = ({ blog, setBlogs }) => {
  const [likes, setLikes] = useState(blog.likeCnt || 0)
  const [isLiked, setIsLiked] = useState(blog.liked ?? false)
  const [isSaved, setIsSaved] = useState(blog.saved ?? false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setIsLiked(blog.liked)
    setIsSaved(blog.saved)
    setLikes(blog.likeCnt)
  }, [blog.liked, blog.saved, blog.likeCnt])

  const handleNavigate = () => {
    window.location.href = `/articles/${blog._id}`
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = (e) => {
    e.target.src = import.meta.env.VITE_API_BASE_URL + "/default-blog-image.png"
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const truncateText = (text, maxLength = 120) => {
    if (!text) return ""
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }


  return (
    <article
      className="group block cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01]"
      onClick={handleNavigate}
    >
      <div className="relative flex items-stretch bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-500 min-h-[500px] backdrop-blur-sm">
        {/* Image Section */}
        <div className="relative flex-shrink-0 w-2/5 overflow-hidden">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div
              className="w-full h-full animate-pulse"
              style={{
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "200px 100%",
                animation: "shimmer 1.5s infinite",
              }}
            />
          )}

          {/* Main Image */}
          <img
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0 absolute"
            }`}
            src={blog.imageCloudUrl || "/placeholder.svg"}
            alt={blog.title}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          {/* Image Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg backdrop-blur-sm border border-white/20 transform transition-transform duration-300 group-hover:scale-105">
              <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              {blog.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-8 flex flex-col justify-between relative bg-gradient-to-br from-white to-gray-50/50">
          {/* Save Button */}
          <div className="absolute top-6 right-6 z-10">
            <div
              className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              onClick={(e) => e.stopPropagation()}
            >
              <SaveButton blog={blog} blogId={blog._id} setBlogs={setBlogs} isSaved={isSaved} setIsSaved={setIsSaved} />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-4 flex-1 pr-16">
            {/* Title */}
            <h3
              className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {blog.title}
            </h3>

            {/* Tags/Keywords (if available) */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["React", "JavaScript", "Web Dev"].map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors duration-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {blog.author ? (
                  <>
                    <div className="relative">
                      <img
                        className="w-12 h-12 rounded-full object-cover ring-3 ring-blue-100 shadow-md transition-transform duration-300 group-hover:scale-105"
                        src={blog.author.profilePicture || "/placeholder.svg"}
                        alt={blog.author.name || "Author"}
                        onError={(e) => {
                          e.target.src = "/default-avatar.png"
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                        {blog.author.name || blog.author.username || "Unknown"}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-md">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-gray-900">Unknown Author</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Read More Button */}
              <button className="inline-flex items-center px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 group-hover:translate-x-2">
                <span>Đọc thêm</span>
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <div className="flex items-center space-x-6">
                {/* Views */}
                {blog.views && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                    <div className="p-2 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors duration-200">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <span className="font-medium">{blog.views}</span>
                  </div>
                )}

                {/* Comments */}
                <div className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                  <div className="p-2 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">24</span>
                </div>

                {/* Share */}
                <div className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                  <div className="p-2 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">Chia sẻ</span>
                </div>
              </div>

              {/* Like Button */}
              <div
                className="flex items-center space-x-2 p-3 rounded-full hover:bg-red-50 transition-all duration-300 transform hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <LikeButton
                  blogId={blog._id}
                  likes={likes}
                  isLiked={isLiked}
                  setLikes={setLikes}
                  setIsLiked={setIsLiked}
                  setBlogs={setBlogs}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-gray-900/5 group-hover:ring-blue-500/30 transition-all duration-500 pointer-events-none" />

        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
      </div>

      {/* Custom Keyframes for Shimmer Animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
      `}</style>
    </article>
  )
}

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
      username: PropTypes.string,
    }),
  }).isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default BlogItem
