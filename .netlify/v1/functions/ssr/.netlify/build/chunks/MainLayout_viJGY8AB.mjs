import { c as createComponent, m as maybeRenderHead, a as renderTemplate, d as createAstro, f as renderScript, e as addAttribute, r as renderComponent, g as renderSlot, b as renderHead } from './astro/server_DsJb3smy.mjs';
import 'kleur/colors';
import { $ as $$Navbar } from './Navbar_B8J0lO3Q.mjs';
import 'clsx';
import { g as getCollection } from './_astro_content_CbpqLP-O.mjs';
/* empty css                         */

const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const allBlogArticles = await getCollection("blog");
  const tags = allBlogArticles.flatMap(
    (article) => article.data.tags
  );
  [...new Set(tags)];
  return renderTemplate`${maybeRenderHead()}<footer class="bg-indigo-900 text-white"> <div class="container mx-auto mt-10 max-w-screen-xl px-8"> <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"> <div class="mt-10"> <h3 class="text-xl font-semibold mb-4">About</h3> <p class="text-white text-sm">
TechPeople is a blog for tech enthusiasts. We publish articles,
          stories and tutorials about the latest technology trends and
          advancements.
</p> </div> <div class="mt-10"> <h3 class="text-xl font-semibold mb-4">Contact</h3> <ul class="text-white text-sm"> <li class="mb-2"> <a href="mailto:contact@techpeople.com">Email</a> </li> <li class="mb-2"> <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">Twitter</a> </li> <li class="mb-2"> <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">Facebook</a> </li> </ul> </div> </div> </div> </footer>`;
}, "D:/TMA-intern/TechPeople-blog/astro-blog/src/components/Layout/Footer.astro", void 0);

const $$Astro$1 = createAstro();
const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const currentPath = Astro2.url.pathname;
  const navigationItems = [
    {
      href: "/history",
      label: "History",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      description: "Your reading history",
      badge: null
    },
    {
      href: "/tags",
      label: "All Tags",
      icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
      description: "Browse by topics",
      badge: "120+"
    },
    {
      href: "/popularblog",
      label: "Popular Blog",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      description: "Trending articles",
      badge: "Hot"
    },
    {
      href: "/authors",
      label: "All Authors",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      description: "Discover writers",
      badge: "500+"
    },
    {
      href: "/articles",
      label: "All Articles",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      description: "Complete collection",
      badge: "1.2K+"
    }
  ];
  const quickActions = [
    {
      href: "/bookmarks",
      label: "Bookmarks",
      icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
      count: "24"
    },
    {
      href: "/drafts",
      label: "Drafts",
      icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
      count: "3"
    },
    {
      href: "/following",
      label: "Following",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      count: "42"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<aside class="sticky top-0 h-screen" data-astro-cid-ifs2dte6> <!-- Main Sidebar Container --> <div class="h-full bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-xl" data-astro-cid-ifs2dte6> <!-- Decorative Background Elements --> <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/10 to-purple-600/10 rounded-full blur-3xl opacity-60" data-astro-cid-ifs2dte6></div> <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-400/10 to-cyan-500/10 rounded-full blur-2xl opacity-60" data-astro-cid-ifs2dte6></div> <div class="relative z-10 h-full flex flex-col p-6" data-astro-cid-ifs2dte6> <!-- Header Section --> <div class="mb-8" data-astro-cid-ifs2dte6> <div class="flex items-center space-x-3 mb-2" data-astro-cid-ifs2dte6> <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg" data-astro-cid-ifs2dte6> <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ifs2dte6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-astro-cid-ifs2dte6></path> </svg> </div> <div data-astro-cid-ifs2dte6> <h2 class="text-lg font-bold text-gray-900" data-astro-cid-ifs2dte6>TechPeople</h2> <p class="text-xs text-gray-500" data-astro-cid-ifs2dte6>Explore content</p> </div> </div> </div> <!-- Main Navigation --> <nav class="flex-1 space-y-2" data-astro-cid-ifs2dte6> <div class="mb-6" data-astro-cid-ifs2dte6> <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3" data-astro-cid-ifs2dte6>Main Menu</h3> <ul class="space-y-1" data-astro-cid-ifs2dte6> ${navigationItems.map((item) => renderTemplate`<li data-astro-cid-ifs2dte6> <a${addAttribute(item.href, "href")}${addAttribute(`group relative flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md hover:scale-[1.02] ${currentPath === item.href ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-700 hover:text-gray-900"}`, "class")} data-astro-cid-ifs2dte6>  <div${addAttribute(`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${currentPath === item.href ? "opacity-100" : ""}`, "class")} style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));" data-astro-cid-ifs2dte6></div>  <div${addAttribute(`relative flex-shrink-0 w-6 h-6 mr-4 transition-transform duration-300 group-hover:scale-110 ${currentPath === item.href ? "text-white" : "text-gray-500 group-hover:text-blue-600"}`, "class")} data-astro-cid-ifs2dte6> <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full" data-astro-cid-ifs2dte6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${addAttribute(item.icon, "d")} data-astro-cid-ifs2dte6></path> </svg> </div>  <div class="relative flex-1 min-w-0" data-astro-cid-ifs2dte6> <div class="flex items-center justify-between" data-astro-cid-ifs2dte6> <div data-astro-cid-ifs2dte6> <p${addAttribute(`font-semibold text-sm truncate ${currentPath === item.href ? "text-white" : "text-gray-900 group-hover:text-gray-900"}`, "class")} data-astro-cid-ifs2dte6> ${item.label} </p> <p${addAttribute(`text-xs truncate mt-0.5 ${currentPath === item.href ? "text-blue-100" : "text-gray-500 group-hover:text-gray-600"}`, "class")} data-astro-cid-ifs2dte6> ${item.description} </p> </div>  ${item.badge && renderTemplate`<span${addAttribute(`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ml-2 ${currentPath === item.href ? "bg-white/20 text-white" : item.badge === "Hot" ? "bg-red-100 text-red-700 group-hover:bg-red-200" : "bg-blue-100 text-blue-700 group-hover:bg-blue-200"}`, "class")} data-astro-cid-ifs2dte6> ${item.badge} </span>`} </div> </div>  ${currentPath === item.href && renderTemplate`<div class="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg animate-pulse" data-astro-cid-ifs2dte6></div>`} </a> </li>`)} </ul> </div> <!-- Quick Actions Section --> <div class="pt-6 border-t border-gray-200/50" data-astro-cid-ifs2dte6> <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3" data-astro-cid-ifs2dte6>Quick Actions</h3> <ul class="space-y-1" data-astro-cid-ifs2dte6> ${quickActions.map((action) => renderTemplate`<li data-astro-cid-ifs2dte6> <a${addAttribute(action.href, "href")} class="group flex items-center justify-between px-4 py-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.01]" data-astro-cid-ifs2dte6> <div class="flex items-center space-x-3" data-astro-cid-ifs2dte6> <div class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" data-astro-cid-ifs2dte6> <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full" data-astro-cid-ifs2dte6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${addAttribute(action.icon, "d")} data-astro-cid-ifs2dte6></path> </svg> </div> <span class="text-sm font-medium" data-astro-cid-ifs2dte6>${action.label}</span> </div> <span class="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-gray-500 bg-gray-100 rounded-full group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors duration-200" data-astro-cid-ifs2dte6> ${action.count} </span> </a> </li>`)} </ul> </div> </nav> <!-- Bottom Section --> <div class="mt-auto pt-6 border-t border-gray-200/50" data-astro-cid-ifs2dte6> <!-- Stats Card --> <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-4 border border-blue-100/50" data-astro-cid-ifs2dte6> <div class="flex items-center space-x-3" data-astro-cid-ifs2dte6> <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center" data-astro-cid-ifs2dte6> <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ifs2dte6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-astro-cid-ifs2dte6></path> </svg> </div> <div data-astro-cid-ifs2dte6> <p class="text-sm font-bold text-gray-900" data-astro-cid-ifs2dte6>Reading Stats</p> <p class="text-xs text-gray-600" data-astro-cid-ifs2dte6>47 articles this month</p> </div> </div> <div class="mt-3 flex items-center justify-between text-xs" data-astro-cid-ifs2dte6> <span class="text-gray-600" data-astro-cid-ifs2dte6>Progress</span> <span class="font-semibold text-blue-600" data-astro-cid-ifs2dte6>78%</span> </div> <div class="mt-1 w-full bg-gray-200 rounded-full h-2" data-astro-cid-ifs2dte6> <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500" style="width: 78%" data-astro-cid-ifs2dte6></div> </div> </div> <!-- Help Button --> <button class="w-full flex items-center justify-center px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-[1.01] group" data-astro-cid-ifs2dte6> <svg class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ifs2dte6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-ifs2dte6></path> </svg> <span class="text-sm font-medium" data-astro-cid-ifs2dte6>Help & Support</span> </button> </div> </div> </div> <!-- Mobile Overlay (for responsive design) --> <div class="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 opacity-0 pointer-events-none transition-opacity duration-300" id="sidebar-overlay" data-astro-cid-ifs2dte6></div> </aside>  ${renderScript($$result, "D:/TMA-intern/TechPeople-blog/astro-blog/src/components/Layout/Sidebar.astro?astro&type=script&index=0&lang.ts")} `;
}, "D:/TMA-intern/TechPeople-blog/astro-blog/src/components/Layout/Sidebar.astro", void 0);

const SITE_TITLE = "TechPeople Blog";
const SITE_DESCRIPTION = "Articles, stories and tutorials from Tech People";

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title = "Articles, Stories & Tutorials For Tech People" } = Astro2.props;
  const pageTitle = `${SITE_TITLE} - ${title}`;
  return renderTemplate(_b || (_b = __template(['<html lang="en" class="scroll-smooth"> <head><!-- HEAD gi\u1EEF nguy\xEAn nh\u01B0 b\u1EA1n \u0111\xE3 vi\u1EBFt --><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', '</title><meta name="description"', `><meta name="theme-color" content="#ffffff"><link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/styles/main.css" as="style"><link rel="preconnect" href="https://cdnjs.cloudflare.com"><link rel="stylesheet" href="/styles/main.css"><link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"><script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js" integrity="sha512-BJ/5sR2hFxQTKin/55JQCcMTObShDBAmVjL/3NR/MVcrhyOazJjAgvROem03+HYyGw16SVdSfoWCFGr9syxAKA==" crossorigin="anonymous" referrerpolicy="no-referrer" defer><\/script><link rel="manifest" href="/manifest.json"><style>
      :root {
        --color-primary: #2563eb;
        --color-text: #1f2937;
      }

      html, body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Inter', sans-serif;
        color: var(--color-text);
        line-height: 1.6;
        background: linear-gradient(to bottom right, #f8fafc, #ffffff, #eff6ff);
        min-height: 100vh;
      }

      *, *::before, *::after {
        box-sizing: inherit;
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: 'Inter', sans-serif;
      }

      .container {
        width: 100%;
        max-width: 1280px;
        margin-left: auto;
        margin-right: auto;
      }
    </style>`, '</head> <body class="flex flex-col min-h-screen relative overflow-x-hidden"> <!-- Gradient background --> <div class="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div> <!-- Navbar --> ', ' <!-- Layout content --> <div class="flex flex-grow"> <!-- Sidebar --> ', ' <!-- Main content --> <main class="flex-grow px-4 sm:px-6 lg:px-8 py-8"> ', " </main> </div> <!-- Footer --> ", " <!-- Toast container (optional) --> ", ` <script src="/scripts/main.js" defer><\/script> <script>
      if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
          img.loading = 'lazy';
        });
      }
    <\/script> </body> </html>`])), pageTitle, addAttribute(SITE_DESCRIPTION, "content"), renderHead(), renderComponent($$result, "Navbar", $$Navbar, {}), renderComponent($$result, "Sidebar", $$Sidebar, { "class": "w-64 hidden md:block" }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), Astro2.props.needToast && renderTemplate(_a || (_a = __template(["<script>\n        if (typeof window !== 'undefined') {\n          import('react-toastify/dist/ReactToastify.css');\n        }\n      <\/script>"]))));
}, "D:/TMA-intern/TechPeople-blog/astro-blog/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
