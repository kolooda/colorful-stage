<template>
  <div>
    <div style="margin: 20px 0" class="btn_box">
      <el-button type="primary" @click="handleAdd">创建角色</el-button>
      <el-button type="primary" :disabled="currentRow == null ? true : false"
      @click="roleAuthVisible = true"
        >设置角色权限</el-button
      >
    </div>
    <el-table
      class="role_table"
      ref="singleTable"
      :data="roleList"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
      border
      height="380"
    >
      <el-table-column type="index" width="60" label="序号"></el-table-column>
      <el-table-column property="name" label="角色名称"></el-table-column>
      <el-table-column
        property="create_time"
        label="创建时间"
        :formatter="resetDate"
      ></el-table-column>
      <el-table-column
        property="auth_time"
        label="授权时间"
        :formatter="resetDate"
      ></el-table-column>
      <el-table-column property="auth_name" label="授权人"></el-table-column>
    </el-table>
    <!-- 添加角色对话框 -->
    <el-dialog v-model="roleFormVisible" title="添加角色" width="500px">
      <el-form
        :model="role"
        ref="roleFormRef"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="role.name" placeholder="请输入角色名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addData(roleFormRef)">
            确定
          </el-button>
          <el-button @click="roleFormVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 设置角色权限弹窗 -->
    <el-dialog v-model="roleAuthVisible" title="这是角色权限" width="500px">      
      <Auth :role="currentRow" v-if="roleAuthVisible" ref="authRef"></Auth>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="updateData">确定</el-button>
          <el-button @click="roleAuthVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import Auth from "./components/Auth.vue"
import useUserStore from "@/store/modules/user";
import {FormInstance,FormRules} from "element-plus"
import { reactive, ref, onMounted,nextTick } from "vue";
import { formateDate } from "@/utils/dateUtils";
const resetDate = (row: any, column: any, cellValue: number, index: number) => {
  return formateDate(cellValue);
};
import type { roleInfoData } from "@/api/role/type";
import useRoleStore from "@/store/modules/role";
//角色小仓库
let useStore = useRoleStore();
let userStore = useUserStore()
// 当前选中的行
let currentRow = ref(null);
//获取数据列表
let roleList = ref<roleInfoData[]|undefined>([]);
let role = reactive({
  name:"",
})



const rules = reactive<FormRules>({
  name:[{required:true,message:"请输入角色名称",trigger:"blur"}],
})
const roleFormVisible = ref(false);
const roleAuthVisible = ref(false)
const roleFormRef = ref<FormInstance>()

//确定选中的是哪一行
const handleCurrentChange = (val: any) => {
  currentRow.value = val;
};

const handleAdd = () => {
  roleFormVisible.value = true;
  nextTick(()=>{
    roleFormRef.value.resetFields()
  })
};
const addData = (formEl:FormInstance|undefined)=>{
  if(!formEl) return 
  formEl.validate(async (valid)=>{
    if(valid){
      useStore.useAddRole(role).then(response=>{
        roleFormVisible.value = false;
        getRoleList()
      })
    }else{
      return false
    }
  })
}

const authRef = ref();
const updateData=()=>{
  const newRole = authRef.value.getMenus()
  currentRow.value.menus = newRole.menus
  currentRow.value.name = newRole.name
  currentRow.value.auth_name = userStore.user?.username
  useStore.useUpdateRole(currentRow.value).then((response)=>{
    roleAuthVisible.value = false
    getRoleList()
  })
}

const getRoleList = () => {
  useStore.roleList().then(() => {
    roleList.value = useStore.roles;
  });
};
onMounted(() => {
  getRoleList();
});
</script>

<style>
</style>