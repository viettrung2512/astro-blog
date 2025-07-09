/* empty css                                 */
import { c as createComponent, b as renderHead, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DsJb3smy.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';
import { $ as $$Navbar } from '../chunks/Navbar_B8J0lO3Q.mjs';
export { renderers } from '../renderers.mjs';

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
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Đăng nhập thành công!");
        setError("");
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("profilePicture", data.profilePicture || "");
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userRole", data.userRole);
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
          Accept: "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ token })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Google login failed!");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username || "");
      localStorage.setItem(
        "profilePicture",
        "/images/anh-avatar-bts-chibi-cute-702x580.jpg"
      );
      window.location.href = "/";
    } catch (err) {
      console.error("Lỗi đăng nhập Google:", err);
      setError(err.message || "Đăng nhập bằng Google thất bại");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-center text-3xl font-extrabold text-gray-900 mb-2", children: "Đăng nhập" }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-gray-600", children: "Chào mừng bạn quay lại" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: /* @__PURE__ */ jsxs("div", { className: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10", children: [
      /* @__PURE__ */ jsxs("form", { className: "space-y-6", onSubmit: handleLogin, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "username",
              className: "block text-sm font-medium text-gray-700",
              children: "Tên đăng nhập"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(
            "input",
            {
              id: "username",
              value: username,
              onChange: (e) => setUsername(e.target.value),
              required: true,
              className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "password",
              className: "block text-sm font-medium text-gray-700",
              children: "Mật khẩu"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(
            "input",
            {
              id: "password",
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              required: true,
              className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700",
            children: "Đăng nhập"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          GoogleLogin,
          {
            onSuccess: handleGoogleSuccess,
            onError: () => setError("Đăng nhập Google thất bại")
          }
        ) })
      ] }),
      message && /* @__PURE__ */ jsx("div", { className: "mt-4 p-3 bg-green-50 border border-green-200 rounded-md", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-green-700 text-center", children: message }) }),
      error && /* @__PURE__ */ jsx("div", { className: "mt-4 p-3 bg-red-50 border border-red-200 rounded-md", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-red-700 text-center", children: error }) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-6 text-sm text-center text-gray-600", children: [
        "Chưa có tài khoản?",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/signup",
            className: "text-blue-500 hover:text-blue-700 hover:underline",
            children: "Đăng ký ngay"
          }
        )
      ] })
    ] }) })
  ] });
};

const GoogleProviderWrapper = () => {
  return /* @__PURE__ */ jsx(GoogleOAuthProvider, { clientId: "676959420577-hjks9prgmq21oouea14iqf3heej9k0ic.apps.googleusercontent.com", children: /* @__PURE__ */ jsx(LoginForm, {}) });
};

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><title>Login</title>${renderHead()}</head> <body> ${renderComponent($$result, "Navbar", $$Navbar, {})} ${renderComponent($$result, "GoogleProviderWrapper", GoogleProviderWrapper, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/TMA-intern/TechPeople-blog/astro-blog/src/components/Auth/GoogleProviderWrapper.jsx", "client:component-export": "default" })} </body></html>`;
}, "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/login.astro", void 0);

const $$file = "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
