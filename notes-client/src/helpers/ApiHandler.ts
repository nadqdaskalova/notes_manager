import axios, { AxiosInstance } from 'axios'

export const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const register = (user: any) => api.post('/auth/signup', user).then(({ data }) => data)
export const login = (data: any) => api.post('/auth/signin', data).then(({ data }) => data)
export const refreshToken = (data: any) => api.post('/auth/refreshtoken', data).then(({ data }) => data)

export const getNotes = (userId) =>
  api
    .get('/note', {
      params: { userId }
    })
    .then(({ data }) => data)
export const getNoteById = (noteId) => api.get(`/note/${noteId}`).then(({ data }) => data)
export const createNote = (note) => api.post('/note', note).then(({ data }) => data)
export const deleteNote = (noteId) => api.delete(`/note/${noteId}`).then(({ data }) => data)
export const updateNote = (noteId, note) => api.put(`/note/${noteId}`, note).then(({ data }) => data)
