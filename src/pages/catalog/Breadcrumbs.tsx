import React from "react";

interface BreadcrumbsProps {
  activeFilters: string[];
}

export default function Breadcrumbs({ activeFilters }: BreadcrumbsProps) {
  // Если фильтры выбраны — показываем их, иначе показываем "All cafes"
  const hasFilters = activeFilters && activeFilters.length > 0;

  return (
    <nav className="text-[#5C717E] text-sm mb-4 flex flex-wrap items-center">
      <span className="mx-1">Catalog</span>
      <span>/</span>
      {hasFilters ? (
        activeFilters.map((filter, index) => (
          <React.Fragment key={index}>
            <span className="font text-black mx-1">{filter}</span>
            {index < activeFilters.length - 1 && (
              <span>/</span>
            )}
          </React.Fragment>
        ))
      ) : (
        <span className="font text-black mx-1">All cafes</span>
      )}
    </nav>
  );
}