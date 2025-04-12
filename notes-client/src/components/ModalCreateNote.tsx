/* eslint-disable no-restricted-imports */
import { yupResolver } from '@hookform/resolvers/yup'
import { Close } from '@mui/icons-material'
import { Button } from '@mui/material'
import isEqual from 'fast-deep-equal'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import routePaths from 'src/config/RoutePaths'
import { useNotes } from 'src/NotesContext'
import Colors from 'src/tokens/Colors'
import Shadows from 'src/tokens/Shadows'
import Spacings from 'src/tokens/Spacings'
import styled from 'styled-components'
import * as Yup from 'yup'
import { createNote, updateNote } from '../helpers/ApiHandler'
import BorderRadius from '../tokens/BorderRadius'
import { useAppState } from './AuthProvider'
import { TextFieldController } from './HookFormComponents'
import StyledBox from './StyledBox'

interface IModalCreateNote {
  closeModal: () => void
  type?: 'update' | 'create'
  note?: {
    id: string
    title: string
    description: string
  }
}

interface ICreateNoteValues {
  title: string
  description: string
}

const ModalCreateNote: React.FC<IModalCreateNote> = ({ closeModal, note = {} as any, type = 'create' }) => {
  const navigate = useNavigate()
  const { state } = useAppState()
  const { updateNoteData, addNote } = useNotes()

  const defaultValues = useMemo(
    () => ({
      title: note?.title || '',
      description: note?.description || ''
    }),
    [note]
  )

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required')
      }),
    []
  )

  const { handleSubmit, control } = useForm<ICreateNoteValues>({
    defaultValues,
    shouldUnregister: true,
    resolver: yupResolver(validationSchema)
  })

  const handleCreateNote = (data: ICreateNoteValues) => {
    if (type === 'update') {
      updateNote(note?.id, { ...data, userId: state?.user?.id })
        .then(() => {
          updateNoteData(note?.id, { ...data, userId: state?.user?.id })
          // navigate(routePaths.entry)
          closeModal()
          // window.location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
      return
    }

    createNote({ ...data, userId: state?.user?.id })
      .then((noteCreated) => {
        // navigate(routePaths.entry)
        addNote({ ...noteCreated })
        closeModal()
        // window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <ModalWrapper fullWidth align="center" justify="center" spacing={Spacings.min} fullPadding position="relative">
      <StyledBox fullPadding spacing={Spacings.large} fullWidth gap={Spacings.tiny}>
        <TextFieldController control={control} name="title" placeholder={'Title'} />
        <TextFieldController control={control} name="description" placeholder={'Description'} />
        <StyledButton onClick={handleSubmit((data) => handleCreateNote({ ...defaultValues, ...data }))}>
          {type === 'create' ? 'Add Note' : 'Update Note'}
        </StyledButton>
      </StyledBox>
      <CloseButton position="absolute" onClick={closeModal} pointer radius="rounded" transition>
        <Close />
      </CloseButton>
    </ModalWrapper>
  )
}

export default React.memo(ModalCreateNote, isEqual)

const ModalWrapper = styled(StyledBox)`
  min-width: 400px;
`

const CloseButton = styled(StyledBox)`
  top: ${Spacings.min};
  right: ${Spacings.min};

  &:hover {
    box-shadow: ${Shadows.regular};
    color: ${Colors.baseRed};
  }
`

const StyledButton = styled(Button)`
  &&& {
    border-radius: ${BorderRadius.rounded};
    padding: ${Spacings.tiny};
    box-shadow: ${Shadows.regularMed};
    background-image: ${Colors.linearMainColor};
    color: ${Colors.snow};
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    transform: scale(1.05);
  }
`
