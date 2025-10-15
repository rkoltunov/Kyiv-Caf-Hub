import { useState, useRef } from "react";

export function useFilterState() {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Metro station": true,
    "Red Line": true,
    "Blue Line": false,
    "Green Line": false,
  });
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const contentRef = useRef<HTMLDivElement | null>(null);

  const toggleFilter = (name: string) => {
    setOpenFilter(prev => (prev === name ? null : name));
    setSearchTerm("");
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return {
    openFilter, toggleFilter,
    searchTerm, setSearchTerm,
    openSections, toggleSection,
    sectionRefs, contentRef,
  };
}