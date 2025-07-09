/* empty css                                 */
import { c as createComponent, d as createAstro, r as renderComponent, b as renderHead, a as renderTemplate } from '../chunks/astro/server_DsJb3smy.mjs';
import 'kleur/colors';
import { $ as $$Navbar } from '../chunks/Navbar_B8J0lO3Q.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$NewPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NewPost;
  const token = Astro2.cookies.get("token")?.value ?? null;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "Navbar", $$Navbar, {})}<title>Create Post</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-quill@1.3.5/dist/quill.snow.css">${renderHead()}</head> <body> ${renderComponent($$result, "NewArticle", null, { "client:only": true, "token": token, "client:component-hydration": "only", "client:component-path": "D:/TMA-intern/TechPeople-blog/astro-blog/src/components/NewArticle/NewArticle.jsx", "client:component-export": "default" })} </body></html>`;
}, "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/new-post.astro", void 0);

const $$file = "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/new-post.astro";
const $$url = "/new-post";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$NewPost,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
