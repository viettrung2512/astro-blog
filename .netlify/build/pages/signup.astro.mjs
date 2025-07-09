/* empty css                                 */
import { c as createComponent, b as renderHead, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DsJb3smy.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime.js';
import { useState } from 'react';
import { $ as $$Navbar } from '../chunks/Navbar_B8J0lO3Q.mjs';
export { renderers } from '../renderers.mjs';

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, username, password })
      });
      const data = await res.json();
      console.log("Res:", res.status, "Data:", data);
      if (res.ok) {
        setMessage(data.message);
        setError("");
      } else {
        setError(data.message || "Registration failed");
        setMessage("");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Registration failed (server connection)");
      setMessage("");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-center text-3xl font-extrabold text-gray-900 mb-2", children: "Register Account" }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-gray-600", children: "Create an account to start experiencing" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: /* @__PURE__ */ jsxs("div", { className: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10", children: [
      /* @__PURE__ */ jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700", children: "Full Name" }),
          /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(
            "input",
            {
              id: "name",
              value: name,
              onChange: (e) => setName(e.target.value),
              required: true,
              className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email" }),
          /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(
            "input",
            {
              id: "email",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              required: true,
              className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700", children: "Username" }),
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
          /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }),
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
            className: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
            children: "Register"
          }
        ) })
      ] }),
      message && /* @__PURE__ */ jsx("div", { className: "mt-4 p-3 bg-green-50 border border-green-200 rounded-md", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-green-700 text-center", children: message }) }),
      error && /* @__PURE__ */ jsx("div", { className: "mt-4 p-3 bg-red-50 border border-red-200 rounded-md", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-red-700 text-center", children: error }) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-6 text-sm text-center text-gray-600", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/login",
            className: "text-blue-500 hover:text-blue-700 hover:underline",
            children: "Login"
          }
        )
      ] })
    ] }) })
  ] });
};

const $$Signup = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><title>Sign In</title>${renderHead()}</head> <body> ${renderComponent($$result, "Navbar", $$Navbar, {})} ${renderComponent($$result, "RegisterForm", RegisterForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/TMA-intern/TechPeople-blog/astro-blog/src/components/Auth/RegisterForm.jsx", "client:component-export": "default" })} </body></html>`;
}, "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/signup.astro", void 0);

const $$file = "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/signup.astro";
const $$url = "/signup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Signup,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
