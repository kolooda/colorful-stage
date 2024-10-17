<template>
  <div>
    <template v-for="(item, index) in menuList" :key="item.index">
      <el-menu-item v-if="!item.children" :index="item.index">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu v-if="item.children" :index="item.index">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: "Menu",
  props: ["menuList"],
};
</script>

<style>
</style>