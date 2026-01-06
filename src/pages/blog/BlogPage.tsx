import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogPost } from "../../api/blog";
import type { BlogPostResponseDto } from "../../types/dto";

type Place = {
  title: string;
  description: string;
  verdict: string;
  imageIds: number[];
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    const load = async () => {
      try {
        // 1️⃣ сначала пробуем взять пост через getBlogPost
        const fullPost = await getBlogPost(slug!) as BlogPostResponseDto & { isMock?: boolean };

        // 2️⃣ БЭКЕНД (content = JSON STRING)
        if (!fullPost.isMock) {
          const contentObj = JSON.parse(fullPost.content || "{}");

          setPost({
            ...fullPost,
            intro: contentObj.intro || "",
            places: contentObj.places || [],
            outro: contentObj.outro || "",
            readTime: contentObj.readTime || "",
            created: contentObj.created || "",
          });
          return;
        }

        // 3️⃣ МОК (content = HTML)
        setPost({
          ...fullPost,
          intro: "",
          places: [],
          outro: "",
          readTime: "",
          created: "",
        });

      } catch (err) {
        console.error("❌ Ошибка загрузки поста:", err);
        navigate("/404", { replace: true });
      }
    };

    load();
  }, [slug]);

  if (!post) return <div className="py-10 text-center">Loading...</div>;

  return (
    <div className="bg-[#F9F8F5] min-h-screen rounded-[30px]">
      {/* HEADER */}
      <div className="bg-[#FFF3C8] pt-[55px]" style={{ borderRadius: "30px 30px 0 0" }}>
        <div className="px-[42px] pb-10 text-sm">
          <Link to="/blog" className="hover:underline text-gray-600">Blog</Link>
          <span className="mx-1">/</span>

          <Link
            to={`/blog/category/${post.categories?.[0]?.name?.toLowerCase().replace(/\s+/g, "-")}`}
            className="hover:underline text-gray-600"
          >
            {post.categories?.[0]?.name}
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

            {/* Category + time */}
            <div className="flex items-center gap-[30px] mb-8">
              <span className="px-4 py-2 rounded-[8px] bg-black text-white text-lg font-medium font-heading">
                {post.categories?.[0]?.name}
              </span>

              {post.readTime && (
                <span className="text-lg text-gray-700 font-medium">
                  {post.readTime}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-medium font-heading text-black leading-tight mb-6 uppercase">
              {post.title}
            </h1>

            {post.created && (
              <p className="text-[16px] text-gray-600 mt-6">{post.created}</p>
            )}
          </div>

          {/* Main image */}
          <div className="flex-1 rounded-[12px] overflow-hidden">
            {post.images?.[0]?.imageUrl && (
              <img
                src={post.images[0].imageUrl}
                alt={post.images[0].altText}
                className="object-cover h-[320px] w-full rounded-[12px]"
              />
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="py-[56px] max-w-[898px] mx-auto px-[20px] sm:px-[30px] lg:px-0">
        {/* INTRO */}
        {post.intro && (
          <p className="mb-10 text-[18px] leading-[1.7]">{post.intro}</p>
        )}

        {/* PLACES */}
        {post.places?.map((place: Place, index: number) => (
          <div
            key={index}
            className="mb-12 px-4 sm:px-6 md:px-10 lg:px-[60px] xl:px-[114px]"
          >
            <h3 className="text-[22px] font-bold mb-4">{place.title}</h3>

            <p className="text-[16px] leading-[1.6] mb-4 whitespace-pre-line">
              {place.description}
            </p>

            {place.imageIds?.length > 0 && (
              <div className="flex flex-col gap-4 mb-6">
                {place.imageIds.map((imgId) => {
                  const img = post.images.find((i: any) => i.id === imgId);
                  if (!img) return null;

                  return (
                    <img
                      key={imgId}
                      src={img.imageUrl}
                      alt={img.altText}
                      className="rounded-[30px] w-full object-cover h-[400px]"
                    />
                  );
                })}
              </div>
            )}

            <p className="italic text-gray-600 text-[16px] whitespace-pre-line">
              {place.verdict}
            </p>
          </div>
        ))}

        {/* OUTRO */}
        {post.outro && (
          <p className="mt-10 border-t pt-6 text-[16px] leading-[1.7] whitespace-pre-line">
            {post.outro}
          </p>
        )}

        {/* TAGS */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-[40px]">
            {post.tags.map((tag: any) => (
              <span key={tag.id} className="text-[14px] border px-2 py-1 rounded">
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
