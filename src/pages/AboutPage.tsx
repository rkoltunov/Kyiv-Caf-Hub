import About from "../assets/home/about/Image.png";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-[#FDF8DB] rounded-[30px] flex justify-center py-[60px] sm:py-[80px] px-4">
      <div className="bg-[#F9F8F5] rounded-[30px] border shadow-sm w-full max-w-[962px] p-6 sm:p-8 text-center md:text-left">
        
        {/* === Заголовок === */}
        <p className="text-[#5C717E] font-bold text-[16px] sm:text-[18px] mb-6">About us</p>

        <h1 className="font-heading text-center font-medium text-[26px] sm:text-[32px] md:text-[48px] lg:text-[58px] uppercase leading-tight mb-6 text-[#111]">
          We’re creating more than just a map of coffee shops
        </h1>

        <div className="max-w-[490px] mx-auto">
          <p className="text-[#21262B] font-bold text-[18px] sm:text-[20px] md:text-[22px] mb-6">
            — we’re building a cultural guide that helps people discover Kyiv through taste and atmosphere.
          </p>

          <p className="text-[#21262B] text-[15px] sm:text-[16px] mb-[48px] md:mb-[72px] leading-relaxed">
            Kyiv Café Hub is the only online platform where you can find a coffee shop in Kyiv to match any mood — by location, atmosphere, menu, or unique features.
            <br />
            Our coffee shop catalog is an innovative online guide for people who value ambiance, style, and unique urban experiences.
          </p>
        </div>

        {/* === Фото === */}
        <div className="flex justify-center mb-[60px] md:mb-[72px]">
          <img
            src={About}
            alt="Friends drinking coffee"
            className="rounded-[16px] w-full max-w-[600px] object-cover"
          />
        </div>

        {/* === Вторая секция === */}
        <h2 className="font-heading font-medium text-center md:text-left text-[26px] sm:text-[32px] md:text-[48px] uppercase leading-tight mb-6 text-[#111]">
          We don’t just list addresses
        </h2>

        <div className="max-w-[490px] mx-auto ">
          <p className="text-[#21262B] font-bold text-[18px] sm:text-[20px] md:text-[22px] mb-6">
            — we help users find places that fit their vibe, from cozy work-friendly cafés to Instagram-worthy spaces for meetups.
          </p>

          <p className="text-[#21262B] text-[15px] sm:text-[16px] mb-[48px] md:mb-[72px] leading-relaxed">
            It’s not a map or a directory — it’s a modern lifestyle service that turns the search for a coffee shop into part of an enjoyable journey through the city.
          </p>
        </div>

        {/* === Нижний блок === */}
        <h3 className="text-[26px] sm:text-[28px] md:text-[32px] font-bold text-[#111] mb-8 text-center">
          What makes us special:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Mood - and atmosphere-based search",
            "Convenient neighborhood navigation",
            "Unique city highlights",
            "Immersive cultural experience of the city",
          ].map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-3 justify-center sm:justify-start border border-[#3D464D] rounded-[12px] px-4 py-4 shadow-[4px_4px_0_#3D464D] bg-[#F9F8F5]"
            >
              <span className="bg-black text-white rounded-[8px] w-[44px] h-[44px] flex items-center justify-center text-[22px] font-bold">
                {i + 1}
              </span>
              <p className="text-[#3D464D] font-bold text-[16px] sm:text-[18px] leading-snug max-w-[260px] text-center sm:text-left">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
