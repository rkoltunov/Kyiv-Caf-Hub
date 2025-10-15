import { Link } from 'react-router-dom';
export default function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="mb-6">Сторінку не знайдено.</p>
      <Link to="/" className="text-primary underline">
        Повернутись на головну
      </Link>
    </div>
  );
}