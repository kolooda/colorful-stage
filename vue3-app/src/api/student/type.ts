export interface studentInfoData {
  _id?:string|null,
  name: string,
  gender: string,
  school?: string,
  major?: string,
  grade?:string,
  education?:string,
  direction: string,
  id_number?:string,
  phone?: string,
  parent?: string,
  parent_phone?: string,
  address?:string ,
  qq?: string,
  class: string,
  admission_date:string,
  teacher_id: string,
  manager_id: string,
  pictures?:string[],
  note?:string ,
  __v?:number  
}
export interface studentListFormData{
  page:number,
  size:number,
  searchMap:searchMapData
}
interface searchMapData{
  name:string,
  direction:string,
  teacher_id?:string,
  manager_id?:string,
  class:string
}

export interface studentResponseData{
  status:number,
  data?:studentInfoData,
  msg?:string
}

export interface studentAllResponseData{
  status:number,
  data?:studentInfoData[],
  msg?:string
}

export interface studentListResponseData{
  status:number,
  data?:sutdentListData,
  msg?:string
}
interface sutdentListData{
  data:studentInfoData[],
  total:number
}

interface monthData{
  _id:string,
  count:number
}

export interface studentYearResponseData{
  status:string,
  data:monthData[]
}