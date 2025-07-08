/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CCKAbskl.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_Bw3BlwzH.mjs';
export { renderers } from '../renderers.mjs';

const $$Popularblog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-1 gap-5 lg:grid-cols-2"> <div> <h1 class="text-5xl font-bold mt-4 mb-8 leading-tight xl:text-6xl">
Articles, Stories & Tutorials for Tech People
</h1> </div> </div> <div class="mt-10"> <h2 class="text-2xl font-bold text-gray-800 mb-4">Popular Blog</h2> ${renderComponent($$result2, "PopularBlog", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "D:/TMA-intern/TechPeople-blog/astro-blog/src/components/PopularBlog/PopularBlog.jsx", "client:component-export": "default" })} </div> ` })}`;
}, "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/popularblog.astro", void 0);

const $$file = "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/popularblog.astro";
const $$url = "/popularblog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Popularblog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
