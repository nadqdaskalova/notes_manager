import React, { useEffect, useState } from 'react'
import StyledBox from './StyledBox'
import Spacings from 'src/tokens/Spacings'
import styled from 'styled-components'

const NotesFilter = ({ setFilteredNotes, notes }) => {
  const [selectedDateTime, setSelectedDateTime] = useState('')
  const [filterText, setFilterText] = useState('')

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDateTime(e.target.value)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value)
  }

  useEffect(() => {
    let filtered = notes

    if (selectedDateTime) {
      filtered = filtered.filter((note) => new Date(note.createdAt) > new Date(selectedDateTime))
    }

    if (filterText.trim()) {
      const lower = filterText.toLowerCase()
      filtered = filtered.filter(
        (note) => note.title?.toLowerCase().includes(lower) || note.description?.toLowerCase().includes(lower)
      )
    }

    setFilteredNotes(filtered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDateTime, filterText, notes])

  return (
    <div>
      <StyledBox fullPadding style={{ width: 200, borderRadius: 20 }} top={Spacings.tiny} bottom={Spacings.tiny}>
        <Input type="text" placeholder="Search title or description" value={filterText} onChange={handleTextChange} />
      </StyledBox>

      <Container>
        <Label>
          Filter notes created after:
          <Input type="datetime-local" value={selectedDateTime} onChange={handleDateChange} />
        </Label>
      </Container>
    </div>
  )
}

export default NotesFilter

const Container = styled.div`
  padding: 16px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 16px;
`

const Input = styled.input`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
  width: 100%;
  box-sizing: border-box;
`
