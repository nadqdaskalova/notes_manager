import { createContext, useContext, useState } from 'react'

const NotesContext = createContext<{
  notes: any[]
  addNote: (note: any) => void
  removeNote: (id: string) => void
  setNotes: (notes: any[]) => void
  updateNoteData: (id: string, updatedNote: any) => void
}>({
  notes: [],
  addNote: () => ({}),
  removeNote: () => ({}),
  setNotes: () => ({}),
  updateNoteData: () => ({})
})

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState<any>([])

  const updateNoteData = (id, updatedNote) => {
    setNotes((prevNotes) => prevNotes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note)))
  }

  const addNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note])
  }

  const removeNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))
  }

  return (
    <NotesContext.Provider value={{ notes, addNote, removeNote, setNotes, updateNoteData }}>
      {children}
    </NotesContext.Provider>
  )
}

export const useNotes = () => useContext(NotesContext)
