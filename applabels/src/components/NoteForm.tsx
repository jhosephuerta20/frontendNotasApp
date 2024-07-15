import React, { useState, useEffect } from "react";
import { Note } from "../types";

// Definition of the props that the NoteForm component receives
interface NoteFormProps {
  addNote: (note: Omit<Note, "id">) => void;
  updateNote?: (note: Note) => void;
  editingNote?: Note | null;
}

// NoteForm functional component
const NoteForm: React.FC<NoteFormProps> = ({
  addNote,
  updateNote,
  editingNote,
}) => {
  // Definition of the states for the form fields
  const [title, setTitle] = useState<string>(editingNote?.title || "");
  const [content, setContent] = useState<string>(editingNote?.content || "");
  const [tag, setTag] = useState<string>(editingNote?.tag || "");
  const [users, setUser] = useState<string>(editingNote?.users || "");
  const [categories, setCategories] = useState<string[]>(
    editingNote?.categories || []
  );

  // useEffect to update form fields if the note being edited changes
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || "");
      setContent(editingNote.content || "");
      setTag(editingNote.tag || "");
      setUser(editingNote.users || "");
      setCategories(editingNote.categories || []);
    }
  }, [editingNote]);

  // Form submit handler function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default form behavior (page reload)

    // Creating a new note object without the "id" field
    const newNote: Omit<Note, "id"> = {
      title,
      content,
      tag,
      users,
      archived: false,
      categories,
    };

    // If a note is being edited, the update function is called, otherwise a new note is added
    if (editingNote && updateNote) {
      updateNote({ ...editingNote, ...newNote });
    } else {
      addNote(newNote);
    }

    // Cleaning form fields after adding/updating note
    setTitle("");
    setContent("");
    setTag("");
    setUser("");
    setCategories([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-md rounded-lg mb-4"
    >
      {/* Input field for user */}
      <input
        type="text"
        value={users}
        onChange={(e) => setUser(e.target.value)}
        placeholder="User"
        className="w-full p-2 mb-2 border rounded-md"
      />
      {/* Input field for title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 mb-2 border rounded-md"
      />
      {/* Text area for content */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="w-full p-2 mb-2 border rounded-md"
      />
      {/* Input field for label */}
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Tag"
        className="w-full p-2 mb-2 border rounded-md"
      />
      {/* Entry field for categories, separated by commas */}
      <input
        type="text"
        value={categories.join(", ")}
        onChange={(e) =>
          setCategories(e.target.value.split(", ").map((c) => c.trim()))
        }
        placeholder="Categories (comma separated)"
        className="w-full p-2 mb-2 border rounded-md"
      />
      {/* Submit button to save or update the note */}
      <button
        type="submit"
        className="mt-4 w-full py-2 bg-green-500 text-white rounded-md"
      >
        {editingNote ? "Update Note" : "Save Note"}
      </button>
    </form>
  );
};

export default NoteForm;
