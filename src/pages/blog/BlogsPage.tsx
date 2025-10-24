import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { BlogPostResponseDto } from "../../types/dto";
import { blogPosts } from "../../mocks/blogPosts"; // 👈 импорт моков
import Cofee from "../../assets/home/blog/coffes.png";
import ButtonIcon from "../../assets/home/blog/menu8.svg";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostResponseDto[]>([]);

  useEffect(() => {
    // пока используем моки, не API
    setPosts(blogPosts.content);

    // если появится API — просто раскомментируй:
    /*
    api
      .get("/blog?page=0&size=10")
      .then((res) => setPosts(res.data.content))
      .catch((err) => console.error("Ошибка при загрузке блогов:", err));
    */
  }, []);

  return (
    <div className="bg-[#F9F8F5] rounded-[30px] overflow-hidden">
      {/* --- Hero banner --- */}
      <div className="relative w-full h-[220px] sm:h-[258px] overflow-hidden">
        <img
          src={Cofee}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-wide text-center px-4">
            SIP & EXPLORE
          </h1>
        </div>
      </div>

      {/* --- Layout --- */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[42px] py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-[327px] shrink-0">
          <h2 className="text-gray-500 text-lg sm:text-2xl font-heading font-bold mb-4">
            Browse
          </h2>

          <ul className="flex lg:block flex-wrap gap-3 sm:gap-4 text-sm sm:text-lg">
            {["About baristas", "Café review", "Coffee history", "Best croissants"].map((cat) => (
              <li key={cat}>
                <Link
                  to={`/blog/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block px-4 p-2 lg:px-1 lg:py-1 bg-white lg:bg-transparent rounded-[30px] border lg:border-0 font-bold hover:bg-[#C6B0E7] hover:text-black transition"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Blog list */}
        <section className="flex-1 flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="flex flex-col sm:flex-row bg-[#F9F8F5] rounded-[30px] overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Image */}
              <div className="sm:basis-1/2 flex-shrink-0 h-[220px] sm:h-auto sm:max-h-[256px] overflow-hidden">
                <img
                  src={post.images[0]?.imageUrl}
                  alt={post.images[0]?.altText || post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="sm:basis-1/2 flex flex-col justify-between px-5 sm:px-6 py-5 sm:py-6 min-w-0">
                <div>
                  <h3
                    className="text-2xl sm:text-3xl font-semibold mb-2 truncate"
                    title={post.title}
                  >
                    {post.title}
                  </h3>

                  <p className="text-sm sm:text-lg mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex justify-end mt-auto">
                  <button className="transition hover:opacity-80">
                    <img
                      src={ButtonIcon}
                      alt="Read article"
                      className="w-[133px] sm:w-[133px] h-auto"
                    />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}