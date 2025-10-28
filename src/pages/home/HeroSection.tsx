import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tag } from "../../components/tag/Tag";

// Иконки
import SearchIcon from "../../assets/icons/search.svg";
import SearchButtonIcon from "../../assets/home/buttonhome.svg";
import MicrophoneIcon from "../../assets/icons/mic.svg";
import Matcha from "../../assets/home/matcha.png";
import Doughnut from "../../assets/home/doughnut.png";
import Macaroons from "../../assets/home/macaroons.png";
import Card_polaroid2 from "../../assets/home/card_polaroid2.png";
import Card_polaroid1 from "../../assets/home/card_polaroid1.png";
import cappuccino from "../../assets/home/cappuccino.png";

type HeroSectionProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isListening: boolean;
  onVoiceToggle: () => void;
};

export const HeroSection: FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  isListening,
  onVoiceToggle,
}) => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleFilterClick = (category: string, value: string) => {
    navigate(`/catalog?filter=${encodeURIComponent(`${category}:${value}`)}`);
  };


  return (
    <div
      className="text-center flex flex-col items-center relative h-[500px] md:h-[600px] lg:h-[724px] bg-[#FDF8DB] p-8 md:px-[42px] md:py-[170px]"
      style={{ borderRadius: "30px 30px 0px 0px" }}
    >
      {/* ==== Фоновые изображения ==== */}
      <img
        src={Matcha}
        alt=""
        className="hidden lg:block absolute left-[154px] top-[45px] h-[157px]"
        loading="lazy"
      />
      <img
        src={Doughnut}
        alt=""
        className="hidden lg:block absolute left-[22px] top-[267px] h-[151px]"
        loading="lazy"
      />
      <img
        src={Card_polaroid1}
        alt=""
        className="hidden lg:block absolute left-[38px] top-[370px] h-[340px]"
        loading="lazy"
      />
      <img
        src={cappuccino}
        alt=""
        className="hidden lg:block absolute right-[145px] top-[70px] h-[138px]"
        loading="lazy"
      />
      <img
        src={Macaroons}
        alt=""
        className="hidden lg:block absolute right-[25px] top-[236px] h-[201px]"
        loading="lazy"
      />
      <img
        src={Card_polaroid2}
        alt=""
        className="hidden lg:block absolute right-[21px] top-[370px] h-[340px]"
        loading="lazy"
      />

      {/* ==== Тексты ==== */}
      <h1 className="font-heading text-3xl md:text-5xl lg:text-[58px] font-medium mb-6 w-full max-w-[1440px] mx-auto uppercase tracking-wide px-4">
        Discover Kyiv’s cafés with <br className="hidden md:block" />
        the first online hub
      </h1>

      <p className="text-[#3D464D] text-sm md:text-base mb-10 w-full max-w-[670px] mx-auto px-4">
        Stop searching endlessly we’ve mapped the best coffee spots{" "}
        <br className="hidden md:block" />
        with photos, vibes & details — just pick and sip
      </p>

      {/* ==== Поиск ==== */}
      <div className="flex flex-col items-center justify-center w-full max-w-[670px] mx-auto px-4">
      <div
    className="relative flex items-center w-full transition-all duration-150"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {/* Лупа */}
    <img
      src={SearchIcon}
      alt="Search"
      className="absolute left-4 z-10 w-6 h-6 pointer-events-none"
      style={{
        filter:
          "invert(35%) sepia(8%) saturate(350%) hue-rotate(169deg) brightness(94%) contrast(85%)",
      }}
    />

    <input
      type="text"
      placeholder="Where’s your next coffee spot?"
      className={`h-[56px] w-full pl-12 pr-24 py-4 text-base rounded-full transition-all duration-200
        placeholder-[#4F5F6B] border focus:outline-none focus:ring-0
      `}
      style={{
        borderColor: isFocused
          ? "#21262B"
          : searchQuery
          ? "#5C717E"
          : isHovered
          ? "#5C717E"
          : "transparent",
        borderWidth: "1.5px",
        color: isFocused || searchQuery ? "#21262B" : "#4F5F6B",
        WebkitTextFillColor: isFocused || searchQuery ? "#21262B" : "#4F5F6B",
        boxShadow: "none",
        outline: "none",
        WebkitAppearance: "none",
        transition: "all 0.15s ease-in-out",
      }}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    />

    {/* Кнопки справа */}
    <div className="absolute right-2 flex items-center gap-2">
      <button
        onClick={onVoiceToggle}
        className={`p-2 rounded-full transition ${
          isListening ? "bg-red-100 animate-pulse" : "hover:bg-gray-100"
        }`}
        aria-label={
          isListening ? "Остановить голосовой ввод" : "Начать голосовой ввод"
        }
      >
        <img
          src={MicrophoneIcon}
          alt=""
          className="w-6 h-6"
          style={{
            filter:
              "invert(35%) sepia(8%) saturate(350%) hue-rotate(169deg) brightness(94%) contrast(85%)",
          }}
        />
      </button>

      <button
        className="hover:bg-gray-100 rounded-full transition"
        onClick={handleSearch}
      >
        <img
          src={SearchButtonIcon}
          alt="Explore cafés"
          className="object-contain hover:opacity-70 transition"
        />
      </button>
    </div>
  </div>


        {/* ==== Фильтры ==== */}
        <div className="relative flex items-center justify-center gap-3 w-full mt-4 flex-wrap">
          <span className="whitespace-nowrap">Popular filters:</span>
          <div className="flex flex-wrap gap-2">
    <Tag
      label="#sugar-free desserts"
      onClick={() => handleFilterClick("MENU", "Sugar-free desserts")}
    />
    <Tag
      label="#quiet zone"
      onClick={() => handleFilterClick("VIBE", "Quiet zone")}
    />
    <Tag
      label="#matcha"
      onClick={() => handleFilterClick("MENU", "Matcha")}
    />
    <Tag
      label="#pet-friendly"
      onClick={() => handleFilterClick("VIBE", "Pet-friendly")}
    />
  </div>
        </div>
      </div>
    </div>
  );
};