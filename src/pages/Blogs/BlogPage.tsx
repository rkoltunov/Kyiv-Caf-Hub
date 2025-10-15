import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { blogPage } from "../../mocks/blogPage";

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const found = blogPage.find((p) => p.id === Number(id)) || blogPage[0];
    setPost(found);
  }, [id]);

  if (!post) return <div className="py-10 text-center">Loading...</div>;

  return (
    <div className="bg-[#F9F8F5] min-h-screen rounded-[30px]">

      {/* Хедер поста */}
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

        <div className="mx-[42px]  pb-[58px] flex flex-col md:flex-row gap-4 items-start md:items-center"
                style={{
                  paddingLeft: "clamp(10px, 8vw, 114px)",
                  paddingRight: "clamp(10px, 8vw, 114px)",
                }}>
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

      {/* Основной текст */}
      <div
        className="
          blog-content py-[56px]
        "
        style={{
          marginLeft: "clamp(10px, 19vw, 271px)",
          marginRight: "clamp(10px, 19vw, 271px)",
        }}
      >
        <div className="mb-10" dangerouslySetInnerHTML={{ __html: post.intro }} />

        {post.places.map((place: any) => (
          <div key={place.id} className="mb-10 "
          style={{
            marginLeft: "clamp(40px, 8vw, 114px)",
            marginRight: "clamp(40px, 8vw, 114px)",
          }}>
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