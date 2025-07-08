/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_CCKAbskl.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_Bw3BlwzH.mjs';
export { renderers } from '../renderers.mjs';

const $$Bookmarks = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Bookmarks" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SavedBlogsPage", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "D:/TMA-intern/TechPeople-blog/astro-blog/src/components/Bookmark/SavedBlogsPage.jsx", "client:component-export": "default" })} ` })}`;
}, "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/bookmarks.astro", void 0);

const $$file = "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/bookmarks.astro";
const $$url = "/bookmarks";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Bookmarks,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
