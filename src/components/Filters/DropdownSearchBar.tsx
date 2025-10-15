import SearchIcon from "../../assets/icons/search.svg";

interface DropdownSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DropdownSearchBar({ value, onChange }: DropdownSearchBarProps) {
  return (
    <div className="relative">
      <img
        src={SearchIcon}
        alt="Search"
        className="absolute left-3 top-1/2 transform -translate-y-1/4 w-6 h-6 pointer-events-none filter grayscale brightness-0 opacity-60"
      />
      <input
        type="text"
        id="search" 
          name="search" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className="w-full h-[48px] border rounded-full pl-10 mt-4 pr-1 text-sm focus:outline-none focus:ring-2 focus:ring-black placeholder-[#4F5F6B] text-[#4F5F6B]"
      />
    </div>
  );
}