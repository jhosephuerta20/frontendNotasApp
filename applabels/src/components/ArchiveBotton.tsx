import React from "react";

// Props interface for ArchiveButton component
interface ArchiveButtonProps {
  archived: boolean; // Boolean flag indicating if the note is archived
  onToggleArchive: () => void; // Function to toggle the archive status
}

// Functional component ArchiveButton
const ArchiveButton: React.FC<ArchiveButtonProps> = ({
  archived,
  onToggleArchive,
}) => {
  return (
    <button onClick={onToggleArchive} className="archive-button">
      {/* Display "Unarchive" if archived is true, otherwise "Archive" */}
      {archived ? "Unarchive" : "Archive"}
    </button>
  );
};

export default ArchiveButton;
