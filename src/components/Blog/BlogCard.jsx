"use client"

import PropTypes from "prop-types"
import { useState } from "react"

const BlogCard = ({ blog, category, title, excerpt, readTime, publishedAt }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleNavigation = () => {
    window.location.href = `/blog/${blog._id}`
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = (e) => {
    setImageError(true)
    e.target.src = "/default-blog-image.png"
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <article
      onClick={handleNavigation}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-gray-200 hover:-translate-y-2 w-full max-w-sm"
    >
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        {/* Loading Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="w-full h-56 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}

        {/* Main Image */}
        <img
          src={blog.imageCloudUrl || "/placeholder.svg"}
          alt={title}
          className={`w-full h-56 object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-blue-600/90 backdrop-blur-sm rounded-full border border-white/20">
            {category}
          </span>
        </div>

        {/* Author Avatar */}
        {blog.author?.profilePicture && (
          <div className="absolute top-4 right-4 z-10 group/avatar" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img
                src={blog.author.profilePicture || "/placeholder.svg"}
                alt={`${blog.author.username}'s avatar`}
                className="w-10 h-10 rounded-full border-3 border-white object-cover shadow-lg group-hover/avatar:scale-110 transition-transform duration-200"
                onError={(e) => {
                  e.target.src = "/default-avatar.png"
                }}
              />
              <div className="absolute inset-0 rounded-full ring-2 ring-white/50 group-hover/avatar:ring-white/80 transition-all duration-200" />
            </div>
          </div>
        )}

        {/* Read Time Badge */}
        {readTime && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-black/50 backdrop-blur-sm rounded-full">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {readTime} phút đọc
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">{excerpt}</p>}

        {/* Author Info & Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            {/* Author Info */}
            {blog.author?.username && (
              <div className="flex items-center space-x-2">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{blog.author.username}</p>
                  {publishedAt && <p className="text-gray-500 text-xs">{formatDate(publishedAt)}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
            Đọc thêm
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Engagement Stats (Optional) */}
        {(blog.likes || blog.views || blog.comments) && (
          <div className="flex items-center space-x-4 pt-2 text-xs text-gray-500">
            {blog.likes && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>{blog.likes}</span>
              </div>
            )}
            {blog.views && (
              <div className="flex items-center space-x-1">
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
                <span>{blog.views}</span>
              </div>
            )}
            {blog.comments && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>{blog.comments}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/5 group-hover:ring-blue-500/20 transition-all duration-300" />
    </article>
  )
}

BlogCard.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string,
      profilePicture: PropTypes.string,
    }),
    imageCloudUrl: PropTypes.string.isRequired,
    likes: PropTypes.number,
    views: PropTypes.number,
    comments: PropTypes.number,
  }).isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  readTime: PropTypes.number,
  publishedAt: PropTypes.string,
}

BlogCard.defaultProps = {
  excerpt: "",
  readTime: null,
  publishedAt: null,
}

export default BlogCard
