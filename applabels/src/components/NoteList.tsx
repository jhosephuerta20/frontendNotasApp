import React from "react";
import { Note } from "../types";

// Interface for the props that NoteList component receives
interface NoteListProps {
  notes: Note[]; // Array of notes to display
  onDeleteNote: (id: number) => void; // Function to delete a note by id
  onEditNote: (note: Note) => void; // Function to edit a note
  onToggleArchive: (note: Note) => void; // Function to toggle archive status of a note
}

// Functional component NoteList
const NoteList: React.FC<NoteListProps> = ({
  notes,
  onDeleteNote,
  onEditNote,
  onToggleArchive,
}) => {
  return (
    <div>
      {/* Map through the notes array and render each note */}
      {notes.map((note) => (
        <div
          key={note.id} // Unique key for each note
          className="p-4 bg-gray-100 shadow-md rounded-lg mb-4"
        >
          {/* Display the title of the note */}
          <h2 className="text-lg font-bold">{note.title}</h2>
          {/* Display the content of the note */}
          <p>{note.content}</p>
          {/* Display the tag of the note */}
          <p className="text-sm text-gray-500">{note.tag}</p>
          {/* Display the user associated with the note */}
          <p className="text-sm text-gray-500">{note.users}</p>
          {/* Button to edit the note */}
          <button
            onClick={() => onEditNote(note)}
            className="mr-2 bg-blue-500 text-white p-2 rounded-md"
          >
            Edit
          </button>
          {/* Button to delete the note */}
          <button
            onClick={() => onDeleteNote(note.id)}
            className="mr-2 bg-red-500 text-white p-2 rounded-md"
          >
            Delete
          </button>
          {/* Button to toggle archive status of the note */}
          <button
            onClick={() => onToggleArchive(note)} // Handle toggle archive event
            className="bg-yellow-500 text-white p-2 rounded-md"
          >
            {/* Display "Unarchive" if note is archived, otherwise "Archive" */}
            {note.archived ? "Unarchive" : "Archive"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
