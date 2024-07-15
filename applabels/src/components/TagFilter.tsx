import React, { useState } from "react";

interface TagFilterProps {
  onFilter: (tag: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ onFilter }) => {
  const [tag, setTag] = useState("");

  const handleFilter = () => {
    onFilter(tag);
  };

  return (
    <div className="mb-4">
      <input
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Filter by tag"
        className="w-full p-2 mb-2 border rounded-md"
      />
      <button
        onClick={handleFilter}
        className="w-full py-2 bg-blue-500 text-white rounded-md"
      >
        Filter
      </button>
    </div>
  );
};

export default TagFilter;
