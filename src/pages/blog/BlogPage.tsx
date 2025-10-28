import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { blogPage as mockPosts } from "../../mocks/blogPage";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>(); // ✅ заменили id на slug
  const [post, setPost] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      // ✅ ищем пост по slug, а не по id
      const backendPost = mockPosts.find((p) => p.slug === slug);

      if (!backendPost) {
        navigate("/404", { replace: true });
        return;
      }

      // эмуляция бекенда
      const content = backendPost.places
        .map(
          (place) =>
            `<h3>${place.title}</h3>${place.description}${place.verdict ? place.verdict : ""}`
        )
        .join("");

      const images = backendPost.places.map((place) => ({
        id: place.id,
        imageUrl: place.image,
        altText: place.title,
      }));

      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const sections = Array.from(doc.querySelectorAll("h3")).map((h3, i) => {
        let el = h3.nextElementSibling;
        const descEls: string[] = [];
        let verdictHTML = "";

        while (el && el.tagName.toLowerCase() !== "h3") {
          if (el.outerHTML.toLowerCase().includes("verdict")) {
            verdictHTML = el.outerHTML;
          } else {
            descEls.push(el.outerHTML);
          }
          el = el.nextElementSibling;
        }

        return {
          id: i + 1,
          title: h3.textContent,
          description: descEls.join(""),
          image: images[i]?.imageUrl || null,
          verdict: verdictHTML,
        };
      });

      setPost({
        ...backendPost,
        places: sections,
        images,
        content,
      });
    }, 500);
  }, [slug]);

  if (!post) return <div className="py-10 text-center">Loading...</div>;

  return (
    <div className="bg-[#F9F8F5] min-h-screen rounded-[30px]">
      {/* 🟡 Header */}
      <div className="bg-[#FFF3C8] pt-[55px]" style={{ borderRadius: "30px 30px 0 0" }}>
        <div className="px-[42px] pb-10 text-sm">
          <Link to="/blog" className="hover:underline text-gray-600">
            Blog
          </Link>
          <span className="mx-1">/</span>
          <Link
            to={`/blog/category/${post.categorySlug}`}
            className="hover:underline text-gray-600"
          >
            {post.category}
          </Link>
          <span className="mx-1">/</span>
          <span>{post.title}</span>
        </div>

        <div
          className="mx-[42px] pb-[58px] flex flex-col md:flex-row gap-4 items-start md:items-center"
          style={{
            paddingLeft: "clamp(10px, 8vw, 114px)",
            paddingRight: "clamp(10px, 8vw, 114px)",
          }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-[30px] mb-8">
              <span className="px-4 py-2 rounded-[8px] bg-black text-white text-lg font-medium font-heading">
                {post.category}
              </span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-medium font-heading text-black leading-tight mb-6 uppercase">
              {post.title}
            </h1>
            <p>{post.date}</p>
          </div>

          <div className="flex-1 rounded-[12px] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="object-cover h-[320px] w-[556px] md:w-[556px] md:h-[320px] rounded-[12px]"
            />
          </div>
        </div>
      </div>

      {/* 🟡 Content */}
      <div
        className="
          blog-content
          py-[56px]
          transition-all duration-300
          max-w-[898px]
          mx-auto
          px-[20px] sm:px-[30px] lg:px-0
        "
      >
        <div className="mb-10" dangerouslySetInnerHTML={{ __html: post.intro }} />

        {post.places.map((place: any) => (
          <div
            key={place.id}
            className="
              mb-10
              px-4 sm:px-6 md:px-10 lg:px-[60px] xl:px-[114px]
              transition-all duration-300
            "
          >
            <h3 className="text-[22px] font-bold mb-4">{place.title}</h3>
            <div
              className="text-[16px] leading-[1.6] mb-6"
              dangerouslySetInnerHTML={{ __html: place.description }}
            />
            <img
              src={place.image}
              alt={place.title}
              className="rounded-[30px] w-full object-cover mb-4 h-[400px]"
            />
            <div
              className="italic text-gray-600 text-[16px]"
              dangerouslySetInnerHTML={{ __html: place.verdict }}
            />
          </div>
        ))}

        <div dangerouslySetInnerHTML={{ __html: post.outro }} />

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-[40px]">
            {post.tags.map((tag: string, i: number) => (
              <span key={i} className="text-[14px]">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
