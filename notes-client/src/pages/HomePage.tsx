import { useEffect, useState } from 'react'
import { useAppState } from 'src/components/AuthProvider'
import GenericText from 'src/components/GenericText'
import NotesFilter from 'src/components/NotesFilter'
import { useNotes } from 'src/NotesContext'
import Note from '../components/Note'
import ProjectLayout from '../components/ProjectLayout'
import StyledBox from '../components/StyledBox'
import { getNotes } from '../helpers/ApiHandler'
import Spacings from '../tokens/Spacings'

const HomePage = () => {
  const { state } = useAppState()
  const { notes, setNotes } = useNotes()
  const [filteredNotes, setFilteredNotes] = useState([])

  useEffect(() => {
    getNotes(state?.user?.id)
      .then((notes) => {
        setNotes(notes)
      })
      .catch((error) => console.log(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.user?.id])

  return (
    <ProjectLayout childrenProps={{ alignItems: 'flex-start', justifyContent: 'center', direction: 'column' }}>
      <NotesFilter setFilteredNotes={setFilteredNotes} notes={notes} />
      <StyledBox
        fullWidth
        fullPadding
        flexWrap="wrap"
        direction="row"
        justify="flex-start"
        align="flex-start"
        gap={Spacings.tiny}
      >
        {filteredNotes.map((noteData: any) => (
          <Note key={noteData.id} {...noteData} />
        ))}
        {!filteredNotes?.length && <GenericText>{`There are no notes yet!`}</GenericText>}
      </StyledBox>
    </ProjectLayout>
  )
}

export default HomePage
