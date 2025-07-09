import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BZDEEDYM.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/account.astro.mjs');
const _page4 = () => import('./pages/api/search.json.astro.mjs');
const _page5 = () => import('./pages/api/tag/_tagname_.json.astro.mjs');
const _page6 = () => import('./pages/api/tags.json.astro.mjs');
const _page7 = () => import('./pages/articles/_id_.astro.mjs');
const _page8 = () => import('./pages/articles.astro.mjs');
const _page9 = () => import('./pages/bookmarks.astro.mjs');
const _page10 = () => import('./pages/history.astro.mjs');
const _page11 = () => import('./pages/login.astro.mjs');
const _page12 = () => import('./pages/new-post.astro.mjs');
const _page13 = () => import('./pages/popularblog.astro.mjs');
const _page14 = () => import('./pages/profile/_userid_.astro.mjs');
const _page15 = () => import('./pages/signup.astro.mjs');
const _page16 = () => import('./pages/tag/_tagname_.astro.mjs');
const _page17 = () => import('./pages/tags.astro.mjs');
const _page18 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/account.astro", _page3],
    ["src/pages/api/search.json.ts", _page4],
    ["src/pages/api/tag/[tagName].json.ts", _page5],
    ["src/pages/api/tags.json.ts", _page6],
    ["src/pages/articles/[id].astro", _page7],
    ["src/pages/articles/index.astro", _page8],
    ["src/pages/bookmarks.astro", _page9],
    ["src/pages/history.astro", _page10],
    ["src/pages/login.astro", _page11],
    ["src/pages/new-post.astro", _page12],
    ["src/pages/popularblog.astro", _page13],
    ["src/pages/profile/[userId].astro", _page14],
    ["src/pages/signup.astro", _page15],
    ["src/pages/tag/[tagName].astro", _page16],
    ["src/pages/tags.astro", _page17],
    ["src/pages/index.astro", _page18]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "8aebfbc3-7803-4f17-b1f4-724ca5722647"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
