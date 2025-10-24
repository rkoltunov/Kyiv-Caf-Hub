import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card } from './Card';

type CafeCardProps = {
  id: number | string;
  title: string;
  metro?: string;
  description?: string;
  image?: string;
  className?: string;
};

export const CafeCard: FC<CafeCardProps> = ({ 
  id, 
  title, 
  metro, 
  image, 
  className = '' 
}) => {
  return (
    <Card className={`    flex flex-col overflow-hidden p-0 
    w-full max-w-[300px] sm:max-w-[320px]
    bg-[#F9F8F5]  
    transition-transform hover:scale-[1.02]${className}`}>
      {/* Фото (кликабельно) */}
      <Link 
        to={`/cafes/${id}`} 
        className="w-full aspect-[4/5] mb-4 border border-gray-300 rounded-[12px] p-4 block"
      >
        <div
          className="w-full h-full rounded-[8px] overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: image ? `url(${image})` : undefined,
          }}
        >
          {!image && (
            <div className="w-full h-full flex items-center justify-center rounded-[8px]">
              <span className="text-gray-600 font-semibold">Фото</span>
            </div>
          )}
        </div>
      </Link>

      {/* Контент */}
      <div className="flex flex-col flex-1">
        {/* Метро */}
        {metro && (
          <div className="mb-2">
            <span className="inline-block px-3 rounded-[8px] text-gray-700 border border-gray-300 font-medium text-lg">
              {metro}
            </span>
          </div>
        )}

        {/* Название */}
        <h3 className="font-semibold text-lg md:text-xl mb-4">{title}</h3>

        {/* Кнопка */}
        <Link to={`/cafes/${id}`} className="flex justify-start mt-auto">
          <div className="flex items-center gap-2">
            <span className="font-heading font-medium underline decoration-2 underline-offset-4">
              See cafe
            </span>
            <svg 
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>
      </div>
    </Card>
  );
};