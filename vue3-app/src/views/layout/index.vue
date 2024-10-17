<template>
  <div>
    <!-- 头部区域 -->
    <app-header></app-header>
    <!-- 左侧导航区域 -->
    <app-navbar></app-navbar>
    <!-- 右侧主区域 -->
    <app-main></app-main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader/index.vue"
import AppNavbar from "@/components/AppNavbar/index.vue"
import AppMain from "@/components/AppMain/index.vue"
</script>

<style scoped>
.header{
  position:absolute;
  line-height: 50px;
  padding:0px;
  top:0px;
  left:0px;
  right:0px;
  background:#2d3a4b;
}
.navbar{
  position:absolute;
  width:230px;
  top:50px;
  left:0px;
  bottom:0px;
  overflow-y: auto;
  background:#545c64;
}
.main{
  position:absolute;
  top:50px;
  left:230px;
  right:0px;
  bottom:0px;
  padding:10px;
  overflow-y: auto;
  /* background:red; */
}
</style>