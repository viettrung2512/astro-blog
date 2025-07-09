/* empty css                                    */
import { c as createComponent, d as createAstro, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_DsJb3smy.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../../chunks/MainLayout_viJGY8AB.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Blog detail" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BlogContent", null, { "client:only": "react", "blogId": id, "client:component-hydration": "only", "client:component-path": "D:/TMA-intern/TechPeople-blog/astro-blog/src/components/Blog/BlogContent.jsx", "client:component-export": "default" })} ` })}`;
}, "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/articles/[id].astro", void 0);

const $$file = "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/articles/[id].astro";
const $$url = "/articles/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
