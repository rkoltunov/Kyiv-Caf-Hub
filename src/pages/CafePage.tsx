import { useParams, Link } from "react-router-dom";
import { cafes } from "../mocks/cafes";
import Location from "../assets/icons/location.svg";
import Share from "../assets/icons/share.svg";
import Instagram from "../assets/icons/instagram.svg";

export default function CafePage() {
  const { id } = useParams<{ id: string }>();
  const cafe = cafes.find((c) => c.id === id);

  if (!cafe)
    return (
      <div className="p-10 text-center text-gray-600 text-lg">
        Café not found 😢
      </div>
    );

  return (
<section className="bg-[#F9F8F5] rounded-[30px] w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-[42px] xl:px-[42px] py-8 md:py-[58px] transition-all duration-300">
      {/* Breadcrumbs */}
      <nav className="text-[#5C717E] text-sm mb-6">
        <Link to="/catalog" className="hover:underline">
          Catalog
        </Link>{" "}
        /{" "}
        <Link to="/catalog" className="hover:underline">
          All cafes
        </Link>{" "}
        / <span className="text-black">{cafe.title}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col lg:flex-row border border-gray-300 rounded-[30px] overflow-hidden">
        {/* Left block */}
        <div className="w-full lg:w-1/3 p-6 flex flex-col">
          <h1 className="text-3xl md:text-5xl font-heading font-medium uppercase mb-4">
            {cafe.title}
          </h1>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-2">
              <img src={Location} alt="Location" className="w-5 h-5 mt-1" />
              <span className="text-sm md:text-base">{cafe.address}</span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-block px-3 py-1 rounded-[8px]  text-gray-700 border border-gray-300 font-medium">
                {cafe.metro}
              </span>
              <span className="text-sm text-gray-700">{cafe.timeOnFoot}</span>
            </div>
          </div>

          {/* Working hours */}
          <div className="mb-6">
            <h3 className="font-semibold text-xl mb-1">Opening hours</h3>
            <p className="text-sm md:text-base">{cafe.workingHours.weekdays}</p>
            <p className="text-sm md:text-base">{cafe.workingHours.weekend}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full md:w-[320px]">
            <button className="flex-1 flex justify-center items-center gap-2 py-3 border rounded-full bg-black text-white font-heading font-medium text-sm md:text-base hover:bg-[#333] transition">
              Invite for a coffee
              <img src={Share} alt="Share" className="w-5 h-5" />
            </button>

            <button className="flex justify-center items-center rounded-full border border-black p-3 hover:bg-[#C6B0E7] hover:text-white transition">
              <img src={Instagram} alt="Instagram" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right block — gallery */}
        <div className="w-full lg:w-2/3 h-auto lg:h-[420px] flex flex-col sm:flex-row gap-2 p-4 lg:p-6">
          {/* Left column */}
          <div className="flex-1 bg-gray-100 rounded-[16px] overflow-hidden">
            <img
              src={cafe.photos[0]}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Middle column */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex-1 bg-gray-100 rounded-[16px] overflow-hidden">
              <img
                src={cafe.photos[1]}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 bg-gray-100 rounded-[16px] overflow-hidden">
              <img
                src={cafe.photos[2]}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 bg-gray-100 rounded-[16px] overflow-hidden">
            <img
              src={cafe.photos[3]}
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
          <p className="text-gray-700 mb-10 text-sm md:text-base leading-relaxed">
            {cafe.description}
          </p>
        </div>

        {/* Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-[#E5E7EB] rounded-[16px] p-4">
            <h4 className="font-semibold text-lg mb-2 uppercase">
              Metro station
            </h4>
            <p>{cafe.tags.metroStation}</p>
          </div>

          <div className="border border-[#E5E7EB] rounded-[16px] p-4">
            <h4 className="font-semibold text-lg mb-2 uppercase">Serving</h4>
            <ul className="space-y-1">
              {cafe.tags.serving.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="border border-[#E5E7EB] rounded-[16px] p-4">
            <h4 className="font-semibold text-lg mb-2 uppercase">Services</h4>
            <ul className="space-y-1">
              {cafe.tags.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="border border-[#E5E7EB] rounded-[16px] p-4">
            <h4 className="font-semibold text-lg mb-2 uppercase">Budget</h4>
            <p>{cafe.tags.budget}</p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mt-[56px]">
        <h2 className="text-center text-3xl md:text-4xl font-heading font-medium uppercase mb-2">
          Cafe location
        </h2>
        <p className="text-center mb-8 text-gray-700 text-sm md:text-base">
          {cafe.location}
        </p>

        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-[20px] border">
          <iframe
            title="Map"
            width="100%"
            height="100%"
            frameBorder="0"
            className="border-0"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              cafe.location
            )}&z=17&hl=en&output=embed`}
            allowFullScreen
          />
          <a
            href={`https://www.google.com/maps?q=${encodeURIComponent(
              cafe.location
            )}&hl=en`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#333] transition"
          >
            Open in Google
          </a>
        </div>
      </div>
    </section>
  );
}