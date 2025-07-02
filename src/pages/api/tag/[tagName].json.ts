import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  const token = import.meta.env.TOKEN;
  const { tagName } = params;

  try {
    const res = await fetch(`http://localhost:8080/api/posts`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    const filtered = data.content.filter(
      (blog: any) => blog.category === tagName || (blog.tags || []).includes(tagName)
    );

    return new Response(JSON.stringify(filtered), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch blogs by tag' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
