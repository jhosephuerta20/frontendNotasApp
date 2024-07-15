import axios from "./axiosConfig";
import { Note } from "../types";

// Fetch all notes
export const getNotes = async (): Promise<Note[]> => {
  const response = await axios.get("/note");
  return response.data;
};

// Create a new note
export const createNote = async (note: Omit<Note, "id">): Promise<Note> => {
  console.log("Note being sent:", note); // Log the note being sent
  const response = await axios.post("/noteNew", note);
  return response.data;
};

// Update an existing note
export const updateNote = async (note: Note): Promise<Note> => {
  console.log("Updating note:", note); // Log the note being updated
  const response = await axios.put(`/notes/${note.id}`, note);
  return response.data;
};

// Delete a note
export const deleteNote = async (id: number): Promise<void> => {
  await axios.delete(`/deleteNote/${id}`);
};

// Archive or unarchive a note
export const archiveNote = async (
  id: number,
  archived: boolean
): Promise<Note> => {
  console.log("Archiving note:", { id, archived }); // Log the note and archived status
  const response = await axios.put(`/notes/${id}`, { archived });
  return response.data;
};

// Fetch notes by archived status (active or archived)
export const getNotesByArchivedStatus = async (
  archived: boolean
): Promise<Note[]> => {
  const response = await axios.get("/notes/archived", { params: { archived } });
  return response.data;
};

// Fetch notes by category
export const getNotesByCategory = async (category: string): Promise<Note[]> => {
  const response = await axios.get(`/notes/category/${category}`);
  return response.data;
};
