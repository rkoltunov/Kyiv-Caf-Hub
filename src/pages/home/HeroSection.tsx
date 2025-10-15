import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

// Иконки
import SearchIcon from "../../assets/icons/search.svg";
import SearchButtonIcon from '../../assets/home/Buttonhome.svg';
import MicrophoneIcon from '../../assets/icons/mic.svg';
import SugarFreeIcon from '../../assets/home/tag.svg';
import QuietZoneIcon from '../../assets/home/Tag1.svg';
import MatchaIcon from '../../assets/home/Tag2.svg';
import PetFriendlyIcon from '../../assets/home/Tag3.svg';
import Matcha from '../../assets/home/Matcha.png';
import Doughnut from '../../assets/home/Doughnut.png';
import Macaroons from '../../assets/home/Macaroons.png';
import Card_polaroid2 from '../../assets/home/Card_polaroid2.png';
import Card_polaroid1 from '../../assets/home/Card_polaroid1.png';
import cappuccino from '../../assets/home/cappuccino.png';

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
      className="text-center flex flex-col justify-center items-center relative h-[500px] md:h-[600px] lg:h-[724px] bg-[#FDF8DB] p-8 md:px-[42px] md:py-[170px]"
      style={{ borderRadius: '30px 30px 0px 0px' }}
    >
      {/* Фоновые изображения */}
      <img src={Matcha} alt="" className="hidden lg:block absolute left-[154px] top-[45px]" style={{ transform: 'rotate(10deg)' }} loading="lazy" />
      <img src={Doughnut} alt="" className="hidden lg:block absolute left-[22px] top-[267px]" loading="lazy" />
      <img src={Card_polaroid1} alt="" className="hidden lg:block absolute left-[38px] top-[370px]" loading="lazy" />
      <img src={cappuccino} alt="" className="hidden lg:block absolute right-[145px] top-[70px]" loading="lazy" />
      <img src={Macaroons} alt="" className="hidden lg:block absolute right-[25px] top-[236px]" style={{ transform: 'rotate(15deg)' }} loading="lazy" />
      <img src={Card_polaroid2} alt="" className="hidden lg:block absolute right-[21px] top-[370px]" loading="lazy" />

      <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-6 w-full max-w-[1440px] mx-auto uppercase tracking-wide px-4">
        Discover Kyiv’s cafés with <br className="hidden md:block" />
        the first online hub
      </h1>

      <p className="font-body text-sm md:text-base mb-10 w-full max-w-[670px] mx-auto px-4">
        Stop searching endlessly we’ve mapped the best coffee spots <br className="hidden md:block" />
        with photos, vibes & details — just pick and sip
      </p>

      {/* Поиск */}
      <div className="flex flex-col items-center justify-center w-full max-w-[670px] mx-auto px-4">
        <div className="relative flex items-center w-full">
          <img
            src={SearchIcon}
            alt="Search"
            className="absolute left-4 z-10 w-6 h-6 pointer-events-none"
            style={{
              filter:
                'invert(35%) sepia(8%) saturate(350%) hue-rotate(169deg) brightness(94%) contrast(85%)',
            }}
          />
          <input
            type="text"
            placeholder="Where’s your next coffee spot?"
            className="h-[56px] w-full pl-12 pr-24 py-4 text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-[#4F5F6B] text-[#4F5F6B]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Поиск по Enter
          />
          <div className="absolute right-2 flex items-center gap-2">
            <button
              onClick={onVoiceToggle}
              className={`p-2 rounded-full transition ${
                isListening ? 'bg-red-100 animate-pulse' : 'hover:bg-gray-100'
              }`}
              aria-label={isListening ? 'Остановить голосовой ввод' : 'Начать голосовой ввод'}
            >
              <img
                src={MicrophoneIcon}
                alt=""
                className="w-6 h-6"
                style={{
                  filter:
                    'invert(35%) sepia(8%) saturate(350%) hue-rotate(169deg) brightness(94%) contrast(85%)',
                }}
              />
            </button>

            {/* Кнопка поиска */}
            <button
        className="hover:bg-gray-100 rounded-full transition"
        onClick={handleSearch}
      >
        <img src={SearchButtonIcon} alt="Explore cafés" className="object-contain hover:opacity-70 transition" />
      </button>
          </div>
        </div>

        {/* Фильтры */}
        <div className="relative flex items-center justify-center gap-3 text-sm w-full mt-4 flex-wrap">
          <span className="font-medium whitespace-nowrap">Popular filters:</span>
          <div className="flex flex-wrap gap-2">
          <button onClick={() => handleFilterClick("Menu", "Sugar-free desserts")}>
            <img src={SugarFreeIcon} alt="Sugar Free" className="h-[37px]" />
          </button>
          <button onClick={() => handleFilterClick("Vibe", "Quiet Zone")}>
            <img src={QuietZoneIcon} alt="Quiet Zone" className="h-[37px]" />
          </button>
          <button onClick={() => handleFilterClick("Menu", "Matcha")}>
            <img src={MatchaIcon} alt="Matcha" className="h-[37px]" />
          </button>
          <button onClick={() => handleFilterClick("Vibe", "Pet-friendly")}>
            <img src={PetFriendlyIcon} alt="Pet Friendly" className="h-[37px]" />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};