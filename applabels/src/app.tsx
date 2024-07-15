import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import TagFilter from "./components/TagFilter";
import CategoryFilter from "./components/CategoryFilter";
import { Note } from "./types";
import "./styles/index.css";
import { getNotes, createNote, updateNote, deleteNote } from "./api/notes";

// Functional component App
const App: React.FC = () => {
  // State variables for managing notes and their filtering
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch notes from API when component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await getNotes();
        setNotes(notes);
        setFilteredNotes(notes); // Initialize filteredNotes with all notes
        // Extract unique categories from notes
        const allCategories = new Set<string>();
        notes.forEach((note) =>
          note.categories.forEach((cat) => allCategories.add(cat))
        );
        setCategories(Array.from(allCategories)); // Convert Set to Array for state
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  // Function to add a new note
  const handleAddNote = async (note: Omit<Note, "id">) => {
    try {
      const newNote = await createNote(note);
      setNotes([...notes, newNote]); // Add new note to notes state
      setFilteredNotes([...notes, newNote]); // Update filteredNotes with new note
      // Update categories with new categories from the new note
      setCategories(
        Array.from(new Set([...categories, ...newNote.categories]))
      );
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Function to update an existing note
  const handleUpdateNote = async (updatedNote: Note) => {
    try {
      const note = await updateNote(updatedNote);
      // Update notes and filteredNotes with updated note
      const updatedNotes = notes.map((n) => (n.id === note.id ? note : n));
      setNotes(updatedNotes);
      setFilteredNotes(updatedNotes);
      setEditingNote(null); // Clear editingNote after update
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Function to delete a note
  const handleDeleteNote = async (id: number) => {
    try {
      await deleteNote(id);
      // Update notes and filteredNotes by filtering out the deleted note
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      setFilteredNotes(filteredNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Function to filter notes by tag
  const handleFilterNotesByTag = (tag: string) => {
    if (!tag) {
      setFilteredNotes(notes); // Show all notes if tag is empty
    } else {
      setFilteredNotes(notes.filter((note) => note.tag === tag)); // Filter notes by tag
    }
  };

  // Function to filter notes by category
  const handleFilterNotesByCategory = (category: string) => {
    if (!category) {
      setFilteredNotes(notes); // Show all notes if category is empty
    } else {
      setFilteredNotes(
        notes.filter((note) => note.categories.includes(category))
      ); // Filter notes by category
    }
  };

  // Function to set editingNote when editing a note
  const handleEditNote = (note: Note) => {
    setEditingNote(note);
  };

  // Function to toggle archive status of a note
  const handleToggleArchive = async (note: Note) => {
    try {
      const updatedNote = { ...note, archived: !note.archived };
      await updateNote(updatedNote);
      // Update notes and filteredNotes with updated note
      const updatedNotes = notes.map((n) =>
        n.id === note.id ? updatedNote : n
      );
      setNotes(updatedNotes);
      setFilteredNotes(updatedNotes);
    } catch (error) {
      console.error("Error archiving/unarchiving note:", error);
    }
  };

  // Render the application UI
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notes App</h1>
      {/* Form component to add and edit notes */}
      <NoteForm
        addNote={handleAddNote}
        updateNote={handleUpdateNote}
        editingNote={editingNote}
      />
      {/* Component for filtering notes by tag */}
      <TagFilter onFilter={handleFilterNotesByTag} />
      {/* Component for filtering notes by category */}
      <CategoryFilter
        categories={categories}
        onFilter={handleFilterNotesByCategory}
      />
      {/* Component to display non-archived notes */}
      <NoteList
        notes={filteredNotes.filter((note) => !note.archived)}
        onDeleteNote={handleDeleteNote}
        onEditNote={handleEditNote}
        onToggleArchive={handleToggleArchive}
      />
      <h2 className="text-xl font-bold mb-4">Archived Notes</h2>
      {/* Component to display archived notes */}
      <NoteList
        notes={filteredNotes.filter((note) => note.archived)}
        onDeleteNote={handleDeleteNote}
        onEditNote={handleEditNote}
        onToggleArchive={handleToggleArchive}
      />
    </div>
  );
};

export default App;
