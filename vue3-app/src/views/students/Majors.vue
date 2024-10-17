<template>
  <div>
    <div style="margin: 20px 0" class="btn_box">
      <el-button type="primary" @click="handlerAdd">新增专业</el-button>
    </div>
    <el-table :data="majors" style="width: 100%; height: 380px" border>
      <!--type="index" 获取索引值，从1开始； label 显示的标题; prop 数据字段名； width 列的宽度 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="majorname" label="专业名称"></el-table-column>

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
    <!-- 添加专业对话框 -->
    <el-dialog v-model="majorFormVisible" title="添加专业" width="500px">
      <el-form
        :model="major"
        ref="majorFormRef"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="majorname">
          <el-input v-model="major.majorname"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="
              major._id == null
                ? addData(majorFormRef)
                : updateData(majorFormRef)
            "
          >
            确定
          </el-button>
          <el-button @click="majorFormVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type {FormInstance,FormRules} from "element-plus"
import {ElMessageBox,ElMessage} from "element-plus"
import {onMounted,reactive,ref,nextTick} from "vue"
import type { majorInfoData } from "@/api/major/type";
import useMajorStore from "@/store/modules/major";
let majorStore = useMajorStore();
const majors = ref<majorInfoData[] | undefined>([])
let major = ref<majorInfoData | undefined>({
  _id:null,
  majorname:""
})

const majorFormVisible = ref(false)
const majorFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  majorname:({
    required:true,message:"请输入专业名称",trigger:"blur"
  })
})

const handlerAdd = () =>{
  majorFormVisible.value = true
  nextTick(()=>{
    majorFormRef.value.resetFields()
  })
  major.value = {
    _id:null,
    majorname:""
  }
}
const addData = (formEl:FormInstance | undefined) =>{
  if(!formEl) return
  formEl.validate(async (valid)=>{
    if(valid){
      majorStore.addMajor((major.value as majorInfoData)).then(response=>{
        majorFormVisible.value = false
        getMajorList()
      })
    }else{

    }
  })
}

const handleEdit = (_id:string) =>{
  handlerAdd()
  majorStore.getMajorById(_id).then(response=>{
    major.value = response
  })
}
const updateData = (formEl:FormInstance | undefined)=>{
  if(!formEl)return
  formEl.validate(async (valid)=>{
    if(valid){
      majorStore.updateMajor((major.value as majorInfoData)).then(response=>{
        majorFormVisible.value = false
        getMajorList()
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
    majorStore.deleteMajor(_id).then(response=>{
      getMajorList()
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
  getMajorList()
}
const handleCurrentChange = (val:number)=>{
  currentPage.value = val;
  getMajorList()
}
const getMajorList = ()=>{
  majorStore.getMajorList({page:currentPage.value,size:pageSize.value}).then(response=>{
    majors.value = majorStore.majors
    total.value = response?.total as number
    totalPage.value = total.value/pageSize.value
  })
}
onMounted(()=>{
  getMajorList()
})
</script>

<style>

</style>