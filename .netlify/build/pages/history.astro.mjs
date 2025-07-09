/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DsJb3smy.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_viJGY8AB.mjs';
import { jsx, jsxs } from 'react/jsx-runtime.js';
import { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw, HistoryIcon, BookOpen, Clock, Trash2, Calendar, User, Heart, MessageSquare, ExternalLink, RotateCcw } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const LoadingSpinner = () => {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-40", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" }) });
};

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
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          const data2 = await response.text();
          console.error("Error Response:", data2);
          throw new Error(data2 || "Lỗi khi tải lịch sử.");
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
  useEffect(() => {
    let filtered = [...history];
    if (searchTerm) {
      filtered = filtered.filter(
        (item) => item.details?.postId?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterPeriod !== "all") {
      const now = /* @__PURE__ */ new Date();
      const filterDate = /* @__PURE__ */ new Date();
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
      }
      filtered = filtered.filter(
        (item) => new Date(item.timestamp) >= filterDate
      );
    }
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
    setSelectedItems(
      (prev) => prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
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
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ids: selectedItems })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Xóa lịch sử thất bại.");
      }
      setHistory(
        (prev) => prev.filter((item) => !selectedItems.includes(item._id))
      );
      setSelectedItems([]);
      setShowDeleteConfirm(false);
    } catch (err) {
      setError(err.message);
      setShowDeleteConfirm(false);
    }
  };
  const formatTimeAgo = (timestamp) => {
    const now = /* @__PURE__ */ new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1e3);
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
    return /* @__PURE__ */ jsx(LoadingSpinner, {});
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-md border border-white/50", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(AlertCircle, { className: "h-10 w-10 text-red-500" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Oops! Something went wrong" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-8 leading-relaxed", children: error }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => window.location.reload(),
          className: "inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105",
          children: [
            /* @__PURE__ */ jsx(RefreshCw, { className: "h-5 w-5 mr-2" }),
            "Try Again"
          ]
        }
      )
    ] }) });
  }
  const groupedHistory = groupHistoryByDate(filteredHistory);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 -z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse",
          style: { animationDelay: "-1s" }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse",
          style: { animationDelay: "-2s" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8 relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-12", children: /* @__PURE__ */ jsx("div", { className: "bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx(HistoryIcon, { className: "h-8 w-8 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent", children: "Reading History" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-600 mt-1", children: [
              filteredHistory.length,
              " articles • Last updated",
              " ",
              (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "h-6 w-6 text-blue-600" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-blue-900", children: history.length }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-600", children: "Total Read" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-6 w-6 text-purple-600" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-purple-900", children: filterPeriod === "today" ? groupedHistory[(/* @__PURE__ */ new Date()).toDateString()]?.length || 0 : "∞" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-purple-600", children: "Today" })
            ] })
          ] }) })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search articles...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: filterPeriod,
                onChange: (e) => setFilterPeriod(e.target.value),
                className: "px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "all", children: "All Time" }),
                  /* @__PURE__ */ jsx("option", { value: "today", children: "Today" }),
                  /* @__PURE__ */ jsx("option", { value: "week", children: "This Week" }),
                  /* @__PURE__ */ jsx("option", { value: "month", children: "This Month" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: sortOrder,
                onChange: (e) => setSortOrder(e.target.value),
                className: "px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "newest", children: "Newest First" }),
                  /* @__PURE__ */ jsx("option", { value: "oldest", children: "Oldest First" })
                ]
              }
            ),
            selectedItems.length > 0 && /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleDeleteSelected,
                className: "px-4 py-3 bg-red-500 text-black rounded-2xl hover:bg-red-600 transition-colors duration-200 flex items-center space-x-2",
                children: [
                  /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Delete (",
                    selectedItems.length,
                    ")"
                  ] })
                ]
              }
            )
          ] })
        ] }),
        filteredHistory.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t border-gray-200 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-3 cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: selectedItems.length === filteredHistory.length,
                onChange: handleSelectAll,
                className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-600", children: [
              "Select all (",
              filteredHistory.length,
              " items)"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: selectedItems.length > 0 && `${selectedItems.length} selected` })
        ] })
      ] }) }),
      filteredHistory.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-8", children: Object.entries(groupedHistory).map(([date, items]) => /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white/80 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-lg border border-white/50", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5 text-blue-600" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            }) }),
            /* @__PURE__ */ jsxs("span", { className: "px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium", children: [
              items.length,
              " articles"
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: items.map((item, index) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "group bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl border border-white/50 hover:border-blue-200 transition-all duration-500 overflow-hidden hover:scale-[1.02] hover:-translate-y-1",
            children: /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 pt-1", children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: selectedItems.includes(item._id),
                  onChange: () => handleSelectItem(item._id),
                  className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500",
                  onClick: (e) => e.stopPropagation()
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300", children: item.details?.postId?.imageCloudUrl ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: item.details.postId.imageCloudUrl || "/placeholder.svg",
                  alt: item.details?.postId?.title,
                  className: "w-full h-full object-cover rounded-2xl"
                }
              ) : /* @__PURE__ */ jsx(BookOpen, { className: "h-10 w-10 text-blue-600" }) }) }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "flex-1 min-w-0 cursor-pointer",
                  onClick: () => handleItemClick(item),
                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight", children: item.details?.postId?.title || "Bài viết không tồn tại" }),
                      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center space-x-6 text-sm text-gray-500", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                          /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
                          /* @__PURE__ */ jsx("span", { children: formatTimeAgo(item.timestamp) })
                        ] }),
                        item.details?.postId?.author && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                          item.details.postId.author.profilePicture ? /* @__PURE__ */ jsx(
                            "img",
                            {
                              src: item.details.postId.author.profilePicture,
                              alt: item.details.postId.author.name || "Author",
                              className: "h-6 w-6 rounded-full object-cover"
                            }
                          ) : /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
                          /* @__PURE__ */ jsx("span", { children: item.details.postId.author.name || "Unknown Author" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
                          item.details?.postId?.likeCnt && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                            /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4 text-red-500" }),
                            /* @__PURE__ */ jsx("span", { children: item.details.postId.likeCnt })
                          ] }),
                          item.details?.postId?.commentCnt && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                            /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4 text-blue-500" }),
                            /* @__PURE__ */ jsx("span", { children: item.details.postId.commentCnt })
                          ] })
                        ] })
                      ] }),
                      item.details?.postId?.content && /* @__PURE__ */ jsxs("p", { className: "mt-3 text-gray-600 line-clamp-2 leading-relaxed", children: [
                        item.details.postId.content.substring(
                          0,
                          150
                        ),
                        "..."
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 ml-4", children: /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: (e) => {
                          e.stopPropagation();
                          handleItemClick(item);
                        },
                        className: "p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 group-hover:translate-x-1",
                        children: /* @__PURE__ */ jsx(ExternalLink, { className: "h-5 w-5" })
                      }
                    ) })
                  ] })
                }
              )
            ] }) })
          },
          item._id || index
        )) })
      ] }, date)) }) : /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-16 text-center border border-white/50", children: [
        /* @__PURE__ */ jsx("div", { className: "w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-8 shadow-lg", children: /* @__PURE__ */ jsx(BookOpen, { className: "h-16 w-16 text-gray-400" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-gray-800 mb-4", children: "No History Found" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-10 max-w-md mx-auto text-lg leading-relaxed", children: searchTerm || filterPeriod !== "all" ? "No articles match your current filters. Try adjusting your search or filter criteria." : "You haven't read any articles yet. Start exploring to build your reading history!" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
          (searchTerm || filterPeriod !== "all") && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setSearchTerm("");
                setFilterPeriod("all");
              },
              className: "inline-flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-2xl hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105",
              children: [
                /* @__PURE__ */ jsx(RotateCcw, { className: "h-5 w-5 mr-2" }),
                "Clear Filters"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => window.location.href = "/",
              className: "inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105",
              children: [
                /* @__PURE__ */ jsx(BookOpen, { className: "h-5 w-5 mr-2" }),
                "Start Reading"
              ]
            }
          )
        ] })
      ] })
    ] }),
    showDeleteConfirm && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsx("div", { className: "bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(Trash2, { className: "h-8 w-8 text-red-500" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Delete History Items" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-600 mb-8", children: [
        "Are you sure you want to delete ",
        selectedItems.length,
        " selected items? This action cannot be undone."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowDeleteConfirm(false),
            className: "flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-2xl hover:bg-gray-300 transition-colors duration-200",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: confirmDelete,
            className: "flex-1 px-6 py-3 bg-red-500 text-black font-semibold rounded-2xl hover:bg-red-600 transition-colors duration-200",
            children: "Delete"
          }
        )
      ] })
    ] }) }) })
  ] });
};

const $$History = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Viewing History" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HistoryPage", HistoryPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/TMA-intern/TechPeople-blog/astro-blog/src/components/History/HistoryPage.jsx", "client:component-export": "default" })} ` })}`;
}, "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/history.astro", void 0);

const $$file = "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/history.astro";
const $$url = "/history";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$History,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
