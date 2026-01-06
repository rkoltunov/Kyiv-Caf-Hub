import React, { useState } from "react";
import ChevronDownIcon from "../../assets/icons/arrow-down.svg";
import ChevronRightIcon from "../../assets/icons/arrow-right.svg";
import { CustomCheckbox } from "./CustomCheckbox";

interface Props {
  line: string;
  stations: string[];
  searchTerm: string;
  openSections: Record<string, boolean>;
  toggleSection: (line: string) => void;
  selectedStations: string[];
  onToggle: (station: string) => void;
}

export const StationsGroup: React.FC<Props> = ({
  line, stations, searchTerm, openSections, toggleSection, selectedStations, onToggle,
}) => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? stations : stations.slice(0, 4);
  const hidden = stations.length - 4;

  return (
    <div className="">
<button
  onClick={() => toggleSection(line)}
  className="flex justify-between items-start text-left text-[#3D464D] w-full text-lg font-semibold pl-4 p-4 pb"
>

        <span>{line}</span>
        <img src={openSections[line] ? ChevronDownIcon : ChevronRightIcon} className="w-6 h-6" alt="" />
      </button>

      {openSections[line] && (
        <div
  className="grid gap-x-2 gap-y-4 pl-4 pt-4"
  style={{
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  }}
>
          {visible
            .filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(station => (
              <CustomCheckbox
                key={station}
                checked={selectedStations.includes(station)}
                onChange={() => onToggle(station)}
                label={station}
              />
            ))}
          {!showAll && hidden > 0 && (
            <button onClick={() => setShowAll(true)} className="font-heading font-medium text-sm underline text-left col-span-full">
              + {hidden} more
            </button>
          )}
        </div>
      )}
    </div>
  );
};