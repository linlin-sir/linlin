import request from '@/utils/request'

/**
 *  获取员工的简单列表 (id username)
 * **/
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
export function getEmployee(params) {
  return request({
    url: '/sys/user',
    params
  })
}

export function importEmployees(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
export function removeEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
