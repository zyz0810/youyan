<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="24"
              :sm="24"
              :lg="12">
        <div class="chart-wrapper">
          <div class="header-wrapper flex bold" style="justify-content:space-between">
            <label class="label f16 txtColor fl">辖区报警次数占比分析</label>
            <el-form :inline="true" :model="listQueryOne">
              <el-form-item label="时 间：" prop="name">
                <el-date-picker
                  v-model="dateTimeOne"
                  clearable
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getPie">查询</el-button>
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
            <el-form :inline="true" :model="listQueryTwo" class="fr">
              <el-form-item label="时 间：" prop="name">
                <el-date-picker
                  v-model="dateTimeTwo"
                  clearable
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getBar">查询</el-button>
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
          <el-form :inline="true" :model="listQueryThree" class="">
            <el-form-item label="餐企名称：" prop="name">
              <el-select v-model="listQueryThree.company_id" placeholder="选择餐企">
                <el-option v-for="item in cateringList" :label="item.company" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时 间：" prop="name">
              <el-date-picker
                v-model="dateTimeThree"
                clearable
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getLine">查询</el-button>
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
  import {timesOfWarn, departOfWarn, analyseOfWarn,} from '@/api/statistics'
  import RingChart from '@/components/Charts/RingChart'
  import draggable from 'vuedraggable'
  import waves from '@/directive/waves'
  import { mapState } from 'vuex'
  import Pagination from "@/components/Pagination/index"; // waves directive
  import paraView from "./components/view";
  import {companyList} from "@/api/catering";
  import {getCitySelected} from "@/utils/auth";
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
        listQueryOne:{
          start_time:'',
          end_time:'',
        },
        listQueryTwo:{
          start_time:'',
          end_time:'',
        },
        listQueryThree:{
          company_id:'',
          start_time:'',
          end_time:'',
        },
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
              radius: ['45%', '65%'],
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
              data: []
            }
          ]
        },
        divWidth:'100%',
        chartData:{
          grid: {
            left: '20',
            right: '10',
            bottom: '20',
            top:'10',
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
            data: []
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
            data: [],
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
        echartData: {
          count:[],
          name: [],
        },
        listQuery: {
          city_id:getCitySelected(),
          key_word: '',
          street: '',
          scale_type:'',
          cook_type:'',
          status:'',
          page: 1,
          pageSize: 9999
        },
        cateringList:[],
      }
    },

    computed: {
      ...mapState({
        roles: state => state.user.roles,
      }),
      dateTimeOne: {
        get () {
          if (this.listQueryOne.start_time && this.listQueryOne.end_time) {
            return [this.listQueryOne.start_time, this.listQueryOne.end_time];
          } else {
            return [];
          }
        },
        set (v) {
          if (v) {
            this.listQueryOne.start_time = v[0];
            this.listQueryOne.end_time = v[1];
          } else {
            this.listQueryOne.start_time = "";
            this.listQueryOne.end_time = "";
          }
        },
      },
      dateTimeTwo: {
        get () {
          if (this.listQueryTwo.start_time && this.listQueryTwo.end_time) {
            return [this.listQueryTwo.start_time, this.listQueryTwo.end_time];
          } else {
            return [];
          }
        },
        set (v) {
          if (v) {
            this.listQueryTwo.start_time = v[0];
            this.listQueryTwo.end_time = v[1];
          } else {
            this.listQueryTwo.start_time = "";
            this.listQueryTwo.end_time = "";
          }
        },
      },
      dateTimeThree: {
        get () {
          if (this.listQueryThree.start_time && this.listQueryThree.end_time) {
            return [this.listQueryThree.start_time, this.listQueryThree.end_time];
          } else {
            return [];
          }
        },
        set (v) {
          if (v) {
            this.listQueryThree.start_time = v[0];
            this.listQueryThree.end_time = v[1];
          } else {
            this.listQueryThree.start_time = "";
            this.listQueryThree.end_time = "";
          }
        },
      },
    },
    mounted() {
    this.getPie();
    this.getBar();
    this.getLine();
    this.getList();
    },
    methods: {
      //获取餐企列表
      getList() {
        companyList(this.listQuery).then(res => {
          this.cateringList = res.data.data
        });
      },
      // 辖区报警次数占比分析
      getPie(){
        departOfWarn(this.listQueryOne).then(res => {
          let pieArr = res.data.map(item=>{
            return {name:item.x_name,value:item.y_count}
          });
          this.chartDataThree.series[0].data = pieArr;
        });
      },
      // 报警次数和平均油烟浓度趋势分析
      getBar(){
        timesOfWarn(this.listQueryTwo).then(res => {
          let barArrName = res.data.map(item=>{
            return item.x_name;
          });
          let barArrData = res.data.map(item=>{
            return item.y_count;
          });
          this.echartData = {
            name: barArrName,
            count:barArrData
          }
        });
      },
      // 报警次数和平均油烟浓度趋势分析
      getLine(){
        analyseOfWarn(this.listQueryThree).then(res => {
          let barArrName = res.data.map(item=>{
            return item.x_name;
          });
          let barArrData = res.data.map(item=>{
            return item.y_count;
          });
          this.chartData.xAxis.data = barArrName;
          this.chartData.series[0].data = barArrData;
        });
      },
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
