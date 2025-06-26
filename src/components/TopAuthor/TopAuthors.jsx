"use client"

import { useEffect, useState } from "react"

const TopAuthors = () => {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTopAuthors = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/most-posts`)
        if (!response.ok) {
          throw new Error("Failed to fetch top authors")
        }
        const data = await response.json()
        const topAuthors = data.slice(0, 4).map((author) => ({
          id: author.id,
          postCount: author.postCount,
          name: author.userDetails[0].username,
          username: author.userDetails[0].username,
          profilePicture: author.userDetails[0].profilePicture,
          followerNumber: author.userDetails[0].followerNumber || 0,
        }))

        setAuthors(topAuthors)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTopAuthors()
  }, [])

  // Loading Component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="flex flex-col items-center space-y-4">
            {/* Avatar Skeleton */}
            <div
              className="w-24 h-24 rounded-full animate-pulse"
              style={{
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "200px 100%",
                animation: "shimmer 1.5s infinite",
              }}
            />
            {/* Name Skeleton */}
            <div
              className="h-6 w-32 rounded-lg animate-pulse"
              style={{
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "200px 100%",
                animation: "shimmer 1.5s infinite",
              }}
            />
            {/* Stats Skeleton */}
            <div className="space-y-2 w-full">
              <div
                className="h-4 w-24 rounded mx-auto animate-pulse"
                style={{
                  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                  backgroundSize: "200px 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              />
              <div
                className="h-4 w-20 rounded mx-auto animate-pulse"
                style={{
                  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                  backgroundSize: "200px 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
      `}</style>
    </div>
  )

  // Error Component
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-red-50 rounded-full p-6 mb-6">
        <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        We couldn't load the top authors right now. Please try again later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Try Again
      </button>
    </div>
  )

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  const getRankBadge = (index) => {
    const badges = [
      { bg: "from-yellow-400 to-yellow-600", icon: "👑", text: "Top Author" },
      { bg: "from-gray-300 to-gray-500", icon: "🥈", text: "2nd Place" },
      { bg: "from-orange-400 to-orange-600", icon: "🥉", text: "3rd Place" },
      { bg: "from-blue-400 to-blue-600", icon: "⭐", text: "Rising Star" },
    ]
    return badges[index] || badges[3]
  }

  if (loading) return <LoadingSkeleton />
  if (error) return <ErrorState />

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 py-8 px-4 rounded-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {authors.map((author, index) => {
          const rankBadge = getRankBadge(index)

          return (
            <div
              key={author.id}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
            >
              {/* Rank Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div
                  className={`bg-gradient-to-r ${rankBadge.bg} text-white px-4 py-2 rounded-full shadow-lg text-xs font-bold flex items-center space-x-1`}
                >
                  <span>{rankBadge.icon}</span>
                  <span>{rankBadge.text}</span>
                </div>
              </div>

              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <a
                href={`/profile/${author.id}`}
                className="relative flex flex-col items-center cursor-pointer text-decoration-none"
                style={{ textDecoration: "none" }}
              >
                {/* Profile Picture */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500 transform scale-110" />
                  <img
                    src={author.profilePicture || "/placeholder.svg"}
                    alt={`${author.name}'s profile`}
                    className="relative w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-xl group-hover:ring-blue-200 transition-all duration-500 transform group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png"
                    }}
                  />
                  {/* Online Indicator */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Author Info */}
                <div className="text-center space-y-3 w-full">
                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {author.name}
                  </h3>

                  {/* Username */}
                  <p className="text-sm text-gray-500 font-medium">@{author.username}</p>

                  {/* Stats */}
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    {/* Posts */}
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                      <div className="p-2 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{formatNumber(author.postCount)}</p>
                        <p className="text-xs text-gray-500">Posts</p>
                      </div>
                    </div>

                    {/* Followers */}
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                      <div className="p-2 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors duration-300">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{formatNumber(author.followerNumber)}</p>
                        <p className="text-xs text-gray-500">Followers</p>
                      </div>
                    </div>
                  </div>

                  {/* Follow Button */}
                  <div className="pt-4">
                    <button
                      className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 group-hover:-translate-y-1"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        // Handle follow logic here
                        console.log(`Following ${author.name}`)
                      }}
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <span>Follow</span>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Hover Effect Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
                  <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" />
                </div>
              </a>

              {/* Card Border Effect */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-gray-900/5 group-hover:ring-blue-500/30 transition-all duration-500 pointer-events-none" />
            </div>
          )
        })}
      </div>

      {/* View All Authors Button */}
      <div className="text-center mt-12">
        <button className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-full shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-300 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
          <span>View All Authors</span>
          <svg
            className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default TopAuthors
