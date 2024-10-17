export interface getRoleListResponseData{
  status:number,
  data?:roleInfoData[],
  msg?:string
}
export interface roleInfoData{
  _id?:string,
  name:string,
  menus?:string[],
  create_time:number,
  __v:number,
  auth_time?:number,
  auth_name:string
}
export interface addRoleResponseData{
  status:number,
  data?:roleInfoData,
  msg?:string
}