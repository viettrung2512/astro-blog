import React, { createElement } from 'react';
import ReactDOM from 'react-dom/server.js';

const StaticHtml = ({
  value,
  name,
  hydrate = true
}) => {
  if (!value) return null;
  const tagName = hydrate ? "astro-slot" : "astro-static-slot";
  return createElement(tagName, {
    name,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: value }
  });
};
StaticHtml.shouldComponentUpdate = () => false;
var static_html_default = StaticHtml;

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
const reactTypeof = Symbol.for("react.element");
function check(Component, props, children) {
  if (typeof Component === "object") {
    return Component["$$typeof"]?.toString().slice("Symbol(".length).startsWith("react");
  }
  if (typeof Component !== "function") return false;
  if (Component.name === "QwikComponent") return false;
  if (Component.prototype != null && typeof Component.prototype.render === "function") {
    return React.Component.isPrototypeOf(Component) || React.PureComponent.isPrototypeOf(Component);
  }
  let isReactComponent = false;
  function Tester(...args) {
    try {
      const vnode = Component(...args);
      if (vnode && vnode["$$typeof"] === reactTypeof) {
        isReactComponent = true;
      }
    } catch {
    }
    return React.createElement("div");
  }
  renderToStaticMarkup(Tester, props, children, {});
  return isReactComponent;
}
async function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
  delete props["class"];
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = React.createElement(static_html_default, { value, name });
  }
  const newProps = {
    ...props,
    ...slots
  };
  const newChildren = children ?? props.children;
  if (newChildren != null) {
    newProps.children = React.createElement(static_html_default, {
      // Adjust how this is hydrated only when the version of Astro supports `astroStaticSlot`
      hydrate: metadata?.astroStaticSlot ? !!metadata.hydrate : true,
      value: newChildren
    });
  }
  const vnode = React.createElement(Component, newProps);
  let html;
  if (metadata?.hydrate) {
    html = ReactDOM.renderToString(vnode);
  } else {
    html = ReactDOM.renderToStaticMarkup(vnode);
  }
  return { html };
}
const renderer = {
  name: "@astrojs/react",
  check,
  renderToStaticMarkup,
  supportsAstroStaticSlot: true
};
var server_v17_default = renderer;

const renderers = [Object.assign({"name":"@astrojs/react","clientEntrypoint":"@astrojs/react/client-v17.js","serverEntrypoint":"@astrojs/react/server-v17.js"}, { ssr: server_v17_default }),];

export { renderers };
