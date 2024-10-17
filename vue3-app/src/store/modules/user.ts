import {defineStore} from "pinia"
import {
  reqLogin,
  reqUserAdd,
  reqUserAll,
  reqUserList,
  reqUserById,
  reqUserUpdate,
  reqUserDelete
} from "@/api/user"
import type {
  loginFormData,
  loginResponseData,
  userInfoData,
  userAllResponseData,
  userListFormData,
  userListResponseData
} from "@/api/user/type"
import {UserState} from "./types/type"
let useUserStore = defineStore("User",{
  state:():UserState=>{
    return {
      // token:localStorage.getItem("VUE3-TOKEN"),
      user:JSON.parse((localStorage.getItem("VUE3-USER") as string)),
      users:[]
    }
  },
  actions:{
    async userLogin(data:loginFormData){
      let result:loginResponseData = await reqLogin(data);
      if(result.status === 0){
        // this.token = (result.data.token as string)
        this.user = (result.data as userInfoData)
        // localStorage.setItem("VUE3-TOKEN",(result.data.token as string))
        localStorage.setItem("VUE3-USER",(JSON.stringify(result.data) as string))
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    removeUser(){
      this.user = null;
      localStorage.removeItem("VUE3-USER")
    },
    async getUserAll(){
      let result:userAllResponseData = await reqUserAll()
      if(result.status == 0){
        this.users = (result.data as userInfoData[])
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async getUserList(data:userListFormData){
      let result:userListResponseData = await reqUserList(data);
      if(result.status == 0){
        this.users = (result.data?.data as userInfoData[])
        return result.data
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async addUser (data:userInfoData){
      let result:loginResponseData = await reqUserAdd(data);
      if(result.status == 0){
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async getUserById(_id:string){
      let result:loginResponseData = await reqUserById(_id);
      if(result.status === 0){
        return result.data
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async updateUser(data:userInfoData){
      let result:loginResponseData = await reqUserUpdate(data);
      if(result.status === 0){
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async deleteUser(userId:string){
      let result:loginResponseData = await reqUserDelete(userId);
      if(result.status === 0){
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    }
  },
  getters:{
    
  }
})
export default useUserStore