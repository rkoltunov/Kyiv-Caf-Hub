import SearchIcon from "../../assets/icons/search.svg";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div className="relative flex-grow">
      <img
        src={SearchIcon}
        alt="Search"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none  filter grayscale brightness-0 opacity-60"
      />
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        type="text"
        placeholder="Search by name, metro station, vibe..."
        className="h-[50px] pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-black placeholder-[#4F5F6B] text-[#4F5F6B]"
      />
    </div>
  );
}