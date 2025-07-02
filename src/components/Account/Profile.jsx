"use client"

import { useEffect, useState, useCallback } from "react"
import PropTypes from "prop-types"
import BlogList from "../Blog/BlogList"
import FollowButton from "../Button/FollowButton"
import {
  Users,
  UserPlus,
  Calendar,
  MapPin,
  LinkIcon,
  ExternalLink,
  X,
  ChevronLeft,
  BookOpen,
  Grid,
  Heart,
  MessageSquare,
  Settings,
  Star,
  TrendingUp,
  Eye,
  Share2,
  MoreHorizontal,
} from "lucide-react"

const ProfilePage = ({ userId }) => {
  const [myPosts, setMyPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [userError, setUserError] = useState(null)
  const [postsError, setPostsError] = useState(null)
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false)
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [activeTab, setActiveTab] = useState("posts")
  const [modalLoading, setModalLoading] = useState(false)

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setUserError("Authentication required")
      setLoading(false)
      return
    }

    // Validate userId
    const isValidObjectId = /^[a-f\d]{24}$/i.test(userId)
    if (!isValidObjectId) {
      setUserError("Invalid user ID")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      await Promise.all([fetchUserInfo(token), fetchMyPosts(token)])
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }, [userId])

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch user information")
      }

      const data = await response.json()
      setUser(data)
      setIsFollowing(data.amIFollowing)
      setUserError(null)
    } catch (error) {
      console.error("Error fetching user info:", error)
      setUserError(error.message)
      setUser(null)
    }
  }

  const fetchMyPosts = async (token) => {
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${userId}-posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch posts")
      }

      const data = await response.json()
      const postsWithId = data.map((post) => ({
        ...post,
        _id: post._id || post.id,
      }))
      setMyPosts(postsWithId)
      setPostsError(null)
    } catch (error) {
      console.error("Error fetching posts:", error)
      setPostsError(error.message)
      setMyPosts([])
    }
  }

  const fetchFollowers = async () => {
    const token = localStorage.getItem("token")
    setModalLoading(true)
    try {
      const response = await fetch(`http://localhost:8080/api/follows/${userId}/followers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      if (!response.ok) {
        throw new Error("Failed to fetch followers")
      }
      
      const data = await response.json()
      setFollowers(data)
    } catch (error) {
      console.error("Error fetching followers:", error)
      setFollowers([])
    } finally {
      setModalLoading(false)
    }
  }

  const fetchFollowing = async () => {
    const token = localStorage.getItem("token")
    setModalLoading(true)
    try {
      const response = await fetch(`http://localhost:8080/api/follows/${userId}/following`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      if (!response.ok) {
        throw new Error("Failed to fetch following")
      }
      
      const data = await response.json()
      setFollowing(data)
    } catch (error) {
      console.error("Error fetching following:", error)
      setFollowing([])
    } finally {
      setModalLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [fetchData, userId])

  const handleRetry = () => {
    setUserError(null)
    setPostsError(null)
    fetchData()
  }

  if (loading) {
    return <LoadingScreen />
  }

  if (userError && !user) {
    return <ErrorScreen error={userError} onRetry={handleRetry} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "-1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "-2s" }}
        ></div>
      </div>

      <div className="flex">
        <div className=" flex-grow p-6 relative z-10">
          <ProfileHeader 
            user={user}
            onBack={() => window.history.back()}
            onFollowersClick={() => {
              setIsFollowersModalOpen(true)
              fetchFollowers()
            }}
            onFollowingClick={() => {
              setIsFollowingModalOpen(true)
              fetchFollowing()
            }}
            isFollowing={isFollowing}
            setIsFollowing={setIsFollowing}
            userId={userId}
            postsCount={myPosts.length}
          />

          {/* Enhanced Tab Navigation */}
          <div className="mb-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-1 shadow-xl inline-flex">
              <TabButton
                active={activeTab === "posts"}
                icon={<Grid className="h-5 w-5 mr-3" />}
                label="Posts"
                count={myPosts.length}
                onClick={() => setActiveTab("posts")}
              />
              <TabButton
                active={activeTab === "activity"}
                icon={<Heart className="h-5 w-5 mr-3" />}
                label="Activity"
                onClick={() => setActiveTab("activity")}
              />
            </div>
          </div>

          {/* Content Section */}
          {activeTab === "posts" ? (
            <PostsContent 
              loading={loading}
              error={postsError}
              posts={myPosts}
              userName={user?.name}
              onRetry={handleRetry}
            />
          ) : (
            <ActivityContent 
              posts={myPosts}
              userName={user?.name}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      {isFollowersModalOpen && (
        <FollowersModal
          title="Followers"
          onClose={() => setIsFollowersModalOpen(false)}
          items={followers}
          loading={modalLoading}
        />
      )}

      {isFollowingModalOpen && (
        <FollowersModal
          title="Following"
          onClose={() => setIsFollowingModalOpen(false)}
          items={following}
          loading={modalLoading}
        />
      )}
    </div>
  )
}

// Sub-components
const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-lg font-medium text-gray-700">Loading profile...</p>
    </div>
  </div>
)

const ErrorScreen = ({ error, onRetry }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
    <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md mx-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <X className="h-8 w-8 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Profile</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-2xl transition-colors"
        >
          Go Back
        </button>
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-2xl transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
)

const ProfileHeader = ({ user, onBack, onFollowersClick, onFollowingClick, isFollowing, setIsFollowing, userId, postsCount }) => (
  <div className="relative mb-12">
    {/* Cover Image */}
    <div className="h-80 rounded-3xl overflow-hidden shadow-2xl relative group">
      <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 via-pink-500 to-orange-500 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 group-hover:from-black/30 group-hover:to-black/30 transition-all duration-700"></div>
      </div>
    </div>

    {/* Back Button */}
    <button
      onClick={onBack}
      className="absolute top-6 left-6 bg-white/20 backdrop-blur-xl text-white p-3 rounded-2xl hover:bg-white/30 transition-all duration-300 shadow-xl hover:scale-110 hover:-translate-y-1 border border-white/20"
      aria-label="Go back"
    >
      <ChevronLeft className="h-6 w-6" />
    </button>

    {/* Profile Card */}
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 mx-6 -mt-32 relative z-10 border border-white/50">
      <div className="flex flex-col lg:flex-row gap-6 relative z-10">
        {/* Avatar Section */}
        <div className="flex-shrink-0 -mt-20 lg:-mt-28 mx-auto lg:mx-0 relative">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 scale-110"></div>
            <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-full border-6 border-white overflow-hidden bg-white shadow-2xl group-hover:scale-105 transition-transform duration-500">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="flex-grow text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <h1 className="text-3xl lg:text-4xl font-bold">
                  {user.name}
                </h1>
                <p className="text-lg text-gray-500">
                  @{user.username || user.name.toLowerCase().replace(/\s/g, "")}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {user.location && (
                  <div className="flex items-center bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2.5 rounded-2xl border border-blue-100 hover:border-blue-200 transition-colors group">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 font-medium">{user.location}</span>
                  </div>
                )}

                <div className="flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2.5 rounded-2xl border border-emerald-100 hover:border-emerald-200 transition-colors group">
                  <Calendar className="h-5 w-5 mr-2 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700 font-medium">
                    Joined {new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </span>
                </div>

                {user.website && (
                  <div className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2.5 rounded-2xl border border-purple-100 hover:border-purple-200 transition-colors group">
                    <LinkIcon className="h-5 w-5 mr-2 text-purple-600 group-hover:scale-110 transition-transform" />
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
                    >
                      {user.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center gap-2 mt-0">
              <FollowButton
                userId={userId}
                isFollowing={isFollowing}
                setIsFollowing={setIsFollowing}
                onFollowChange={(change) => {
                  setUser(prev => ({
                    ...prev,
                    followerNumber: prev.followerNumber + change
                  }))
                }}
              />
              <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="lg:hidden mt-8">
            <div className="flex justify-center space-x-3">
              <FollowButton
                userId={userId}
                isFollowing={isFollowing}
                setIsFollowing={setIsFollowing}
                onFollowChange={(change) => {
                  setUser(prev => ({
                    ...prev,
                    followerNumber: prev.followerNumber + change
                  }))
                }}
              />
              <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <StatButton
              icon={<Users className="h-6 w-6 text-blue-600 mr-2 group-hover:scale-110 transition-transform" />}
              value={user.followerNumber || 0}
              label="Followers"
              onClick={onFollowersClick}
              color="blue"
            />
            <StatButton
              icon={<UserPlus className="h-6 w-6 text-purple-600 mr-2 group-hover:scale-110 transition-transform" />}
              value={user.followingNumber || 0}
              label="Following"
              onClick={onFollowingClick}
              color="purple"
            />
            <StatButton
              icon={<BookOpen className="h-6 w-6 text-emerald-600 mr-2 group-hover:scale-110 transition-transform" />}
              value={postsCount || 0}
              label="Posts"
              color="emerald"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

const StatButton = ({ icon, value, label, onClick, color = "blue" }) => {
  const colorClasses = {
    blue: {
      bgFrom: "from-blue-50",
      bgTo: "to-blue-100",
      hoverFrom: "hover:from-blue-100",
      hoverTo: "hover:to-blue-200",
      border: "border-blue-200",
      textHover: "group-hover:text-blue-600",
      bgGradient: "from-blue-400/10 to-blue-600/10",
    },
    purple: {
      bgFrom: "from-purple-50",
      bgTo: "to-purple-100",
      hoverFrom: "hover:from-purple-100",
      hoverTo: "hover:to-purple-200",
      border: "border-purple-200",
      textHover: "group-hover:text-purple-600",
      bgGradient: "from-purple-400/10 to-purple-600/10",
    },
    emerald: {
      bgFrom: "from-emerald-50",
      bgTo: "to-emerald-100",
      hoverFrom: "hover:from-emerald-100",
      hoverTo: "hover:to-emerald-200",
      border: "border-emerald-200",
      textHover: "group-hover:text-emerald-600",
      bgGradient: "from-emerald-400/10 to-emerald-600/10",
    },
  }

  return (
    <button
      className={`group relative p-6 bg-gradient-to-br ${colorClasses[color].bgFrom} ${colorClasses[color].bgTo} rounded-3xl ${colorClasses[color].hoverFrom} ${colorClasses[color].hoverTo} transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl border ${colorClasses[color].border}`}
      onClick={onClick}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color].bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className="relative">
        <div className="flex items-center justify-center mb-2">
          {icon}
        </div>
        <div className={`text-3xl lg:text-4xl font-bold text-gray-900 ${colorClasses[color].textHover} transition-colors mb-1`}>
          {value}
        </div>
        <div className={`text-sm font-medium text-gray-600 group-hover:text-${color}-700 transition-colors`}>
          {label}
        </div>
      </div>
    </button>
  )
}

const TabButton = ({ active, icon, label, count, onClick }) => (
  <button
    className={`flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
      active
        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    }`}
    onClick={onClick}
  >
    {icon}
    {label}
    {count !== undefined && (
      <span
        className={`ml-3 px-3 py-1 rounded-full text-sm ${
          active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
        }`}
      >
        {count}
      </span>
    )}
  </button>
)

const PostsContent = ({ loading, error, posts, userName, onRetry }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-gray-200"></div>
          <div className="w-16 h-16 rounded-full animate-spin absolute top-0 border-4 border-gradient-to-r from-blue-600 to-purple-600 border-t-transparent"></div>
        </div>
        <p className="text-gray-600 text-xl font-medium">Loading posts...</p>
        <p className="text-gray-400 text-sm mt-2">Please wait while we fetch the content</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <X className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Posts</h3>
        <p className="text-red-600 mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
        >
          Retry
        </button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-16 text-center border border-white/50">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-8 shadow-lg">
          <BookOpen className="h-16 w-16 text-blue-500" />
        </div>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">No posts yet</h3>
        <p className="text-gray-600 mb-10 max-w-md mx-auto text-lg leading-relaxed">
          {userName || "This user"} hasn't published any posts yet. Check back later for new content.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
        >
          <ExternalLink className="h-5 w-5 mr-3" />
          Explore other posts
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
      <BlogList blogs={posts} />
    </div>
  )
}

const ActivityContent = ({ posts, userName }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold text-gray-800 flex items-center">
          <TrendingUp className="h-8 w-8 mr-3 text-blue-600" />
          Recent Activity
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Eye className="h-4 w-4" />
          <span>Last 30 days</span>
        </div>
      </div>

      <div className="space-y-8">
        {posts.length > 0 ? (
          posts.slice(0, 5).map((post, index) => (
            <ActivityItem 
              key={post._id || index}
              post={post}
              isLast={index === posts.slice(0, 5).length - 1}
            />
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h4 className="text-2xl font-semibold text-gray-800 mb-3">No activity yet</h4>
            <p className="text-gray-600 max-w-md mx-auto">
              When {userName || "this user"} interacts with posts or publishes content, it will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const ActivityItem = ({ post, isLast }) => (
  <div className="flex group">
    <div className="flex-shrink-0 mr-6">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
        <BookOpen className="h-6 w-6 text-white" />
      </div>
      {!isLast && (
        <div className="h-full w-0.5 bg-gradient-to-b from-blue-200 to-purple-200 mx-auto mt-4"></div>
      )}
    </div>

    <div className="flex-grow pb-8">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          Published a new post
        </h4>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {new Date(post.createdAt || Date.now()).toLocaleDateString()}
        </span>
      </div>

      <div
        onClick={() => (window.location.href = `/blog/${post._id}`)}
        className="block p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 cursor-pointer group-hover:shadow-lg group-hover:scale-[1.02]"
      >
        <p className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
          {post.title}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm">
              <Heart className="h-4 w-4 mr-2 text-pink-500" />
              {post.likeCount || 0} likes
            </span>
            <span className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm">
              <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
              {post.commentCount || 0} comments
            </span>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ExternalLink className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

const FollowersModal = ({ title, onClose, items, loading }) => {
  const [navigating, setNavigating] = useState(false)

  const handleProfileClick = async (userId) => {
    setNavigating(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      window.location.href = `/profile/${userId}`
    } catch (error) {
      console.error("Navigation error:", error)
    } finally {
      setNavigating(false)
      onClose()
    }
  }

  if (navigating) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-10 w-96 text-center shadow-2xl border border-white/50">
          <div className="w-16 h-16 mx-auto mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gradient-to-r from-blue-600 to-purple-600 border-t-transparent absolute top-0"></div>
          </div>
          <p className="text-gray-700 text-lg font-medium">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl border border-white/50">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 px-8 py-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 left-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-6 right-8 w-1 h-1 bg-white rounded-full animate-bounce"></div>
            <div
              className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-white rounded-full animate-pulse"
              style={{ animationDelay: "-0.5s" }}
            ></div>
          </div>

          <div className="flex justify-between items-center relative z-10">
            <h2 className="text-2xl font-bold flex items-center">
              {title === "Followers" ? <Users className="h-6 w-6 mr-3" /> : <UserPlus className="h-6 w-6 mr-3" />}
              {title}
              <span className="ml-3 px-3 py-1 bg-white/20 rounded-full text-sm font-medium">{items.length}</span>
            </h2>
            <button className="text-white hover:bg-white/20 transition-colors p-2 rounded-full" onClick={onClose}>
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-grow p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200"></div>
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gradient-to-r from-blue-600 to-purple-600 border-t-transparent absolute"></div>
              </div>
              <p className="text-gray-500 font-medium">Loading...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                {title === "Followers" ? (
                  <Users className="h-12 w-12 text-gray-400" />
                ) : (
                  <UserPlus className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">No {title.toLowerCase()} yet</h3>
              <p className="text-gray-500 max-w-xs mx-auto leading-relaxed">
                When people {title === "Followers" ? "follow" : "are followed by"} this user, they will appear here.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="group p-4 flex items-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent hover:border-blue-200 hover:shadow-lg hover:scale-[1.02]"
                  onClick={() => handleProfileClick(item.id)}
                >
                  <div className="relative flex-shrink-0 mr-4">
                    <div className="w-14 h-14 bg-gray-200 rounded-2xl overflow-hidden border-2 border-gray-100 group-hover:border-blue-200 transition-colors shadow-md">
                      {item.profilePicture ? (
                        <img
                          src={item.profilePicture}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
                  </div>

                  <div className="flex-grow min-w-0">
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors truncate">
                      @{item.username || item.name?.toLowerCase().replace(/\s/g, "")}
                    </p>
                  </div>

                  <div className="ml-3 p-2 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors">
                    <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

ProfilePage.propTypes = {
  userId: PropTypes.string.isRequired,
}

FollowersModal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string,
      profilePicture: PropTypes.string,
    }),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
}

export default ProfilePage