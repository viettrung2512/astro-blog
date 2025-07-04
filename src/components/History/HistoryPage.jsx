"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  BookOpen,
  Calendar,
  Trash2,
  RotateCcw,
  ExternalLink,
  Heart,
  MessageSquare,
  User,
  HistoryIcon,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import LoadingSpinner from "../LoadingSpinner";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn cần đăng nhập để xem lịch sử.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.text();
          console.error("Error Response:", data);
          throw new Error(data || "Lỗi khi tải lịch sử.");
        }

        const data = await response.json();
        setHistory(data.data.history);
        setFilteredHistory(data.data.history);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = [...history];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.details?.postId?.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Time period filter
    if (filterPeriod !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (filterPeriod) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        default:
          break;
      }

      filtered = filtered.filter(
        (item) => new Date(item.timestamp) >= filterDate
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredHistory(filtered);
  }, [history, searchTerm, filterPeriod, sortOrder]);

  const handleItemClick = (item) => {
    const postId = item.details?.postId?._id;
    if (postId) {
      window.location.href = `/articles/${postId}`;
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredHistory.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredHistory.map((item) => item._id));
    }
  };

  const handleDeleteSelected = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Bạn cần đăng nhập để xoá lịch sử.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/history/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: selectedItems }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Xóa lịch sử thất bại.");
      }

      // Cập nhật lại danh sách sau khi xóa
      setHistory((prev) =>
        prev.filter((item) => !selectedItems.includes(item._id))
      );
      setSelectedItems([]);
      setShowDeleteConfirm(false);
    } catch (err) {
      setError(err.message);
      setShowDeleteConfirm(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);

    if (diffInSeconds < 60) return "Vừa xem";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
    return time.toLocaleDateString("vi-VN");
  };

  const groupHistoryByDate = (historyItems) => {
    const groups = {};
    historyItems.forEach((item) => {
      const date = new Date(item.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
    });
    return groups;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-md border border-white/50">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const groupedHistory = groupHistoryByDate(filteredHistory);

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

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Header */}
        <div className="mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Title Section */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <HistoryIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Reading History
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {filteredHistory.length} articles • Last updated{" "}
                    {new Date().toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="flex gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">
                        {history.length}
                      </p>
                      <p className="text-sm text-blue-600">Total Read</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold text-purple-900">
                        {filterPeriod === "today"
                          ? groupedHistory[new Date().toDateString()]?.length ||
                            0
                          : "∞"}
                      </p>
                      <p className="text-sm text-purple-600">Today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters and Search */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-3">
                <select
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>

                {selectedItems.length > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="px-4 py-3 bg-red-500 text-black rounded-2xl hover:bg-red-600 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete ({selectedItems.length})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Bulk Actions */}
            {filteredHistory.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredHistory.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    Select all ({filteredHistory.length} items)
                  </span>
                </label>

                <div className="text-sm text-gray-500">
                  {selectedItems.length > 0 &&
                    `${selectedItems.length} selected`}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* History Content */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedHistory).map(([date, items]) => (
              <div key={date} className="space-y-4">
                {/* Date Header */}
                <div className="flex items-center space-x-4">
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-lg border border-white/50">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {items.length} articles
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
                </div>

                {/* Articles for this date */}
                <div className="grid gap-4">
                  {items.map((item, index) => (
                    <div
                      key={item._id || index}
                      className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl border border-white/50 hover:border-blue-200 transition-all duration-500 overflow-hidden hover:scale-[1.02] hover:-translate-y-1"
                    >
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          {/* Checkbox */}
                          <div className="flex-shrink-0 pt-1">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(item._id)}
                              onChange={() => handleSelectItem(item._id)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>

                          {/* Article Image */}
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              {item.details?.postId?.imageCloudUrl ? (
                                <img
                                  src={
                                    item.details.postId.imageCloudUrl ||
                                    "/placeholder.svg"
                                  }
                                  alt={item.details?.postId?.title}
                                  className="w-full h-full object-cover rounded-2xl"
                                />
                              ) : (
                                <BookOpen className="h-10 w-10 text-blue-600" />
                              )}
                            </div>
                          </div>

                          {/* Article Content */}
                          <div
                            className="flex-1 min-w-0 cursor-pointer"
                            onClick={() => handleItemClick(item)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                                  {item.details?.postId?.title ||
                                    "Bài viết không tồn tại"}
                                </h3>

                                <div className="mt-3 flex items-center space-x-6 text-sm text-gray-500">
                                  <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{formatTimeAgo(item.timestamp)}</span>
                                  </div>

                                  {item.details?.postId?.author && (
                                    <div className="flex items-center space-x-2">
                                      {item.details.postId.author.profilePicture ? (
                                        <img
                                          src={item.details.postId.author.profilePicture}
                                          alt={item.details.postId.author.name || "Author"}
                                          className="h-6 w-6 rounded-full object-cover"
                                        />
                                      ) : (
                                        <User className="h-4 w-4" />
                                      )}
                                      <span>
                                        {item.details.postId.author.name ||
                                          "Unknown Author"}
                                      </span>
                                    </div>
                                  )}

                                  <div className="flex items-center space-x-4">
                                    {item.details?.postId?.likeCnt && (
                                      <div className="flex items-center space-x-1">
                                        <Heart className="h-4 w-4 text-red-500" />
                                        <span>
                                          {item.details.postId.likeCnt}
                                        </span>
                                      </div>
                                    )}

                                    {item.details?.postId?.commentCnt && (
                                      <div className="flex items-center space-x-1">
                                        <MessageSquare className="h-4 w-4 text-blue-500" />
                                        <span>
                                          {item.details.postId.commentCnt}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {item.details?.postId?.content && (
                                  <p className="mt-3 text-gray-600 line-clamp-2 leading-relaxed">
                                    {item.details.postId.content.substring(
                                      0,
                                      150
                                    )}
                                    ...
                                  </p>
                                )}
                              </div>

                              {/* Action Button */}
                              <div className="flex-shrink-0 ml-4">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleItemClick(item);
                                  }}
                                  className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 group-hover:translate-x-1"
                                >
                                  <ExternalLink className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-16 text-center border border-white/50">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-8 shadow-lg">
              <BookOpen className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              No History Found
            </h3>
            <p className="text-gray-600 mb-10 max-w-md mx-auto text-lg leading-relaxed">
              {searchTerm || filterPeriod !== "all"
                ? "No articles match your current filters. Try adjusting your search or filter criteria."
                : "You haven't read any articles yet. Start exploring to build your reading history!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(searchTerm || filterPeriod !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterPeriod("all");
                  }}
                  className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-2xl hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Clear Filters
                </button>
              )}
              <button
                onClick={() => (window.location.href = "/")}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Start Reading
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/50">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Delete History Items
              </h3>
              <p className="text-gray-600 mb-8">
                Are you sure you want to delete {selectedItems.length} selected
                items? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-2xl hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-3 bg-red-500 text-black font-semibold rounded-2xl hover:bg-red-600 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
