import { useParams, NavLink, Link } from "react-router-dom";
import { blogPosts } from "../../mocks/blogPosts";
import Cofee from "../../assets/home/blog/coffes.png";
import ButtonIcon from "../../assets/home/blog/Menu8.svg";

const categories = [
  { name: "About baristas", slug: "about-baristas" },
  { name: "Café review", slug: "cafe-review" },
  { name: "Coffee history", slug: "coffee-history" },
  { name: "Best croissants", slug: "best-croissants" },
];

export default function BlogCategoryPage() {
  const { slug } = useParams<{ slug?: string }>();

  const categoryTitle = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Blog";

  const postsInCategory = blogPosts.filter((p) => p.categorySlug === slug);
  const mainPost = postsInCategory.length ? postsInCategory[0] : null;

  const relatedPosts = blogPosts.filter((p) => p.categorySlug !== slug).slice(0, 2);

  return (
    <div className="bg-[#F9F8F5] rounded-[20px] sm:rounded-[30px] overflow-hidden">
      {/* HERO */}
      <div className="relative w-full h-[220px] sm:h-[258px] overflow-hidden">
        <img
          src={Cofee}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-wide text-center px-4">
            SIP & EXPLORE
          </h1>
        </div>
      </div>

      {/* --- BROWSE + MAIN POST --- */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[42px] mt-10 mb-14 flex flex-col lg:flex-row gap-2">
        {/* SIDEBAR */}
        <aside className="w-full lg:w-[327px] shrink-0">
          <h2 className="text-gray-500 text-lg sm:text-2xl font-heading font-bold mb-4">
            Browse
          </h2>

          <ul className="flex lg:block flex-wrap gap-3 sm:gap-4 text-sm sm:text-lg">
            {categories.map((c) => (
              <li key={c.slug}>
                <NavLink
                  to={`/blog/category/${c.slug}`}
                  className={({ isActive }) =>
                    [
                      "block px-4 p-2 lg:px-1 lg:py-1 rounded-full lg:rounded-none border lg:border-0 transition-colors font-bold",
                      isActive
                        ? "bg-[#C6B0E7] text-black lg:bg-transparent lg:text-black underline decoration-2 underline-offset-4"
                        : " bg-white lg:bg-transparent rounded-full lg:rounded-[30px] border lg:border-0 font-bold hover:bg-[#C6B0E7] hover:text-black transition",
                    ]
                      .filter(Boolean)
                      .join(" ")
                  }
                >
                  {c.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        {/* MAIN POST */}
        <div className="flex-1 flex flex-col gap-10">
          {mainPost ? (
            <Link
              to={`/blog/${mainPost.id}`}
              className="flex flex-col sm:flex-row gap-2 bg-[#F9F8F5] rounded-[30px] overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
              aria-label={mainPost.title}
            >
              <div className="sm:w-[50%] h-[220px] sm:h-[256px] overflow-hidden">
                <img
                  src={mainPost.image}
                  alt={mainPost.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="sm:w-[50%]  sm:pb-4 p-6  flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-3xl font-semibold mb-3  truncate">
                    {mainPost.title}
                  </h3>
                  <p className="  leading-relaxed mb-4 line-clamp-3">
                    {mainPost.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-gray-500 text-xs sm:text-sm">
                  <span>{mainPost.readTime} read</span>
                  <button className="transition hover:opacity-80">
                    <img
                      src={ButtonIcon}
                      alt="Read article"
                      className="w-[100px] sm:w-[130px] h-auto"
                    />
                  </button>
                </div>
              </div>
            </Link>
          ) : (
            <div className="p-6 bg-white rounded-[20px] border border-gray-200 text-center">
              <p className="text-gray-600">No article found for this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- RELATED POSTS --- */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[42px] mb-16">
        <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8">
          You can be interested in
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="flex flex-col sm:flex-row gap-2 bg-[#F9F8F5] rounded-[30px] overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="sm:w-[50%] h-[256px] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="sm:w-[50%] p-6  pb-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-3xl font-semibold mb-2 truncate">
                    {post.title}
                  </h3>
                  <p className=" mb-3 line-clamp-3">
                    {post.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-gray-500 text-xs sm:text-sm">
                  <span>{post.readTime} read</span>
                  <button className="transition hover:opacity-80">
                    <img
                      src={ButtonIcon}
                      alt="Read article"
                      className="w-[100px] sm:w-[130px] h-auto"
                    />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}