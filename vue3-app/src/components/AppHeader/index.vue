<template>
  <div class="header">
    <a href="#/">
      <img src="@/assets/logo.png" alt="" class="logo" width="25px" />
      <span class="company">缤纷色彩舞台管理</span>
    </a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ useStore.user?.username }}
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="a">修改密码</el-dropdown-item>
          <el-dropdown-item command="b">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span class="date">{{ currentTime }}</span>

    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" v-model="dialogFormVisible" width="500px">
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userFormRef"
        label-width="100px"
        label-position="right"
        style="width: 400px"
      >
        <el-form-item label="原始密码" prop="oldPass">
          <el-input type="password" v-model="userForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="userForm.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="userForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePwd(userFormRef)">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
import { formateTime } from "@/utils/dateUtils";
import { onMounted, reactive, ref, nextTick } from "vue";
import useUserStore from "@/store/modules/user";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { reqCheckPwd, reqUpdatePwd } from "@/api/user";
let $router = useRouter();
let useStore = useUserStore();

const dialogFormVisible = ref(false);
const userFormRef = ref<FormInstance>();
const userForm = reactive({
  oldPass: "",
  pass: "",
  checkPass: "",
});

let validateOldPass = (rule: any, value: any, callback: any) => {
  reqCheckPwd({ userId: useStore.user?._id as string, password: value }).then(
    (response) => {
      if (response.status === 0) {
        callback();
      } else {
        callback(new Error(response.msg));
      }
    }
  );
};
let validatePass = (rule: any, value: any, callback: any) => {
  if (value !== userForm.pass) {
    callback(new Error("两次输入不一致！"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules>({
  oldPass: [
    {
      required: true,
      validator: validateOldPass,
      trigger: ["blur", "change"],
    },
  ],
  pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
  checkPass: [{ required: true, validator: validatePass, trigger: "change" }],
});

const handleCommand = (command: string) => {
  switch (command) {
    case "a":
      // 修改密码
      handlePwd();
      break;
    case "b":
      // 退出登陆
      handleLogout();
      break;
      defalut: break;
  }
};
const updatePwd = (formEl:FormInstance|undefined)=>{
  if(!formEl)return 
  formEl.validate((valid)=>{
    if(valid){
      reqUpdatePwd({userId:(useStore?.user?._id as string),password:userForm.pass}).then(response=>{
        if(response.status === 0){
          handleLogout();
          dialogFormVisible.value = false
        }
      })
    }else{

    }
  })
}

const handlePwd = () => {
  dialogFormVisible.value = true;
  nextTick(()=>{
    userFormRef.value.resetFields()
  })
};

const handleLogout = () => {
  useStore.removeUser();
  if (!useStore.user) {
    $router.replace("/login");
  }
};
let currentTime = ref<string>("");
const getTime = () => {
  setInterval(() => {
    currentTime.value = formateTime(Date.now());
  }, 1000);
};
onMounted(() => {
  getTime();
});
</script>
<style scoped>
.logo {
  vertical-align: middle;
  padding: 0 10px 0 40px;
}
.company {
  position: absolute;
  color: #fff;
}
.el-dropdown {
  float: right;
  margin-right: 40px;
  height: 50px;
  line-height: 50px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.date {
  float: right;
  color: #fff;
  margin-right: 50px;
}
</style>