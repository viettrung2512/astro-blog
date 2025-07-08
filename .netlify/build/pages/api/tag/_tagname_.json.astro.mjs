export { renderers } from '../../../renderers.mjs';

const GET = async ({ params }) => {
  const token = undefined                     ;
  const { tagName } = params;
  try {
    const res = await fetch(`http://localhost:8080/api/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    const filtered = data.content.filter(
      (blog) => blog.category === tagName || (blog.tags || []).includes(tagName)
    );
    return new Response(JSON.stringify(filtered), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch blogs by tag" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
