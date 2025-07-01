export async function GET() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = import.meta.env.TOKEN;

  try {
    const res = await fetch(`${API_BASE_URL}/api/posts`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    const categorySet = new Set<string>();

    data.content.forEach((blog: any) => {
      if (blog.category) categorySet.add(blog.category);
      if (blog.tags) blog.tags.forEach((tag: string) => categorySet.add(tag));
    });

    return new Response(JSON.stringify([...categorySet]), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // ✅ Trả về mảng rỗng thay vì object lỗi
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
