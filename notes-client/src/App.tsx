import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { NotesProvider } from './NotesContext'
import Router from './Router'

const App: React.FC = () => (
  <NotesProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <HelmetProvider>
        <Router />
      </HelmetProvider>
    </LocalizationProvider>
  </NotesProvider>
)

export default App
