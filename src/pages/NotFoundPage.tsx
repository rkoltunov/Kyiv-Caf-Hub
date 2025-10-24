import { Link } from "react-router-dom";
import Cup from "../assets/icons/hot.png";
import Macaroon from "../assets/home/404/macaroon.svg";
import Macaroonbig from "../assets/home/404/macaroonbig.svg";

export default function NotFoundPage() {
  return (
    <section className="flex justify-center items-center bg-[#F9F8F5] px-4 md:px-[96px] lg:px-[192px] py-[80px] md:py-[120px] lg:py-[163px] rounded-[30px] overflow-hidden">
      <div className="flex flex-col-reverse xl:flex-row items-center w-full max-w-[1056px]">
        {/* === Левая часть: текст === */}
        <div className="flex flex-col items-start text-left max-w-[480px] mb-16 lg:mb-0 lg:mr-10">
          <h2 className="font-heading text-[28px] md:text-[36px] lg:text-[48px] font-medium uppercase leading-[1.1] mb-6 text-[#111]">
            Someone spilled espresso all over this page...
          </h2>

          <p className="text-[#5C717E] text-[16px] md:text-[18px] font-bold leading-snug mb-6">
            But you can still find a place where coffee is served — flawlessly
            <img
              src={Cup}
              alt="coffee cup"
              className="ml-1 inline-block w-5 h-5 align-text-bottom"
            />
          </p>

          <Link
            to="/catalog"
            className="bg-black text-white text-base text-center w-[208px] py-3 rounded-full hover:bg-gray-800 transition font-heading"
          >
            Catalog
          </Link>
        </div>

        {/* === Правая часть: 404 === */}
        <div className="flex items-center justify-center text-[#3D464D] mb-[72px] font-heading font-medium text-[120px] md:text-[180px] lg:text-[256px] leading-[0.9] tracking-[17px]">
          {/* Первая 4 */}
          <span className="relative inline-block">
            <span className="relative z-10">4</span>
            <img
              src={Macaroon}
              alt="coffee"
              className="absolute left-[44%] top-[59%] translate-x-[-50%] translate-y-[-50%]"
            />
          </span>

          {/* Ноль */}
          <span className="relative inline-block">
            0
            <img
              src={Macaroonbig}
              alt="coffee"
              className="absolute left-[62%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            />
          </span>

          {/* Вторая 4 */}
          <span className="relative inline-block">
            <span className="relative z-10">4</span>
            <img
              src={Macaroon}
              alt="coffee"
              className="absolute left-[44%] top-[59%] translate-x-[-50%] translate-y-[-50%]"
            />
          </span>
        </div>
      </div>
    </section>
  );
}