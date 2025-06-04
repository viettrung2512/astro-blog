import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_CstO8pep.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/404.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/search.json.astro.mjs');
const _page3 = () => import('./pages/articles/search.astro.mjs');
const _page4 = () => import('./pages/articles/tag/_---tag_.astro.mjs');
const _page5 = () => import('./pages/articles.astro.mjs');
const _page6 = () => import('./pages/articles/_---slug_.astro.mjs');
const _page7 = () => import('./pages/login.astro.mjs');
const _page8 = () => import('./pages/signup.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/404.astro", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/search.json.ts", _page2],
    ["src/pages/articles/search.astro", _page3],
    ["src/pages/articles/tag/[...tag].astro", _page4],
    ["src/pages/articles/index.astro", _page5],
    ["src/pages/articles/[...slug].astro", _page6],
    ["src/pages/login.astro", _page7],
    ["src/pages/signup.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "13707473-a868-42e7-af18-19ba2cf98d35"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
