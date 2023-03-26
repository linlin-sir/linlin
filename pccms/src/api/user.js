import request from '@/utils/request'

export const login = (data) => {
  return request.post('/auth/login', data)
}
export const getUser = () => {
  return request.get('/auth/currentUser')
}