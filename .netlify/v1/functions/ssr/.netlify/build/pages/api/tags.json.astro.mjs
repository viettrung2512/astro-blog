export { renderers } from '../../renderers.mjs';

async function GET() {
  const token = undefined                     ;
  try {
    const res = await fetch(`http://localhost:8080/api/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    const categorySet = /* @__PURE__ */ new Set();
    data.content.forEach((blog) => {
      if (blog.category) categorySet.add(blog.category);
      if (blog.tags) blog.tags.forEach((tag) => categorySet.add(tag));
    });
    return new Response(JSON.stringify([...categorySet]), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
