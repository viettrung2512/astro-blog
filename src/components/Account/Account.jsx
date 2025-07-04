"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import {
  X,
  Camera,
  Save,
  ArrowLeft,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Shield,
  Settings,
  CheckCircle,
  AlertCircle,
  Edit3,
} from "lucide-react"

const AccountDetailPage = () => {
  const [user, setUser] = useState({
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "",
    email: "",
    password: "",
  })
  const [editedUser, setEditedUser] = useState({ ...user })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [activeTab, setActiveTab] = useState("profile")

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"

  useEffect(() => {
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")
    const profilePicture = localStorage.getItem("profilePicture")

    if (!token) {
      toast.error("You need to log in to view account information.")
      window.location.href = "/login"
      return
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          const userData = {
            avatar: data.profilePicture || profilePicture || user.avatar,
            name: data.name || username || "",
            email: data.email || "",
            password: "",
          }
          setUser(userData)
          setEditedUser(userData)
        } else {
          const errorData = await response.json()
          toast.error(`Error: ${errorData.message}`)
        }
      } catch (error) {
        console.error("Error loading user information:", error)
        toast.error("Failed to load user information. Please try again.")
      }
    }

    fetchUserData()
  }, [])

  // Check for changes
  useEffect(() => {
    const changes =
      editedUser.name !== user.name ||
      editedUser.email !== user.email ||
      editedUser.avatar !== user.avatar ||
      editedUser.password !== ""
    setHasChanges(changes)
  }, [editedUser, user])

  const validateField = (name, value) => {
    const errors = { ...validationErrors }

    switch (name) {
      case "name":
        if (!value.trim()) {
          errors.name = "Name is required"
        } else if (value.length < 2) {
          errors.name = "Name must be at least 2 characters"
        } else {
          delete errors.name
        }
        break
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value.trim()) {
          errors.email = "Email is required"
        } else if (!emailRegex.test(value)) {
          errors.email = "Please enter a valid email address"
        } else {
          delete errors.email
        }
        break
      case "password":
        if (value && value.length < 8) {
          errors.password = "Password must be at least 8 characters"
        } else {
          delete errors.password
        }
        break
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target

    if (name === "avatar" && files.length > 0) {
      const file = files[0]
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB")
        return
      }

      setUploadingAvatar(true)
      const reader = new FileReader()
      reader.onload = () => {
        setEditedUser({ ...editedUser, avatar: reader.result })
        setUploadingAvatar(false)
      }
      reader.readAsDataURL(file)
    } else {
      setEditedUser({ ...editedUser, [name]: value })
      validateField(name, value)
    }
  }

  const handleSaveChanges = async () => {
    // Validate all fields
    const isNameValid = validateField("name", editedUser.name)
    const isEmailValid = validateField("email", editedUser.email)
    const isPasswordValid = validateField("password", editedUser.password)

    if (!isNameValid || !isEmailValid || !isPasswordValid) {
      toast.error("Please fix the validation errors")
      return
    }

    setLoading(true)
    const updatedUserInfo = {
      name: editedUser.name,
      email: editedUser.email,
      profilePicture: editedUser.avatar,
    }

    if (editedUser.password) {
      updatedUserInfo.password = editedUser.password
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserInfo),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        setUser({ ...updatedUser })
        localStorage.setItem("username", updatedUser.name)
        localStorage.setItem("profilePicture", updatedUser.profilePicture)
        localStorage.setItem("email", updatedUser.email)
        toast.success("Account updated successfully!")
        setTimeout(() => {
          window.location.href = "/"
        }, 1500)
      } else {
        const errorData = await response.json()
        toast.error(`Error: ${errorData.message}`)
      }
    } catch (error) {
      console.error("Error updating user info:", error)
      toast.error("Failed to update account. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoHome = () => {
    if (hasChanges) {
      if (confirm("You have unsaved changes. Are you sure you want to leave?")) {
        window.location.href = "/"
      }
    } else {
      window.location.href = "/"
    }
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "-1s" }}
        ></div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-8 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-8 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-12 w-1 h-1 bg-white rounded-full animate-bounce"></div>
              <div
                className="absolute bottom-6 left-12 w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                style={{ animationDelay: "-0.5s" }}
              ></div>
            </div>

            <div className="flex justify-between items-center relative z-10">
              <button
                onClick={handleGoHome}
                className="text-white hover:bg-white/20 transition-all duration-300 p-3 rounded-2xl hover:scale-110"
                aria-label="Go back"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>

              <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
                <p className="text-blue-100">Manage your profile and preferences</p>
              </div>

              <button
                onClick={handleGoHome}
                className="text-white hover:bg-white/20 transition-all duration-300 p-3 rounded-2xl hover:scale-110"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Enhanced Avatar Section */}
            <div className="flex justify-center mt-8">
              <div className="relative group">
                {/* Avatar Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/10 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 scale-110"></div>

                {/* Main Avatar */}
                <div className="relative w-32 h-32 rounded-full border-6 border-white/50 overflow-hidden bg-white shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={editedUser.avatar || "/placeholder.svg"}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                  {uploadingAvatar && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>

                {/* Enhanced Upload Button */}
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-xl hover:scale-110 hover:-translate-y-1 group"
                >
                  <Camera className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <input
                    id="avatar-upload"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                </label>

                {/* Status Indicator */}
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mt-6">
              <h2 className="text-2xl font-bold text-white mb-1">{user.name || "User Name"}</h2>
              <p className="text-blue-100">{user.email || "user@example.com"}</p>
              {hasChanges && (
                <div className="mt-3 inline-flex items-center px-3 py-1 bg-orange-500/20 text-orange-100 rounded-full text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Unsaved changes
                </div>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50">
            <div className="flex justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-8 py-4 font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">
            {activeTab === "profile" && (
              <div className="space-y-8">
                <div className="flex items-center mb-6">
                  <Edit3 className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Edit Profile</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={editedUser.name}
                        onChange={handleInputChange}
                        className={`pl-12 w-full px-4 py-4 bg-gray-50/80 backdrop-blur-sm border-2 text-gray-900 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${
                          validationErrors.name ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="Enter your full name"
                      />
                      {!validationErrors.name && editedUser.name && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    {validationErrors.name && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {validationErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        className={`pl-12 w-full px-4 py-4 bg-gray-50/80 backdrop-blur-sm border-2 text-gray-900 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${
                          validationErrors.email ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {!validationErrors.email && editedUser.email && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {validationErrors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-8">
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Security Settings</h3>
                </div>

                <div className="space-y-6">
                  {/* Password */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                      New Password
                      <span className="text-gray-500 text-xs font-normal ml-2">(leave empty to keep current)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={editedUser.password}
                        onChange={handleInputChange}
                        className={`pl-12 pr-12 w-full px-4 py-4 bg-gray-50/80 backdrop-blur-sm border-2 text-gray-900 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${
                          validationErrors.password ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 rounded-r-2xl transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {validationErrors.password && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {validationErrors.password}
                      </p>
                    )}
                    <p className="text-gray-500 text-sm">Password should be at least 8 characters long</p>
                  </div>

                  {/* Security Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <div className="flex items-start">
                      <Shield className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Security Tips</h4>
                        <ul className="text-blue-800 text-sm space-y-1">
                          <li>• Use a strong, unique password</li>
                          <li>• Include uppercase, lowercase, numbers, and symbols</li>
                          <li>• Avoid using personal information</li>
                          <li>• Consider using a password manager</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-8">
                <div className="flex items-center mb-6">
                  <Settings className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Preferences</h3>
                </div>

                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Settings className="h-12 w-12 text-gray-400" />
                  </div>
                  <h4 className="text-2xl font-semibold text-gray-800 mb-3">Coming Soon</h4>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Preference settings will be available in a future update. Stay tuned for more customization options!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Action Buttons */}
          <div className="bg-gray-50/80 backdrop-blur-sm px-8 py-6 border-t border-gray-200/50">
            <div className="flex justify-between items-center">
              <button
                onClick={handleGoHome}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg"
              >
                Cancel
              </button>

              <div className="flex items-center space-x-4">
                {hasChanges && (
                  <div className="flex items-center text-orange-600 text-sm font-medium">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    You have unsaved changes
                  </div>
                )}

                <button
                  onClick={handleSaveChanges}
                  disabled={loading || !hasChanges || Object.keys(validationErrors).length > 0}
                  className={`px-8 py-3 font-semibold rounded-2xl transition-all duration-300 flex items-center shadow-lg ${
                    loading || !hasChanges || Object.keys(validationErrors).length > 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-3" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountDetailPage
