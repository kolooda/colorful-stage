import {defineStore} from "pinia"
import {
    reqSchoolAll,
    reqSchoolList,
    reqSchoolAdd,
    reqSchoolById,
    reqSchoolUpdate,
    reqSchoolDelete
} from "@/api/school"
import type { 
    schoolInfoData,
    schoolListFormData,
    schoolAllResponseData,
    schoolListResponseData,
    schoolResponseData
} from "@/api/school/type"
import { SchoolState } from "./types/type"
let useSchoolStore = defineStore("School",{
    state:():SchoolState=>{
        return{
            school:[]
        }
    },
    actions:{
        async getSchoolAll(){
            let result:schoolAllResponseData = await reqSchoolAll();
            if(result.status == 0){
                this.schools = (result.data as schoolInfoData[])
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        async getSchoolList(data:schoolListFormData){
            let result:schoolAllResponseData = await reqSchoolList(data);
            if(result.status == 0){
                this.schools = (result.data?.data as schoolInfoData[])
                return result.data
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        async addSchool(data:schoolInfoData){
            let result:schoolResponseData = await reqSchoolAdd(data);
            if(result.status == 0){
                this.schools = (result.data?.data as schoolInfoData[])
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        async getSchoolById(_id:string){
            let result:schoolResponseData = await reqSchoolById(_id);
            if(result.status == 0){
                return result.data
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        async updateSchool(data:schoolInfoData){
            let result:schoolResponseData = await reqSchoolUpdate(data);
            if(result.status == 0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        async deleteSchool(schoolId:string){
            let result:schoolResponseData = await reqSchoolDelete(schoolId);
            if(result.status === 0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        }
    },
    getters:{}
})
export default useSchoolStore