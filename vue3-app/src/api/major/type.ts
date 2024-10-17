export interface majorInfoData {
  _id?:string|null,
  majorname:string,
  __v?:number
}
export interface majorListFormData {
  page:number,
  size:number
}
export interface majorResponseData{
  status:number,
  data?:majorInfoData,
  msg?:string
}
export interface majorAllRespsonseData {
  status:number,
  data?:majorInfoData[],
  msg?:string
}
export interface majorListResponseData{
  status:number,
  data?:majorListData,
  msg?:stirng
}
interface majorListData{
  data:majorInfoData[],
  total:number
}