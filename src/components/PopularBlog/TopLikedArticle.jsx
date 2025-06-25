import { useEffect, useState } from "react";

const TopLikedArticle = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopLiked = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/posts/most-liked");
        const data = await response.json();
        const list = Array.isArray(data) ? data : data.content || [];

        if (list.length > 0) {
          const top = list.sort((a, b) => b.likeCount - a.likeCount)[0];
          setArticle(top);
        }
      } catch (err) {
        console.error("Lỗi khi lấy bài viết nổi bật:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopLiked();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!article) return <p>Không có bài viết nổi bật.</p>;

  return (
    <div
      className="relative inline-block w-full sm:w-auto cursor-pointer rounded-2xl"
      onClick={() => window.location.href = `/articles/${article._id}`}
    >
      <img
        src={article.imageCloudUrl || "/placeholder.jpg"}
        alt={article.title}
        className="w-full h-auto rounded-2xl"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black opacity-80 hover:opacity-75 transition duration-300 ease-in-out text-white text-center rounded-2xl">
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            {article.title}
          </h2>
          <p className="text-xl mt-4">
            {new Date(article.createdAt).toLocaleDateString()}
          </p>
          <div className="flex mt-4 justify-center">
            {article.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 border text-white rounded-full text-xs mr-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopLikedArticle
