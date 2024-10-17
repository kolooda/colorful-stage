import request from "@/utils/request"
import type {
  loginFormData,
  loginResponseData,
  pwdData,
  checkPwdResponseData,
  userListFormData,
  userAllResponseData,
  userListResponseData,
  userInfoData
} from "./type"

enum API {
  LOGIN_URL="/login",
  LOGOUT_URL="/logout",
  CHECK_PWD_URL = "/manage/user/pwd",
  UPDATE_PWD_URL = "/manage/user/pwd",
  USER_ALL_URL="/manage/user/all",
  USER_LIST_URL="/manage/user/list",
  USER_ADD_URL="/manage/user/add",
  USER_GET_ID_URL="/manage/user/find",
  USER_UPDATE_URL="/manage/user/update",
  USER_DELETE_URL="/manage/user/delete"
}

export const reqLogin = (data:loginFormData)=>
  request.post<any,loginResponseData>(API.LOGIN_URL,data)

export const reqLogout = ()=>request.post<any,any>(API.LOGOUT_URL)

export const reqCheckPwd = (data:pwdData)=>
  request.post<any,checkPwdResponseData>(API.CHECK_PWD_URL,data)

export const reqUpdatePwd = (data:pwdData)=>
  request.put<any,checkPwdResponseData>(API.UPDATE_PWD_URL,data)

export const reqUserAll = ()=>
  request.get<any,userAllResponseData>(API.USER_ALL_URL)

export const reqUserList = (data:userListFormData)=>
  request.post<any,userListResponseData>(API.USER_LIST_URL,data)

export const reqUserAdd = (data:userInfoData)=>
  request.post<any,loginResponseData>(API.USER_ADD_URL,data)

export const reqUserById = (_id:string)=>
  request.get<any,loginResponseData>(API.USER_GET_ID_URL+`?_id=${_id}`)

export const reqUserUpdate=(data:userInfoData)=>
  request.post<any,loginResponseData>(API.USER_UPDATE_URL,data)

export const reqUserDelete = (userId:string)=>
  request.post<any,loginResponseData>(API.USER_DELETE_URL,{userId})