import request from '@/utils/request'

export const register = (data) => {
  return request.post('/register',data)
}
/**
 * 
 * @param {object} data 账号密码字符类型 
 */
export const login = (data) => {
  return request.post('/login',data)
}

export const getstudents = () => {
  return request.get('/students')
}
export const delstudents = (id) => {
  return request.delete(`/students/${id}`)
}
export const getprovince = () => {
  return request.get(`/api/province`)
}
export const getcity = (params) => {
  return request.get(`/api/city?pname=${params.pname}`)
}
export const getarea = (params) => {
  return request.get(`/api/area?pname=${params.pname}&cname=${params.cname}`)
}
export const addstudents = (data) => {
  return request.post('/students',data)
}
export const getstudentsID = (id) => {
  return request.get(`/students/${id}`)
}
export const putstudentsID = (id,data) => {
  return request.put(`/students/${id}`,data)
}