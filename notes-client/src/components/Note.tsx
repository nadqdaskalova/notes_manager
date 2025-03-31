// eslint-disable-next-line no-restricted-imports
import { Delete } from '@mui/icons-material'
import { useState } from 'react'
import { deleteNote } from 'src/helpers/ApiHandler'
import styled from 'styled-components'
import { useAppState } from '../components/AuthProvider'
import GenericText from '../components/GenericText'
import StyledBox from '../components/StyledBox'
import Spacings from '../tokens/Spacings'
import GenericModal from './GenericModal'
import ModalCreateNote from './ModalCreateNote'

const Note = ({ id, title, description, createdAt, userId }) => {
  const { state } = useAppState()
  const [showCreateNote, setShowCreateNote] = useState(false)

  const handleDeleteNote = () => {
    deleteNote(id)
      .then(() => {
        setShowCreateNote(false)
        // window.location.reload()
      })
      .catch((error) => console.log(error))
  }

  const isOwner = userId === state.user?.id
  return (
    <>
      <GenericModal open={showCreateNote} onClose={() => setShowCreateNote(false)}>
        <ModalCreateNote
          closeModal={() => setShowCreateNote(false)}
          type="update"
          note={{
            id,
            title,
            description
          }}
        />
      </GenericModal>
      <Wrapper fullPadding justify="flex-start" align="flex-start" gap={Spacings.tiny} pointer>
        <StyledBox gap={Spacings.min}>
          <GenericText
            bold
            style={{
              fontSize: '20px'
            }}
          >
            {title}
          </GenericText>
          <GenericText truncate={3} weight={'400'}>
            {description}
          </GenericText>
          <GenericText smallText weight={'300'}>
            {new Date(createdAt).toLocaleString()}{' '}
          </GenericText>
          {isOwner && (
            <StyledBox pointer>
              <Delete onClick={handleDeleteNote} />
            </StyledBox>
          )}
          {isOwner && (
            <StyledBox
              style={{
                borderRadius: 20,
                padding: '5px 10px',
                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)'
              }}
              pointer
              onClick={() => setShowCreateNote(true)}
            >
              Update Note
            </StyledBox>
          )}
        </StyledBox>
      </Wrapper>
    </>
  )
}

export default Note

const Wrapper = styled(StyledBox)`
  width: 250px;
  height: 250px;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`
