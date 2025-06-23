import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Đăng nhập thành công!");
        setError("");
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        window.location.href = "/";
      } else {
        setError(data.message || "Đăng nhập thất bại");
        setMessage("");
      }
    } catch (err) {
      setError("Không thể kết nối đến máy chủ");
      setMessage("");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const response = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google login failed!");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username || "");
      window.location.href = "/";
    } catch (err) {
      console.error("Lỗi đăng nhập Google:", err);
      setError(err.message || "Đăng nhập bằng Google thất bại");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-2">Đăng nhập</h1>
        <p className="text-center text-sm text-gray-600">Chào mừng bạn quay lại</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
              <div className="mt-1">
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Đăng nhập
              </button>
            </div>

            <div>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Đăng nhập Google thất bại")}
              />
            </div>
          </form>

          {message && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-700 text-center">{message}</p>
            </div>
          )}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700 text-center">{error}</p>
            </div>
          )}

          <p className="mt-6 text-sm text-center text-gray-600">
            Chưa có tài khoản?{" "}
            <a href="/signup" className="text-blue-500 hover:text-blue-700 hover:underline">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
