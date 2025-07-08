/* empty css                                 */
import { c as createComponent, d as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_CCKAbskl.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_Bw3BlwzH.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Tags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Tags;
  const baseURL = new URL(Astro2.request.url).origin;
  const response = await fetch(`${baseURL}/api/tags.json`);
  let tags = await response.json();
  if (!Array.isArray(tags)) {
    tags = [];
  }
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Tags Page" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-3xl font-bold my-6 text-center">Tags</h1> <div class="flex flex-wrap gap-4 justify-center px-4"> ${tags.map((tag) => renderTemplate`<a${addAttribute(`/tag/${tag}`, "href")} class="text-black px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all">
#${tag} </a>`)} </div> ` })}`;
}, "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/tags.astro", void 0);

const $$file = "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/tags.astro";
const $$url = "/tags";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Tags,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
