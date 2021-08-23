<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="24"
              :sm="24"
              :lg="12">
        <div class="chart-wrapper">
          <div class="header-wrapper flex bold" style="justify-content:space-between">
            <label class="label f16 txtColor fl">辖区报警次数占比分析</label>
            <el-form :inline="true" :model="listQuery3">
              <el-form-item label="时 间：" prop="name">
                <el-date-picker
                  v-model="listQuery3.yearChoose"
                  clearable
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <RingChart :chartData="chartDataThree" :PieChartLegend="PieChartLegend" height="200px"></RingChart>
        </div>

      </el-col>
      <el-col :xs="24"
              :sm="24"
              :lg="12">
        <div class="chart-wrapper clr_white">
          <div class="header-wrapper flex bold" style="justify-content:space-between">
            <label class="label f16 txtColor fl">报警次数分析</label>
            <el-form :inline="true" :model="listQuery3" class="fr">
              <el-form-item label="时 间：" prop="name">
                <el-date-picker
                  v-model="listQuery3.yearChoose"
                  clearable
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="body-wrapper body-wrapper2">
            <ColumnChart :name="'myChart'" :echartData='echartData' style="width:100%;height: 340px;"></ColumnChart>
          </div>

        </div>
      </el-col>
    </el-row>
    <el-row class="mt_10">
      <el-col :span="24" class="p20 chart-wrapper">
        <div class="flex bold" style="justify-content:space-between">
          <div class="label f16 txtColor">餐企油烟浓度趋势分析</div>
          <el-form :inline="true" :model="listQuery3" class="">
            <el-form-item label="餐企名称：" prop="name">
              <el-select v-model="listQuery3.name" placeholder="选择餐企">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时 间：" prop="name">
              <el-date-picker
                v-model="listQuery3.yearChoose"
                clearable
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <LineChart :divWidth="divWidth"  :chartData="chartData"></LineChart>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as echarts from 'echarts';
  import {paraList, paraSave, paraUpdate, paraDelete} from '@/api/parameter'
  import RingChart from '@/components/Charts/RingChart'
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
      paraView,
      RingChart
    },
    data() {
      return {
        PieChartLegend:[],
        chartDataThree: {
          title:{},
          grid:{
            top:'0',
            left:'0',
            right: '0',
            bottom:'0'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            show:false
          },
          color:['#367CFD','#E20280'],
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['65%', '90%'],
              avoidLabelOverlap: false,
              // label: {
              //   show: false,
              //   position: 'center',
              //
              // },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              // labelLine: {
              //   show: false
              // },
              markLine :{
                label  :{
                  show:true,
                  position :'outside'
                },
              },
              labelLine:{
                normal:{
                  lineStyle: {
                    color: '#fff'
                  },
                  length:10,
                  length2 :35,
                }
              },
              label :{
                formatter: [
                  '{c}',
                  '{b}',
                ].join('\n'),
                verticalAlign :'bottom',
                position:'outside',
                textShadowOffsetY :10,
                align :'right',
                color:'white',
                height :60,
                lineHeight:30,
                fontSize:'16',
                rich: {
                  a: {
                    verticalAlign:'bottom',
                    // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
                  }
                }
              },
              data: [
                {value: 520, name: '浦沿街道'},
                {value: 205, name: '长河街道'},
                {value: 205, name: '西兴街道'},
              ]
            }
          ]
        },
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
            // 20,43,103
            splitArea : {
              show : false,//去除网格区域
              lineStyle:{color:'rgb(20,43,103)'}
            },
            splitLine:{
              // show: false//去除网格线
              lineStyle:{color:'red'}
            },
            data: ['2021-4-01', '2021-4-03', '2021-4-05', '2021-4-07', '2021-4-09', '2021-4-11', '2021-4-13','2021-4-15','2021-4-17','2021-4-19','2021-4-21','2021-4-23','2021-4-25','2021-4-27']
          },
          yAxis: {
            type: 'value',
            axisLabel : {color:'#fff'},    //y轴字体颜色
            splitArea : {
              show : false,//去除网格区域
            },
            splitLine:{
            // show: false//去除网格线
              lineStyle:{color:'rgb(20,43,103)'}
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
            areaStyle: {
              color:new echarts.graphic.LinearGradient(0,1,0,0,[{
                offset:0,
                color:'transparent',
              },{
                offset:1,
                color:'rgb(0,203,181)',
              }])
            }
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
          count:[70,60,52,63,82,30],
          name: ['肉揽锅菜','齐齐鱼锅','魏氏麻辣烫','生态酒店','世纪金源大酒店','香格里拉大酒店'],
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
      handleFilter(){},
    }
  }
</script>
<style lang="scss" scoped>
 .chart-wrapper{
   background: #0a275f;
 }
  .chart-wrapper{
    padding: 10px;
  }
 .el-form-item--mini.el-form-item{
   margin-bottom: 0 !important;
 }
</style>
