export type User = {
  token: string
  id: string
  account: string
  mobile: string
  avatar: string
  refreshToken: string
}
// 短信验证码类型，登录|注册|修改手机号|忘记密码|绑定手机号
export type CodeType =
  | 'login'
  | 'register'
  | 'changeMobile'
  | 'forgetPassword'
  | 'bindMobile'

// 定义接口数据
export interface UserInfo {
  couponNumber: number
  score: number
  likeNumber: number
  collectionNumber: number
  account: string
  avatar: string
  id: string
  mobile: string
  consultationInfo: any[]
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}

export type Patient = {
  id?: string
  name: string
  idCard: string
  defaultFlag: 0 | 1
  gender: 0 | 1
  genderValue?: string
  age?: number
}

export type PatientList = Patient[]
