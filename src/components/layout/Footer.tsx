import InstagramIcon from '../../assets/icons/instagram.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import TiktokIcon from '../../assets/icons/tiktok.svg';

export const Footer = () => {
  return (
    <footer className="bg-[#C6B0E7] rounded-t-[30px] w-full relative ">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[42px] py-4 md:py-6">

        {/* ==== DESKTOP (>=1280px) ==== */}
        <div className="hidden xl:flex justify-between items-end">

          {/* ЛОГО */}
          <div>
            <h2 className="font-spaceGrotesk font-bold text-[20px] leading-[1.2]">
              Kyiv Café Hub
            </h2>
            <span className="font-satoshi text-[14px] opacity-80 whitespace-nowrap block mt-1">
              Copyright © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>

          {/* MENU + POLICIES — одна строка */}
          <div className="flex items-center gap-[150px] font-satoshi text-[14px]">

            {/* Меню */}
            <div className="flex items-center gap-6">
              <a href="/" className="hover:text-gray-700">Home</a>
              <a href="/blog" className="hover:text-gray-700">Blog</a>
              <a href="/catalog" className="hover:text-gray-700">Catalog</a>
              <a href="/about" className="hover:text-gray-700">About</a>
            </div>

            {/* Политики */}
            <div className="flex items-center gap-6">
              <a href="/privacy-policy" className="hover:text-gray-700">Privacy Policy</a>
              <a href="/cookies-policy" className="hover:text-gray-700">Cookies Policy</a>
            </div>
          </div>

          {/* FOLLOW US */}
          <div className="flex flex-col items-end">
            <span className="font-satoshi text-[14px] mb-1">Follow us</span>
            <div className="flex gap-4">
              <img src={TiktokIcon} className="w-6 h-6" />
              <img src={InstagramIcon} className="w-6 h-6" />
              <img src={FacebookIcon} className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* ==== TABLET (768px–1279px) ==== */}
        <div className="hidden md:flex xl:hidden justify-between items-start w-full mt-4">

          {/* ЛОГО */}
          <div className="flex flex-col">
            <h2 className="font-spaceGrotesk font-bold text-[20px]">
              Kyiv Café Hub
            </h2>
            <span className="font-satoshi text-[14px] opacity-80 mt-1">
              Copyright © {new Date().getFullYear()}. All rights reserved.
            </span>
          </div>

          {/* GRID MENU + POLICIES */}
          <div className="grid grid-cols-3 grid-rows-2 gap-x-5 gap-y-2 font-satoshi text-[14px]">
            <a href="/">Home</a>
            <a href="/blog">Blog</a>
            <a href="/privacy-policy">Privacy Policy</a>

            <a href="/catalog">Catalog</a>
            <a href="/about">About</a>
            <a href="/cookies-policy">Cookies Policy</a>
          </div>

          {/* FOLLOW US */}
          <div className="flex flex-col items-end">
            <span className="font-satoshi text-[14px] mb-2">Follow us</span>
            <div className="flex gap-3">
              <img src={TiktokIcon} className="w-6 h-6" />
              <img src={InstagramIcon} className="w-6 h-6" />
              <img src={FacebookIcon} className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* ==== MOBILE (<768px) ==== */}
        <div className="md:hidden px-4">

          <h2 className="font-spaceGrotesk font-bold text-[20px] mb-4">
            Kyiv Café Hub
          </h2>

          {/* 3 КОЛОНКИ */}
          <div className="flex justify-between w-full mb-4 font-satoshi text-[14px]">
            <div className="flex flex-col gap-2 max-w-[90px]">
              <a href="/">Home</a>
              <a href="/catalog">Catalog</a>
            </div>

            <div className="flex flex-col gap-2 max-w-[90px]">
              <a href="/blog">Blog</a>
              <a href="/about">About</a>
            </div>

            <div className="flex flex-col gap-2 max-w-[90px]">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/cookies-policy">Cookies Policy</a>
            </div>
          </div>

          {/* COPY + FOLLOW US */}
          <div className="flex justify-between items-start">

            <div className="font-satoshi text-[14px] opacity-80 leading-tight mt-4">
              <div>Copyright © {new Date().getFullYear()}</div>
              <div>All rights reserved.</div>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-satoshi text-[14px] mb-2">Follow us</span>
              <div className="flex gap-4">
                <img src={TiktokIcon} className="w-6 h-6" />
                <img src={InstagramIcon} className="w-6 h-6" />
                <img src={FacebookIcon} className="w-6 h-6" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};
