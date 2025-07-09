/* empty css                                    */
import { c as createComponent, d as createAstro, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_DsJb3smy.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../../chunks/MainLayout_viJGY8AB.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$userId = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$userId;
  const { userId } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": `Profile` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProfileWrapper", null, { "client:only": "react", "userId": userId, "client:component-hydration": "only", "client:component-path": "D:/TMA-intern/TechPeople-blog/astro-blog/src/components/Account/ProfileWrapper", "client:component-export": "default" })} ` })}`;
}, "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/profile/[userId].astro", void 0);

const $$file = "D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/profile/[userId].astro";
const $$url = "/profile/[userId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$userId,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
