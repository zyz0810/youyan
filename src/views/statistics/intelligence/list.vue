<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-col :xs="24"
              :sm="24"
              :lg="12">
wewe
      </el-col>
      <el-col :xs="24"
              :sm="24"
              :lg="12">
        <div class="chart-wrapper clr_white">
          <div class="header-wrapper">
            <label class="label f18">餐企油烟浓度趋势分析</label>
            <div class="btn_box">
              <el-select v-model="listQuery3.performanceEnum"
                         @change="achievementByOrderEchars"
                         clear
                         placeholder="请选择"
                         class="fr">
                <el-option label="员工排行"
                           value="USER"></el-option>
                <el-option label="部门排行"
                           value="DEPT"></el-option>
              </el-select>
              <el-date-picker class="fr ml_10"
                              v-model="listQuery3.yearChoose"
                              type="month"
                              clear
                              value-format="yyyy-MM"
                              @change="achievementByOrderEchars"
                              align="right"
                              unlink-panels
                              placeholder="选择月">
              </el-date-picker>
            </div>
          </div>
          <div class="body-wrapper body-wrapper2">
            <ColumnChart :name="'myChart'"
                         :echartData='echartData'
                         style="width:100%;height: 340px;"></ColumnChart>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="mt_20">
      <el-col :span="24">
        <LineChart :divWidth="divWidth"  :chartData="chartData"></LineChart>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as echarts from 'echarts';
  import {paraList, paraSave, paraUpdate, paraDelete} from '@/api/parameter'
  import draggable from 'vuedraggable'
  import waves from '@/directive/waves'
  import { mapState } from 'vuex'
  import Pagination from "@/components/Pagination/index"; // waves directive
  import paraView from "./components/view";
  export default {
    name: 'parameterList',
    directives: {waves},
    components: {
      draggable,
      Pagination,
      paraView
    },
    data() {
      return {
        divWidth:'100%',
        chartData:{
          grid: {
            left: '20',
            right: '10',
            bottom: '20',
            containLabel: true
          },

          tooltip : {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: 'blue'
              }

            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel:{color:'#fff'},   // x轴字体颜色


            axisLine:{
              lineStyle:{color:'#fff'}    // x轴坐标轴颜色
            },


            axisTick:{
              lineStyle:{color:'#fff'}    // x轴刻度的颜色
            },
            data: ['2021-4-01', '2021-4-03', '2021-4-05', '2021-4-07', '2021-4-09', '2021-4-11', '2021-4-13','2021-4-15','2021-4-17','2021-4-19','2021-4-21','2021-4-23','2021-4-25','2021-4-27']
          },
          yAxis: {
            type: 'value',
            axisLabel : {color:'#fff'},    //y轴字体颜色

            splitArea : {
              // show : false//去除网格区域
              color:'yellow',
              lineStyle:{color:'yellow'}
            },

            splitLine:{
            // show: false//去除网格线
              color:'yellow',
              lineStyle:{color:'yellow'}
            },

            axisLine:{
              lineStyle:{color:'#fff'}  //y轴坐标轴颜色
            },

            axisTick:{
              show:false,
              lineStyle:{color:'#fff' }  //y轴坐标刻度颜色
            },
          },
          series: [{
            data: [0.5, 0.8, 0.2, 1.5, 1.9, 1.2, 0.8,0.5, 0.8, 0.2, 1.5, 1.9, 1.2, 0.8],
            type: 'line',
            areaStyle: {}
          }]
        },
        listQuery3: {
          performanceEnum: 'USER',//  DEPT: 对应部门   USER: 对应员工
          startTime: '',
          endTime: '',
          yearChoose: '',
          year: '',
        },
        echartData: {
          count:[0,10,52,63,12,30],
          name: ['A','B','C','D','E','F'],
          target:[0,5,2,6,10,1]
        },
      }
    },

    computed: {
      ...mapState({
        roles: state => state.user.roles,
      }),
    },
    mounted() {

    },
    methods: {
      achievementByOrderEchars(){},

    }
  }
</script>
<style lang="scss" scoped>
 .el-col{
   background: #000;
 }
  .chart-wrapper{
    padding: 20px;
  }
</style>
