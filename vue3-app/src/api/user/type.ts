export interface loginFormData{
  username:string,
  password:string
}

interface dataType{
  token?:string|null
}

export interface loginResponseData{
  status:number,
  data?:userInfoData,
  msg?:string
}
interface userRoleData{
  _id?:string,
  name?:string,
  menus:string[],
  create_time?:number,
  __v?:number,
  auth_time?:number,
  auth_name?:string
}

export interface userInfoData{
  _id:string,
  username:string,
  name?:string,
  password:string,
  phone?:string,
  role_id?:string,
  create_time:number,
  token:string,
  __v:number,
  role:userRoleData
}
export interface userInfoResponseData{
  status:number,
  data:userInfoData
}

export interface pwdData{
  userId:string,
  password:string
}

export interface checkPwdResponseData{
  status:number,
  data?:userInfoData,
  msg?:string
}

export interface userListFormData{
  page:number,
  size:number
}
export interface userAllResponseData{
  status:number,
  data?:userInfoData[],
  msg?:string
}
export interface userListResponseData{
  status:number,
  data?:userListData,
  msg?:string
}
export interface userListData{
  data:userInfoData[],
  roles:[],
  total:number
}