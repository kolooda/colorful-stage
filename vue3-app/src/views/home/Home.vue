<template>
  <div>
    <h1 class="home_title" style="text-align:center">
      <el-button :icon="ArrowLeft" @click="getPreYearData">上一年</el-button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>{{ year }}</span>
      <span>年学员数量</span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button @click="getNextYearData"> 下一年 <el-icon><ArrowRight /></el-icon> </el-button>
    </h1>
    <div id="myChart" style="height: 500px"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts"
import {reqStudentForYear} from "@/api/student"
import { ArrowLeft,ArrowRight } from "@element-plus/icons-vue";
import { onMounted,ref } from "vue";
const year = ref(new Date().getFullYear())
const getPreYearData =()=>{
  year.value--
  drawChart()
}
const getNextYearData =()=>{
  year.value++
  drawChart()
}
const drawChart = ()=>{
  reqStudentForYear(year.value).then(response=>{
    const resp = response
    if(resp.status === 0){
      let chartDom = document.getElementById("myChart")
      let myChart = echarts.init(chartDom)
      let option
      let dataArr =[0]
      if(resp.data && resp.data.length){
        resp.data.forEach(item=>{
          dataArr[parseInt(item._id)-1] = item.count
        })
      }else{

      }
      option ={
        xAxis:{
          type:"category",
          data:[
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12"
          ]
        },
        yAxis:{
          type:"value"
        },
        series:[
          {
            data:dataArr,
            type:"bar"
          }
        ]
      }
      option && myChart.setOption(option);
    }
  })
}
onMounted(()=>{
  drawChart()
})
</script>

<style>

</style>