import React from "react";

// Props interface for CategoryFilter component
interface CategoryFilterProps {
  categories: string[]; // Array of categories to display in the filter
  onFilter: (category: string) => void; // Function to handle category filter selection
}

// Functional component CategoryFilter
const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onFilter,
}) => {
  return (
    <div className="category-filter">
      {/* Dropdown select element for category filtering */}
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="">All Categories</option>{" "}
        {/* Default option to show all categories */}
        {/* Map through categories array to display each category as an option */}
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
