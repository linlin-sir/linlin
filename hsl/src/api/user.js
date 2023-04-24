import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取当前登录用户的基本信息
export function getUserInfo() {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

// 根据 id 获取员工详情
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
