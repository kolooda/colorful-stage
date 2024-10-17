<template>
  <div style="margin: 20px 0" class="btn_box">
    <el-button type="primary" @click="handlerAdd">新增学校</el-button>
  </div>
  <el-table :data="schools" style="width: 100%; height: 380px" border>
    <!--type="index" 获取索引值，从1开始； label 显示的标题; prop 数据字段名； width 列的宽度 -->
    <el-table-column type="index" label="序号" width="60"></el-table-column>
    <el-table-column prop="schoolname" label="学校名称"></el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row._id)">
          编辑
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row._id)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页控件 -->
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[5, 10, 15, 20]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
     <!-- 添加学校对话框 -->
     <el-dialog v-model="schoolFormVisible" title="添加学校" width="500px">
      <el-form
        :model="school"
        ref="schoolFormRef"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="schoolname">
          <el-input v-model="school.schoolname"></el-input>
        </el-form-item>       
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="school._id == null ? addData(schoolFormRef) : updateData(schoolFormRef)">
            确定
          </el-button>
          <el-button @click="schoolFormVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script setup lang="ts">
import type {FormInstance,FormRules} from "element-plus"
import {ElMessageBox,ElMessage} from "element-plus"
import {onMounted,reactive,ref,nextTick} from "vue"
import type { schoolInfoData } from "@/api/school/type";
import useSchoolStore from "@/store/modules/school";
let schoolStore = useSchoolStore();
const schools = ref<schoolInfoData[] | undefined>([])
let school = ref<schoolInfoData | undefined>({
  _id:null,
  schoolname:""
})

const schoolFormVisible = ref(false)
const schoolFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  schoolname:({
    required:true,message:"请输入学校名称",trigger:"blur"
  })
})

const handlerAdd = () =>{
  schoolFormVisible.value = true
  nextTick(()=>{
    schoolFormRef.value.resetFields()
  })
  school.value = {
    _id:null,
    schoolname:""
  }
}
const addData = (formEl:FormInstance | undefined) =>{
  if(!formEl) return
  formEl.validate(async (valid)=>{
    if(valid){
      schoolStore.addSchool((school.value as schoolInfoData)).then(response=>{
        schoolFormVisible.value = false
        getSchoolList()
      })
    }
  })
}

const handleEdit = (_id:string) =>{
  handlerAdd()
  schoolStore.getSchoolById(_id).then(response=>{
    school.value = response
  })
}
const updateData = (formEl:FormInstance | undefined)=>{
  if(!formEl)return
  formEl.validate(async (valid)=>{
    if(valid){
      schoolStore.updateSchool((school.value as schoolInfoData)).then(response=>{
        schoolFormVisible.value = false
        getSchoolList()
      })
    }
  })
}
const handleDelete = (_id:string) =>{
  ElMessageBox.confirm(
    "确定要删除此条数据吗？",
    "提示",
    {
      confirmButtonText:"确定",
      cancelButtonText:"取消",
      type:"warning"
    }
  ).then(()=>{
    schoolStore.deleteSchool(_id).then(response=>{
      getSchoolList()
      ElMessage({
        type:"success",
        message:"删除成功"
      })
    })
  }).catch(()=>{})
}
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const totalPage = ref(1)
const handleSizeChange = (val:number)=>{
  pageSize.value = val;
  getSchoolList()
}
const handleCurrentChange = (val:number)=>{
  currentPage.value = val;
  getSchoolList()
}
const getSchoolList = ()=>{
  schoolStore.getSchoolList({page:currentPage.value,size:pageSize.value}).then(response=>{
    schools.value = schoolStore.schools
    total.value = response?.total as number
    totalPage.value = total.value/pageSize.value
  })
}
onMounted(()=>{
  getSchoolList()
})
</script>

<style>

</style>