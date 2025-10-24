import InstagramIcon from '../../assets/icons/instagram.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import TiktokIcon from '../../assets/icons/tiktok.svg';

export const Footer = () => {
  return (
    <footer className="bg-[#C6B0E7] rounded-t-[30px] w-full relative z-40">
      <div className="h-auto md:h-[97px] flex flex-col md:flex-row justify-between items-center md:items-end gap-6 px-6 md:px-12 py-8 md:py-6 text-center md:text-left">

        {/* Левая часть — логотип */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="font-hurricane font-bold uppercase leading-[1.1] tracking-tighter text-[clamp(1.0rem,2vw,1.3rem)] mb-2">
            Kyiv Café Hub
          </h2>
          <span className=" text-[clamp(0.7rem,1vw,0.9rem)] font-actor opacity-80">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        {/* Навигация */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-sm font-heading text-center">
  <a href="/" className="hover:text-gray-700 transition">Home</a>
  <a href="/catalog" className="hover:text-gray-700 transition">Catalog</a>
  <a href="/blog" className="hover:text-gray-700 transition">Blog</a>
  <a href="/about" className="hover:text-gray-700 transition">About</a>
</div>

        {/* Политики */}
        <div className="flex flex-wrap justify-center  gap-4 md:gap-6 text-sm md:text-sm">
          <a href="/privacy-policy" className="font-heading hover:text-gray-700 transition">Privacy Policy</a>
          <a href="/cookies-policy" className="font-heading hover:text-gray-700 transition">Cookies Policy</a>
        </div>

        {/* Соцсети */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <span className="font-heading text-sm whitespace-nowrap">Follow us</span>
          <div className="flex gap-4">
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <img src={TiktokIcon} alt="TikTok" className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src={InstagramIcon} alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src={FacebookIcon} alt="Facebook" className="w-6 h-6" />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};