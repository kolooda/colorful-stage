<template>
  <div>
    <div style="margin:20px 0" class="btn_box">
      <el-button type="primary" @click="handlerAdd">新增用户</el-button>
    </div>
    <el-table :data="users" style="width: 100%; height: 380px" border>
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        :formatter="resetDate"
      ></el-table-column>
      <el-table-column
        prop="role_id"
        label="所属角色"
        :formatter="formatRole"
      ></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row._id)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 添加用户对话框 -->
    <el-dialog v-model="userFormVisible" title="添加用户" width="500px">
      <el-form
        :model="user"
        ref="userFormRef"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="user.role_id" placeholder="请点击选择">
            <el-option
              v-for="option in roleOptions"
              :key="option._id"
              :label="option.name"
              :value="option._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="user._id == null ? addData(userFormRef) : updateData(userFormRef)">确定</el-button>
          <el-button @click="userFormVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox, type FormInstance,type FormRules } from "element-plus";
import type { roleInfoData } from "@/api/role/type";
import { formateDate } from "@/utils/dateUtils";
import { onMounted, ref,reactive, nextTick } from "vue";
import type { userInfoData } from "@/api/user/type";
import useRoleStore from "@/store/modules/role";
let roleStore = useRoleStore();
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();

//添加用户
const validateUserName = (rule:any,value:any,callback:any)=>{
  value = value.trim()
  const length = value && value.length
  const pwdReg = /^[a-zA-z0-9_]+$/
  if(value === ''){
    callback(new Error('请输入账号'))
  }else if(length<4||length>12){
    callback(new Error('长度在4到12个字符'))
  }else if(!pwdReg.test(value)){
    callback(new Error('账号必须是英文、数字或下划线组成'))
  }else{
    callback()
  }
}
const validatePhone = (rule:any,value:any,callback:any)=>{
  value = value.trim()
  const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if(value === ''){
    callback(new Error('请输入手机号码'))
  }else if(!phoneReg.test(value)){
    callback(new Error('请输入正确的手机号码'))
  }else{
    callback()
  }
}

//用户数据列表
const users = ref<userInfoData[] | undefined>([]);

// 新增/编辑用户数据
const user = ref<userInfoData|undefined>({
  _id:null,
  username:'',
  password:'',
  name:'',
  phone:'',
  role_id:''
})

//添加用户弹出是否显示
const userFormVisible = ref(false)
//表单元素对象，需要和el-form的ref属性值对应
const userFormRef = ref<FormInstance>()
//表单校验规则
const rules = reactive<FormRules>({
  username:[
    {
      required:true,validator:validateUserName,trigger:['blur','change']
    }
  ],
  password:[
    {required:true,message:'请输入密码',trigger:'blue'},
    {min:3,message:'密码长度需大于4位',trigger:'blur'}
  ],
  name:[{required:true,message:'请输入姓名',trigger:'blur'}],
  role_id:[{required:true,message:'请选择角色',trigger:'blur'}],
  phone:[
    {required:true,validator:validatePhone,trigger:['blur','change']}
  ]
})
//当前页面
const currentPage = ref(1);
//一页显示多少条数据
const pageSize = ref(5);
//总条数
const total = ref(0);
//当每页显示条数发生变化时回调函数
const handleSizeChange = (val: number) => {
  pageSize.value = val
  getUserList()
};
//当页码发生变化时回调函数
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  getUserList()
};

//获取角色列表
const getUserList = () => {
  userStore
    .getUserList({ page: currentPage.value, size: pageSize.value })
    .then(response => {
      users.value = userStore.users;
      total.value = (response?.total as number);
    });
};
//格式化表格中展示的时间数据
const resetDate = (row: any, column: any, cellValue: number, index: number) => {
  return formateDate(cellValue);
};

//格式化角色名称
const formatRole = (row: any, colum: any, cellValue: string, index: number) => {
  let role = roleOptions?.value?.find((item) => item._id == cellValue) || {};
  return role.name;
};

//角色列表
let roleOptions = ref<roleInfoData[] | undefined>([]);

//打开编辑窗口
const handleEdit = (_id:string) =>{
  handlerAdd()
  userStore.getUserById(_id).then(response=>{
    user.value = response
  })
}

//编辑用户
const updateData = (formEl:FormInstance | undefined)=>{
  if(!formEl) return
  formEl.validate(async(valid)=>{
    if(valid){
      userStore.updateUser((user.value as userInfoData)).then(response=>{
        userFormVisible.value = false
        getUserList()
      })
    }else{
      
    }
  })
}
const handleDelete = (_id: string) => {
  ElMessageBox.confirm(
    '确定要删除此条数据吗？',
    '提示',
    {
      confirmButtonText:'确定',
      cancelButtonText:'取消',
      type:'warning'
    }
  ).then(()=>{
    userStore.deleteUser(_id).then(response=>{
      getUserList()
      ElMessage({
        type:'success',
        message:'删除成功',
      })
    })
  })
};

//获取角色列表
const getRoleList = () => {
  if (roleStore.roles?.length) {
    roleOptions.value = roleStore.roles;
  } else {
    roleStore.roleList().then(() => {
      roleOptions.value = roleStore.roles;
    });
  }
};

//打开添加用户对话框
const handlerAdd = () =>{
  user.value={
    _id:null,
    username:'',
    password:'',
    name:'',
    phone:'',
    role_id:''
  }
  userFormVisible.value=true
  //清空表单数据
  nextTick(()=>{
    // @ts-ignore
    userFormRef.value.resetFields()
  })
}

//添加用户
const addData = (formEl:FormInstance | undefined)=>{
  if(!formEl) return
  formEl.validate(async (valid)=>{
    if(valid) {
      userStore.addUser((user.value as userInfoData)).then(response=>{
        userFormVisible.value = false
        getUserList()
      })
    }else{
      return false
    }
  })
}
onMounted(() => {
  getRoleList();
  getUserList()
});
</script>

<style scoped>

</style>