/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DsJb3smy.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_viJGY8AB.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "All Articles" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mt-10"> <h1 class="text-3xl font-bold text-center mb-6">All Articles</h1> ${renderComponent($$result2, "BlogsPaginated", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "D:/TMA-intern/TechPeople-blog/astro-blog/src/components/Blog/BlogsPaginated.jsx", "client:component-export": "default" })} </div> ` })}`;
}, "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/articles/index.astro", void 0);

const $$file = "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/articles/index.astro";
const $$url = "/articles";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
