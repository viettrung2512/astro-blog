"use client"

import { useState, useEffect } from "react"
import CommentButton from "../Button/CommentButton"
import RelatedBlogs from "./RelatedBlogs"
import DOMPurify from "dompurify"
import LoadingSpinner from "../LoadingSpinner"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MessageCircle,
  Heart,
  Tag,
  User,
  Share2,
  Bookmark,
  Eye,
  ThumbsUp,
} from "lucide-react"

const BlogContent = ({ blogId }) => {
  const id = window.location.pathname.split("/").pop()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [likeCount, setLikeCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const fetchBlogData = async () => {
      const token = localStorage.getItem("token")
      setLoading(true)
      try {
        const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          window.location.href = "/*"
          throw new Error("Failed to fetch blog data")
        }
        let blogData = await response.json()
        blogData = {
          ...blogData,
          likeCount: blogData.likeCount || blogData.likeCnt || (blogData.likes ? blogData.likes.length : 0),
          _id: blogData._id || blogData.id,
        }
        setBlog(blogData)
        setLikeCount(blogData.likeCount || 0)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogData()
  }, [id])

  useEffect(() => {
    let hasSaved = false
    const saveHistory = async () => {
      if (hasSaved) return
      hasSaved = true
      const token = localStorage.getItem("token")
      if (!token) return
      try {
        await fetch(`http://localhost:8080/api/history/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            postId: id,
            description: "Viewed the post",
          }),
        })
      } catch (error) {
        console.error("Failed to save history:", error)
      }
    }

    saveHistory()
  }, [id])

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // You could add a toast notification here
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  const sanitizedContent = DOMPurify.sanitize(blog.content)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Back to articles</span>
            </button>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isLiked ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                <span className="text-sm font-medium">{likeCount}</span>
              </button>

              <button
                onClick={handleBookmark}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Hero Image */}
              <div className="relative h-64 sm:h-80 lg:h-96">
                <img
                  src={blog.imageCloudUrl || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white/90 text-gray-900 backdrop-blur-sm">
                    {blog.category}
                  </span>
                </div>

                {/* Article Stats Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {blog.viewCount || "1.2k"} views
                      </span>
                      <span className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {likeCount} likes
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Header */}
              <div className="p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  {blog.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm mb-6 pb-6 border-b border-gray-200">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(blog.createdAt)}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {blog.commentCount || 0} comments
                  </span>
                </div>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-8">
                    <Tag className="h-4 w-4 text-gray-500" />
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Mobile Author Card */}
                <div className="lg:hidden bg-gray-50 rounded-xl p-4 mb-8">
                  <div className="flex items-center">
                    <a href={`/profile/${blog.author._id}`} className="flex-shrink-0">
                      <img
                        src={blog.author.profilePicture || "/placeholder.svg"}
                        alt={blog.author.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </a>
                    <div className="ml-4 flex-1">
                      <a
                        href={`/profile/${blog.author._id}`}
                        className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {blog.author.name}
                      </a>
                      <p className="text-sm text-gray-500">{blog.author.email}</p>
                    </div>
                    <a
                      href={`/profile/${blog.author._id}`}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Follow
                    </a>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <div
                    className="text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    style={{
                      fontSize: "18px",
                      lineHeight: "1.8",
                    }}
                  />
                </div>

                {/* Article Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleLike}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                          isLiked
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                        <span>{likeCount} likes</span>
                      </button>

                      <button
                        onClick={handleShare}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                      >
                        <Share2 className="h-5 w-5" />
                        <span>Share</span>
                      </button>
                    </div>

                    <button
                      onClick={handleBookmark}
                      className={`p-3 rounded-lg transition-colors ${
                        isBookmarked
                          ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <div className="mt-8 bg-white rounded-xl shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MessageCircle className="h-6 w-6 mr-3 text-blue-600" />
                Discussion ({blog.commentCount || 0})
              </h2>
              <CommentButton blogId={id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Author Card */}
              <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="px-6 pb-6 text-center">
                  <div className="-mt-10 mb-4">
                    <a href={`/profile/${blog.author._id}`}>
                      <img
                        src={blog.author.profilePicture || "/placeholder.svg"}
                        alt={blog.author.name}
                        className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                      />
                    </a>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    <a href={`/profile/${blog.author._id}`} className="hover:text-blue-600 transition-colors">
                      {blog.author.name}
                    </a>
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{blog.author.email}</p>
                  <a
                    href={`/profile/${blog.author._id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors w-full justify-center"
                  >
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </a>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="hidden lg:block bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleLike}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                      isLiked ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                    <span>
                      {isLiked ? "Liked" : "Like"} ({likeCount})
                    </span>
                  </button>

                  <button
                    onClick={handleBookmark}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                      isBookmarked
                        ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                    <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share Article</span>
                  </button>
                </div>
              </div>

              {/* Article Stats */}
              <div className="hidden lg:block bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Article Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Views</span>
                    <span className="font-medium">{blog.viewCount || "1,234"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Likes</span>
                    <span className="font-medium">{likeCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Comments</span>
                    <span className="font-medium">{blog.commentCount || 0}</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <RelatedBlogs tag={blog.tags?.[0]} postId={blog._id} />
        </div>
      </div>
    </div>
  )
}

export default BlogContent
