import { useEffect, useState } from 'react'
import { useAppState } from 'src/components/AuthProvider'
import GenericText from 'src/components/GenericText'
import Note from '../components/Note'
import ProjectLayout from '../components/ProjectLayout'
import StyledBox from '../components/StyledBox'
import { getNotes } from '../helpers/ApiHandler'
import Spacings from '../tokens/Spacings'

const HomePage = () => {
  const { state } = useAppState()
  const [notes, setNotes] = useState([])

  useEffect(() => {
    getNotes(state?.user?.id)
      .then((notes) => {
        setNotes(notes)
      })
      .catch((error) => console.log(error))
  }, [state?.user?.id])

  return (
    <ProjectLayout childrenProps={{ alignItems: 'flex-start', justifyContent: 'center' }}>
      <StyledBox
        fullWidth
        fullPadding
        flexWrap="wrap"
        direction="row"
        justify="flex-start"
        align="flex-start"
        gap={Spacings.tiny}
      >
        {notes.map((noteData: any) => (
          <Note key={noteData.id} {...noteData} />
        ))}
        {!notes?.length && <GenericText>{`There are no notes yet!`}</GenericText>}
      </StyledBox>
    </ProjectLayout>
  )
}

export default HomePage
