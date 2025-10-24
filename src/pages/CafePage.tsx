import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCafes } from "../mocks/cafes";
import CafeMap from "../utils/cafeMap";
import type { CafeResponseDto } from "../types/dto";
import LocationIcon from "../assets/icons/location.svg";
import ShareIcon from "../assets/icons/share.svg";
import InstagramIcon from "../assets/icons/instagram.svg";



export default function CafePage() {
  const { id } = useParams<{ id: string }>();
  const [cafes, setCafes] = useState<CafeResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCafes().then((data) => {
      setCafes(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return <div className="p-10 text-center text-gray-600">Loading...</div>;

  const cafe = cafes.find((c) => c.id.toString() === id);

  if (!cafe)
    return (
      <div className="p-10 text-center text-gray-600">
        Café not found 😢
      </div>
    );

  // Преобразуем изображения
  const photos = cafe.images.length
    ? cafe.images.map((img) => img.imageUrl)
    : [];
  
  // Метро и время на основе тегов
  const metro = cafe.tags.find((t) => t.category === "METRO")?.name || "";
  const timeOnFoot =
    cafe.tags.find((t) => t.category === "ACCESSIBILITY")?.name || "";

  // Теги по категориям
  const servingTags = cafe.tags
    .filter((t) => t.category === "MENU")
    .map((t) => t.name);
  const servicesTags = cafe.tags
    .filter((t) => t.category === "VIBE")
    .map((t) => t.name);
  const budget = cafe.tags.find((t) => t.category === "BUDGET")?.name || "";

  // Карта
  const mapLocation = cafe.address;

  return (
    <section className="bg-[#F9F8F5] rounded-[30px] w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-[42px] xl:px-[42px] py-8 md:py-[58px] transition-all duration-300">
      {/* Breadcrumbs */}
      <nav className="text-[#5C717E] text-sm mb-6">
        <a href="/catalog" className="hover:underline">
          Catalog
        </a>{" "}
        /{" "}
        <a href="/catalog" className="hover:underline">
          All cafes
        </a>{" "}
        / <span className="text-black">{cafe.name}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col lg:flex-row border border-gray-300 rounded-[30px] overflow-hidden">
        {/* Left block */}
        <div className="w-full lg:w-1/3 p-6 flex flex-col">
          <h1 className="text-3xl md:text-5xl font-heading font-medium uppercase mb-4">
            {cafe.name}
          </h1>

          <div className="space-y-4 mb-4">
            <div className="flex items-start gap-2">
              <img src={LocationIcon} alt="Location" className="w-5 h-5 mt-1" />
              <span className="text-sm md:text-base">{cafe.address}</span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {metro && (
                <span className="inline-block px-3 py-1 rounded-[8px]  text-gray-700 border border-gray-300 font-medium">
                  {metro}
                </span>
              )}
              {timeOnFoot && (
                <span>{timeOnFoot}</span>
              )}
            </div>
          </div>

          {/* Working hours */}
          {cafe.hours && (
            <div className="mb-6">
              <h3 className="font-semibold text-2xl mb-2">Opening hours</h3>
              <p className="text-sm md:text-base mb-2">{cafe.hours.weekdays}</p>
              <p className="text-sm md:text-base">{cafe.hours.weekend}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 w-full md:w-[322px]">
            <button className="flex-1 flex justify-center items-center gap-1 py-1 border rounded-full bg-black text-white font-heading font-medium text-sm md:text-lg hover:bg-[#333] transition">
              Invite for a coffee
              <img src={ShareIcon} alt="Share" className="w-6 h-6" />
            </button>

            <button className="flex justify-center items-center rounded-full border border-black p-3 hover:bg-[#C6B0E7] hover:text-white transition">
              <img src={InstagramIcon} alt="Instagram" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Right block — gallery */}
        <div className="w-full lg:w-2/3 h-auto lg:h-[420px] flex flex-col sm:flex-row gap-2 p-4 lg:p-6"
        style={{ borderRadius: '30px 30px 30px 30px' }}>
          {/* Left column */}
          <div className="flex-1 bg-gray-100  overflow-hidden"
                  style={{ borderRadius: '30px 0px 0px 30px' }}>
            <img
              src={photos[0]}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Middle column */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex-1 bg-gray-100  overflow-hidden">
              <img
                src={photos[1]}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 bg-gray-100  overflow-hidden">
              <img
                src={photos[2]}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 bg-gray-100  overflow-hidden"
                            style={{ borderRadius: '0px 30px 30px 0px' }}>
            <img
              src={photos[3]}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* About section */}
      <div className="mt-10">
        <div className="max-w-full lg:max-w-[50%]">
          <h2 className="text-3xl md:text-4xl font-heading font-medium uppercase mb-3">
            About
          </h2>
          <p className=" mb-10  leading-relaxed">
            {cafe.description}
          </p>
        </div>

        {/* Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metro && (
            <div className="border border-[#E5E7EB] rounded-[16px] p-4">
              <h4 className="font-semibold text-2xl mb-2 uppercase">Metro station</h4>
              <p>{metro}</p>
            </div>
          )}

          {servingTags.length > 0 && (
            <div className="border border-[#E5E7EB] rounded-[16px] p-4">
              <h4 className="font-semibold text-2xl mb-2 uppercase">Serving</h4>
              <ul className="space-y-1">
                {servingTags.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {servicesTags.length > 0 && (
            <div className="border border-[#E5E7EB] rounded-[16px] p-4">
              <h4 className="font-semibold text-2xl mb-2 uppercase">Services</h4>
              <ul className="space-y-1">
                {servicesTags.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {budget && (
            <div className="border border-[#E5E7EB] rounded-[16px] p-4">
              <h4 className="font-semibold text-2xl mb-2 uppercase">Budget</h4>
              <p>{budget}</p>
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="mt-[56px]">
        <h2 className="text-center text-3xl md:text-4xl font-heading font-medium uppercase mb-2">
          Cafe location
        </h2>
        <p className="text-center mb-8 text-gray-700 text-sm md:text-base">{mapLocation}</p>

        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-[20px] border">
        <CafeMap lat={cafe.latitude} lng={cafe.longitude} />
  <a
    href={`https://www.google.com/maps?q=${encodeURIComponent(mapLocation)}&hl=en`}
    target="_blank"
    rel="noopener noreferrer"
    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-4 rounded-full  font-medium hover:bg-[#333] transition"
  >
    Open in Google
  </a>
</div>
      </div>
    </section>
  );
}
