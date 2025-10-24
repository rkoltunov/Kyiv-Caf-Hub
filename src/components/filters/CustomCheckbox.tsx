import CheckIcon from "../../assets/icons/tick.svg";
import { ACCENT } from "./constants";

interface Props {
  checked: boolean;
  onChange: () => void;
  label: string;
}

export const CustomCheckbox: React.FC<Props> = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer select-none ">
    <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
    <div
      className="w-5 h-5 flex items-center justify-center rounded border"
      style={{
        backgroundColor: checked ? ACCENT : "#fff",
        borderColor: checked ? ACCENT : "#d1d5db",
      }}
    >
      {checked && (
        <img src={CheckIcon} alt="check" className="w-6 h-6" />
      )}
    </div>
    <span className="text-sm text-gray-800 ">{label}</span>
  </label>
);