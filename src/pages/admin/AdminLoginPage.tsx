import { useStore } from "../../app/store";
import { login } from "../../api/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow, noarchive";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setToken = useStore((s) => s.setToken);
  const setAdminMode = useStore((s) => s.setAdminMode); // 🟣 добавили
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);
      const token = data?.token ?? (typeof data === "string" ? data : null);
      if (!token) {
        throw new Error("Token not returned by server");
      }

      // ✅ теперь явно ставим режим админки
      setAdminMode(true);
      setToken(token);

      navigate("/admin/cafes");
    } catch (err) {
      setError("Неверный email или пароль");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Вход в админку</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Пароль"
          className="w-full mb-4 p-3 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
