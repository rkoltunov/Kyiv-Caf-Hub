import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tag } from "../../components/tag/Tag";

import SearchIcon from "../../assets/icons/search.svg";
import SearchButtonIcon from "../../assets/home/buttonhome.svg";
import SearchButtonIconMob from "../../assets/home/buttonhomemob.svg";
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
    const params = new URLSearchParams();
    params.set(category, value);
    navigate(`/catalog?${params.toString()}`);
  };

  return (
    <div
      className="
        relative flex flex-col items-center text-center
        bg-[#FDF8DB]
        h-[500px] md:h-[600px] xl:h-[724px]
        pt-[58px] md:pt-[88px]
        px-4 md:px-[42px]
            overflow-x-hidden
      "
      style={{ borderRadius: "30px 30px 0px 0px" }}
    >

      {/** -----------------------------------------------
       * DESKTOP (>=1280) — всё как было ИЗНАЧАЛЬНО
       ------------------------------------------------ */}
      <img
        src={Matcha}
        className="hidden xl:block absolute left-[154px] top-[45px] h-[157px] z-0"
      />
      <img
        src={Doughnut}
        className="hidden xl:block absolute left-[22px] top-[267px] h-[151px] z-0"
      />
      <img
        src={Card_polaroid1}
        className="hidden xl:block absolute left-[38px] top-[370px] h-[340px] z-0"
      />
      <img
        src={cappuccino}
        className="hidden xl:block absolute right-[145px] top-[70px] h-[138px] z-0"
      />
      <img
        src={Macaroons}
        className="hidden xl:block absolute right-[25px] top-[236px] h-[201px] z-0"
      />
      <img
        src={Card_polaroid2}
        className="hidden xl:block absolute right-[21px] top-[370px] h-[340px] z-0"
      />

      {/** -----------------------------------------------
       * TABLET (768–1279) — убираем Matcha/Macaroons, 20%
       ------------------------------------------------ */}
      <div className="absolute inset-0 z-0 pointer-events-none">
      <img
        src={cappuccino}
        className="hidden md:block xl:hidden absolute top-[175px] right-[26px] h-[138px] z-0"
      />

      <img
        src={Doughnut}
        className="hidden md:block xl:hidden absolute top-[195px] left-[7px] h-[151px] z-20"
      />

      <img
        src={Card_polaroid1}
        className="hidden md:block xl:hidden absolute left-0 top-[236px] h-[340px] translate-x-[-70%] z-0"
      />

      <img
        src={Card_polaroid2}
        className="hidden md:block xl:hidden absolute right-0 top-[236px] h-[340px] translate-x-[70%] z-0"
        />
        </div>

      {/** -----------------------------------------------
       * MOBILE (<768)
       ------------------------------------------------ */}
      <img
        src={cappuccino}
        className="md:hidden absolute top-[14px] right-0 h-[90px]"
      />

      <img
        src={Doughnut}
        className="md:hidden absolute bottom-[11px] right-[42px] h-[100px]"
      />

      {/** одно фото убрано — оставляем только это */}
      <img
        src={Card_polaroid2}
        className="md:hidden absolute bottom-[10px] right-0 h-[220px] translate-x-[60%]"
      />

      {/** -----------------------------------------------
       * TITLE
       ------------------------------------------------ */}
      <div className="relative z-10 w-full flex flex-col items-center">
      <h1
        className="
          font-heading font-medium uppercase tracking-wide
          text-3xl md:text-5xl xl:text-[58px]
        "
      >
        Discover Kyiv’s cafés with
        <br className="hidden md:block" />
        the first online hub
      </h1>

      {/** -----------------------------------------------
       * SUBTEXT
       ------------------------------------------------ */}
      <p className="text-[#3D464D] text-sm md:text-base mb-6 md:mb-10 max-w-[670px]">
        Stop searching endlessly we’ve mapped the best coffee spots
        <br className="hidden md:block" />
        with photos, vibes & details — just pick and sip
      </p>

      {/** -----------------------------------------------
       * SEARCH
       ------------------------------------------------ */}
      <div className="flex flex-col items-center w-full max-w-[670px] px-4">
        <div
          className="relative flex items-center w-full transition-all duration-150"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={SearchIcon}
            className="absolute left-4 z-10 w-6 h-6 pointer-events-none"
          />

          <input
            type="text"
            placeholder="Where’s your next coffee spot?"
            className="h-[56px] w-full pl-12 pr-24 py-4 text-base rounded-full border placeholder-[#4F5F6B]"
            style={{
              borderColor: isFocused
                ? "#21262B"
                : searchQuery
                ? "#5C717E"
                : isHovered
                ? "#5C717E"
                : "transparent",
              borderWidth: "1.5px",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <div className="absolute right-2 flex items-center gap-2">

            {/** desktop mic */}
            <button
              onClick={onVoiceToggle}
              className={`
                hidden md:flex p-2 rounded-full transition
                ${isListening ? "bg-red-100 animate-pulse" : "hover:bg-gray-100"}
              `}
            >
              <img src={MicrophoneIcon} className="w-6 h-6" />
            </button>

            {/** desktop/tablet search */}
            <img
              src={SearchButtonIcon}
              onClick={handleSearch}
              className="hidden md:block cursor-pointer hover:opacity-70"
            />

            {/** mobile search (твоя кнопка) */}
            <img
              src={SearchButtonIconMob}
              onClick={handleSearch}
              className="block md:hidden w-10 h-10 cursor-pointer hover:opacity-70"
            />
          </div>
        </div>

        {/** -----------------------------------------------
         * MOBILE TAGS
         ------------------------------------------------ */}
        <div className="block md:hidden w-full mt-6 text-left">
          <span className="text-sm mb-2 block">Popular filters:</span>

          <div className="flex flex-wrap gap-2">
            <Tag label="#sugar-free desserts" onClick={() => handleFilterClick("Menu", "Sugar-free desserts")} />
            <Tag label="#quiet zone" onClick={() => handleFilterClick("Vibe", "Quiet zone")} />
            <Tag label="#matcha" onClick={() => handleFilterClick("Menu", "Matcha")} />
            <Tag label="#pet-friendly" onClick={() => handleFilterClick("Vibe", "Pet-friendly")} />
          </div>
        </div>

        {/** -----------------------------------------------
         * DESKTOP TAGS
         ------------------------------------------------ */}
        <div className="hidden md:flex items-center justify-center gap-3 w-full mt-4 flex-wrap">
          <span className="whitespace-nowrap">Popular filters:</span>
          <div className="flex flex-wrap gap-2">
            <Tag label="#sugar-free desserts" onClick={() => handleFilterClick("Menu", "Sugar-free desserts")} />
            <Tag label="#quiet zone" onClick={() => handleFilterClick("Vibe", "Quiet zone")} />
            <Tag label="#matcha" onClick={() => handleFilterClick("Menu", "Matcha")} />
            <Tag label="#pet-friendly" onClick={() => handleFilterClick("Vibe", "Pet-friendly")} />
          </div>
          </div>
          </div>

      </div>
    </div>
  );
};
