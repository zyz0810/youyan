<template>
  <myDialog
    :visible.sync="showViewDialog"
    :close-on-click-modal="false"
    width="60%"
    @close="close"
    top="10vh"
    title=""
    class="dialogContainer"
    @open="open"
  >
    <div class="view_tab flex text-center">
      <div :class="['flex-item',activeId == 0 ? 'active':'']" data-id="0" @click="handleTab(0)">实时工况</div>
      <div :class="['flex-item',activeId == 1 ? 'active':'']" data-id="1" @click="handleTab(1)">趋势曲线</div>
      <div :class="['flex-item',activeId == 2 ? 'active':'']" data-id="2" @click="handleTab(2)">企业信息</div>
      <div :class="['flex-item',activeId == 3 ? 'active':'']" data-id="3" @click="handleTab(3)">设备信息</div>
    </div>
    <div v-show="activeId == 0">
      <div class="flex baseColor">
        <el-form style="flex: 3">
          <el-form-item label="餐企名称：">{{viewData.companyName}}</el-form-item>
          <el-form-item label="检测状态："><span class="">{{viewData.status}}</span></el-form-item>
          <el-form-item label="监测时间：">{{realTimeInfo.addtime}}</el-form-item>
        </el-form>
        <div style="flex: 5">
          <div class="table_title text-center">污染物排放情况（mg/m3）</div>
          <el-table v-loading="polluteListLoading" :data="polluteList" element-loading-text="拼命加载中" fit ref="tableList" border class="table_noBg">
            <el-table-column label="污染物类型" align="center" prop="name"></el-table-column>
            <el-table-column label="实测值" align="center" prop="val"></el-table-column>
            <el-table-column label="状态" align="center" prop="status"></el-table-column>
          </el-table>
        </div>

      </div>
      <div class="flex mt_20">
        <ul class="clr_white flex view_ul text-center" style="flex: 3">
          <li class="flex-item">
            <div class="bg_yellow">
              <i class="iconfont icon-wendu f26"></i>
              <p>温度</p>
            </div>
            <p class="num">{{realTimeInfo.temperature}}℃</p>
          </li>
<!--          <li class="flex-item">-->
<!--            <div class="bg_blue">-->
<!--              <i class="iconfont icon-wenshidu1 f26"></i>-->
<!--              <p>湿度</p>-->
<!--            </div>-->
<!--            <p class="num">{{realTimeInfo.wind_speed}}rh</p>-->
<!--          </li>-->
          <li class="flex-item">
            <div class="bg_green">
              <i class="iconfont icon-fengsu f26"></i>
              <p>风速</p>
            </div>
            <p class="num">{{realTimeInfo.wind_speed}}m/s</p>
          </li>
          <li class="flex-item">
            <div class="bg_purple">
              <i class="iconfont icon-zaosheng f26"></i>
              <p>噪声</p>
            </div>
            <p class="num">{{realTimeInfo.noise}}Hz</p>
          </li>
        </ul>
        <div style="flex: 5">
          <div class="table_title text-center">污染物排放情况（mg/m3）</div>
          <el-table v-loading="polluteSListLoading" :data="polluteSList" element-loading-text="拼命加载中" fit border ref="tableList">
            <el-table-column label="设备类型" align="center" prop="name"></el-table-column>
            <el-table-column label="状态" align="center" prop="status"></el-table-column>
          </el-table>
        </div>

      </div>
    </div>
    <div v-if="activeId == 1">
      <div class="f16 txtColor text-center">
        <span class="m_r30">餐企名称：新石器烤肉</span>
        <span>设备名称：新石器烤肉</span>
      </div>
      <div class="bg_shadow mt_20 p20 line_chart">
        <p class="f14 txtColor text-center mt_10 mb_10">最近24小时污染物排放情况</p>
        <LineChart :chartData="lineData" :BarChartLegend="PieChartLegend" height="25vh" divwidth="100%"></LineChart>
      </div>
    </div>
    <table v-if="activeId == 2" class="company_table f14">
      <tr>
        <td class="baseColor">餐企名称</td>
        <td class="txtColor">{{companyInfo.company?companyInfo.company:''}}</td>
        <td class="baseColor">餐企简称</td>
        <td class="txtColor">{{companyInfo.simple_name?companyInfo.simple_name:''}}</td>
        <td class="baseColor">信用代码</td>
        <td class="txtColor">{{companyInfo.credit_code?companyInfo.credit_code:''}}</td>
      </tr>
      <tr>
        <td class="baseColor">组织机构码</td>
        <td class="txtColor">{{companyInfo.organization_code?companyInfo.organization_code:''}}</td>
        <td class="baseColor">企业状态</td>
        <td class="txtColor">{{companyInfo.status | filtersCompanyStatus}}</td>
        <td class="baseColor">企业编码</td>
        <td class="txtColor">{{companyInfo.company_code?companyInfo.company_code:''}}</td>
      </tr>
      <tr>
        <td class="baseColor">负责人</td>
        <td class="txtColor">{{companyInfo.principal?companyInfo.principal:''}}</td>
        <td class="baseColor">手机号码</td>
        <td class="txtColor">{{companyInfo.mobile?companyInfo.mobile:''}}</td>
        <td class="baseColor">餐企电话</td>
        <td class="txtColor">{{companyInfo.tel?companyInfo.tel:''}}</td>
      </tr>
      <tr>
        <td class="baseColor">餐企类型</td>
        <td class="txtColor">{{companyInfo.company_type?Info.company_type:''}}</td>
        <td class="baseColor">菜系</td>
        <td class="txtColor">{{filterType(cookList,companyInfo.cook_type?companyInfo.cook_type:'')}}</td>
        <td class="baseColor">营业面积</td>
        <td class="txtColor">{{companyInfo.area?companyInfo.area:''}}</td>
      </tr>
      <tr>
        <td class="baseColor">灶头数量</td>
        <td class="txtColor">{{companyInfo.kitchen_range_num?companyInfo.kitchen_range_num:''}}</td>
        <td class="baseColor">排口数量</td>
        <td class="txtColor">{{companyInfo.outlet_num?companyInfo.outlet_num:''}}</td>
        <td class="baseColor">餐企规模</td>
        <td class="txtColor">{{filterType(scaleList,companyInfo.scale_type?companyInfo.scale_type:'')}}</td>
      </tr>
      <tr>
        <td class="baseColor">所属辖区</td>
        <td class="txtColor">{{filterType(cityList,companyInfo.city_id?companyInfo.city_id:'')}}</td>
        <td class="baseColor">所属分组</td>
        <td class="txtColor" colspan="3"></td>
      </tr>
      <tr>
        <td class="baseColor">详细地址</td>
        <td class="txtColor" colspan="5">{{companyInfo.address?companyInfo.address:''}}</td>
      </tr>
    </table>
    <table v-if="activeId == 3" class="company_table equipment_table f14 mb_20">
      <tr>
        <td class="baseColor">设备名称</td>
        <td class="txtColor">{{facilityInfo.name}}</td>
        <td class="baseColor">设备型号</td>
        <td class="txtColor">{{facilityInfo.version}}</td>
      </tr>
      <tr>
        <td class="baseColor">设备编号</td>
        <td class="txtColor">{{facilityInfo.facility_no}}</td>
        <td class="baseColor">设备IMEI</td>
        <td class="txtColor">{{facilityInfo.imei}}</td>
      </tr>
      <tr>
        <td class="baseColor">生产厂家</td>
        <td class="txtColor">{{facilityInfo.product}}</td>
        <td class="baseColor">安装日期</td>
        <td class="txtColor">{{facilityInfo.start_time}}</td>
      </tr>
    </table>



  </myDialog>
</template>

<script>
  import echarts from 'echarts'
  import {realTime} from '@/api/police'
  import draggable from 'vuedraggable'
  import waves from '@/directive/waves'
  import LineChart from '@/components/Charts/LineChart'
  import Pagination from "@/components/Pagination/index";
  import {homeTrend} from "@/api/chart";
  import {dicList} from "@/api/dictionary";
  import {facilityDetail} from "@/api/monitor";
  import {cityList} from "@/api/jurisdiction";
  import {companyDetail} from "@/api/catering";
  import {getCitySelected} from "@/utils/auth"; // waves directive
  export default {
    name: 'parameterView',
    directives: { waves },
    components: {
      draggable,
      Pagination,
      LineChart
    },
    props: {
      showDialog: {
        required: true,
        type: Boolean,
        default: false
      },
      viewData: {
        required: true,
        type: Object,
        default: {
          option: {},
          operatorType: "view",
          facility_id: "",
          fac_id:"",
          company_id:'',
          companyName:'',
          status:''
        }
      }
    },
    data() {
      return {
        polluteSListLoading:false,
        polluteSList:[],
        polluteListLoading:false,
        polluteList:[{
          name:'油烟浓度',
          val:'',
          status:''
        }],
        activeId:0,
        companyType:[],
        facilityInfo:{},
        cookList:[],
        scaleList:[],
        realTimeInfo:{},
        list: [],
        listLoading: false,
        listQuery:{
          facility_id:'',
          page:1,
          limit:10
        },
        lineData:{
          title: {},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '0',
            right: '0',
            bottom: '5',
            top: '30',
            containLabel: true
          },
          //----------------   图例 legend  -----------------
          legend:{
            textStyle:{
              fontSize:15,
              color: '#5EF4F9'
            },
            data:['TVOC','油烟浓度']
          },
          xAxis: {
            splitArea : {show :  false }, //保留网格区域
            // show:false,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
              alignWithLabel: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#26CBE2',
                fontSize:'16',
                fontWeight:'bold'
              }
            },
            splitLine: {
              show: false,
              textStyle: {
                color: 'rgba(16,54,123,1)',
                fontSize:'15',
                fontWeight:'bold'
              }
            },//去除网格线
            boundaryGap: false, // 不留白，从原点开始
            type: 'category',
            data: []
          },
          yAxis: {
            splitArea : {show :  false }, //保留网格区域
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#26CBE2',
                fontSize:'15',
                fontWeight:'bold'
              }
            },
            splitLine: {
              show: false,//去除网格线
              textStyle: {
                color: '#08245F',
                fontSize:'15',
                fontWeight:'bold'
              }
            },
            type: 'value'
          },
          series: [
          //   {
          //   name:'TVOC',
          //   symbol:'circle',
          //   symbolSize:8,
          //   color:'#CC3275',
          //   itemStyle : {
          //     normal : {
          //       // color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
          //       //     offset: 0, color: 'purple' // 0% 处的颜色
          //       //   }, {
          //       //     offset: 0.5, color: 'green' // 100% 处的颜色
          //       //   }, {
          //       //     offset: 1, color: 'yellow' // 100% 处的颜色
          //       //   }]
          //       // ),  //背景渐变色
          //       lineStyle:{
          //         color:'#CC3275',
          //         borderColor:'#CC3275'
          //       }
          //     }
          //   },
          //   areaStyle:{
          //     normal:{
          //       //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //         offset: 0,
          //         color: 'rgba(204,50,117,0.5)'
          //       }, {
          //         offset: .2,
          //         color: 'rgba(204,50,117,0.5)'
          //       },{
          //         offset: 1,
          //         color: 'rgba(204,50,117,0)'
          //       }])
          //
          //     }
          //   },//区域颜色渐变
          //   data: [],
          //   type: 'line'
          // },
            {
            name:'油烟浓度',
            symbol:'circle',
            symbolSize:8,
            color:'#E39915',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#E39915',
                  borderColor:'#E39915'
                }
              }
            },
            areaStyle:{
              normal:{
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(227,153,21,0.5)'
                }, {
                  offset: .2,
                  color: 'rgba(227,153,21,0.5)'
                },{
                  offset: 1,
                  color: 'rgba(227,153,21,0)'
                }])

              }
            },//区域颜色渐变
            data: [],
            type: 'line',
              markLine: {
                silent: true,
                symbol:"none", //去掉警戒线最后面的箭头
                lineStyle: {
                  normal: {
                    color: 'red'                  // 这儿设置安全基线颜色
                  }
                },
                data: [{
                  yAxis: 2     //这儿定义基准线的数值为多少
                }],
                label: {
                  normal: {
                    formatter: '超标\n基线'           // 这儿设置安全基线
                  }
                }

              },
          }]
        },
        PieChartLegend:[],
        companyInfo:{},
      }
    },
    computed: {
      showViewDialog: {
        get() {
          return this.showDialog;
        },
        set(value) {
          this.$emit("update:show-dialog", value);
        }
      },
    },
    filters:{
      filtersStatus: function(value) {
        let StatusArr = {2:'禁用', 1:'启用'}
        return StatusArr[value]
      },
      filtersCompanyStatus: function(value) {
        let StatusArr = {2:'禁用', 1:'启用'}
        return StatusArr[value]
      },
    },

    methods: {
      getCompanyView(companyId){
        companyDetail({id:this.viewData.company_id, city_id:getCitySelected(),}).then(res=>{
          console.log(res)
          if(res.code == 1){
            const {id,company, simple_name, organization_code, status, company_code, principal, mobile, tel,  cook_type, area,
              kitchen_range_num, outlet_num, scale_type, city, street, address, images, remark} = res.data;
            const company_type = this.filterType(this.companyType,res.data.company_type)
            this.companyInfo = {id,company, simple_name, organization_code, status, company_code, principal, mobile, tel, company_type, cook_type, area,
              kitchen_range_num, outlet_num, scale_type, city, street, address, images, remark};

            console.log(this.companyInfo)
          }
        });
      },
      getChart(id){
        homeTrend({facility_id:id, city_id:getCitySelected(),}).then(res=>{
          let a = res.data.map(item=>{return item.x_name})
          this.lineData.xAxis.data = a;
          // this.lineData.series[0].data = res.data.map(item=>{ return item.y_tvoc_num})
          this.lineData.series[1].data = res.data.map(item=>{return item.y_fume_num})
        });
      },
      getInfo(id){
        realTime({facility_id:id, city_id:getCitySelected(),}).then(res=>{
          this.realTimeInfo = res.data;
          this.polluteSList=[{
            name:'净化器',
            status:res.data.cleansing == 1?'正常':'异常',
          },{
            name:'风机',
            status:res.data.fan == 1?'开':'关',
          }]

          this.polluteList[0].val = res.data.concentration
          this.polluteList[0].status = this.viewData.status
        });
      },
      filterType(list,id){
        console.log(list)
        console.log(id)
        list.filter(item=> {
          if(item.id==id){
            console.log(item.name)
            return item.name
          }
        })
      },
      getScaleType(){
        dicList({ city_id:getCitySelected(), parent_id: 2,
          page: 1,
          pageSize: 9999,}).then(res => {
          this.scaleList = res.data.data
        });
      },
      getCookType(){
        dicList({ parent_id: 1,
          page: 1,
          pageSize: 9999,}).then(res => {
          this.cookList = res.data.data
        });
      },
      getCompanyType(){
        dicList({ city_id:getCitySelected(), parent_id: 16,
          page: 1,
          pageSize: 9999,}).then(res => {
          this.companyType = res.data.data
        });
      },
      getFacilityDetail(id){
        facilityDetail({id:id, city_id:getCitySelected(),}).then(res=>{
          const { id,product, city_id,name, version,facility_no,imei,start_time,images,remark} = res.data
          this.facilityInfo = { id,product, city_id,name, version,facility_no,imei,start_time,images,remark}
        });
      },
      getCity() {
        cityList({  city_id:getCitySelected(), key_word:'', page: 1, pageSize: 99999}).then(res => {
          this.cityList = res.data.data
        });
      },
      handleTab(val){
        this.activeId = val;
      },
      open(){
        this.listQuery.facility_id = this.viewData.facility_id
        this.getCompanyView();
        this.getChart(this.viewData.facility_id);
        this.getInfo(this.viewData.facility_id);
        this.getScaleType();
        this.getCompanyType();
        this.getFacilityDetail(this.viewData.fac_id);
        this.getCity();
      },
      close(){
        this.polluteSListLoading=false;
        this.polluteSList=[];
        this.polluteListLoading=false;
        this.polluteList=[{
          name:'油烟浓度',
          val:'',
          status:''
        }];
        this.activeId=0;
        this.companyType=[];
        this.facilityInfo={};
        this.cookList=[];
        this.scaleList=[];
        this.realTimeInfo={};
        this.list= null;
        this.listLoading= false;
        this.listQuery={
          facility_id:'',
          page:1,
          limit:10
        };
        this.lineData={
          title: {},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '0',
            right: '0',
            bottom: '5',
            top: '30',
            containLabel: true
          },
          //----------------   图例 legend  -----------------
          legend:{
            textStyle:{
              fontSize:15,
              color: '#5EF4F9'
            },
            data:['TVOC','油烟浓度']
          },
          xAxis: {
            splitArea : {show :  false }, //保留网格区域
            // show:false,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
              alignWithLabel: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#26CBE2',
                fontSize:'16',
                fontWeight:'bold'
              }
            },
            splitLine: {
              show: false,
              textStyle: {
                color: 'rgba(16,54,123,1)',
                fontSize:'15',
                fontWeight:'bold'
              }
            },//去除网格线
            boundaryGap: false, // 不留白，从原点开始
            type: 'category',
            data: []
          },
          yAxis: {
            splitArea : {show :  false }, //保留网格区域
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#26CBE2',
                fontSize:'15',
                fontWeight:'bold'
              }
            },
            splitLine: {
              show: false,//去除网格线
              textStyle: {
                color: '#08245F',
                fontSize:'15',
                fontWeight:'bold'
              }
            },
            type: 'value'
          },
          series: [
            //   {
            //   name:'TVOC',
            //   symbol:'circle',
            //   symbolSize:8,
            //   color:'#CC3275',
            //   itemStyle : {
            //     normal : {
            //       // color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
            //       //     offset: 0, color: 'purple' // 0% 处的颜色
            //       //   }, {
            //       //     offset: 0.5, color: 'green' // 100% 处的颜色
            //       //   }, {
            //       //     offset: 1, color: 'yellow' // 100% 处的颜色
            //       //   }]
            //       // ),  //背景渐变色
            //       lineStyle:{
            //         color:'#CC3275',
            //         borderColor:'#CC3275'
            //       }
            //     }
            //   },
            //   areaStyle:{
            //     normal:{
            //       //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
            //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //         offset: 0,
            //         color: 'rgba(204,50,117,0.5)'
            //       }, {
            //         offset: .2,
            //         color: 'rgba(204,50,117,0.5)'
            //       },{
            //         offset: 1,
            //         color: 'rgba(204,50,117,0)'
            //       }])
            //
            //     }
            //   },//区域颜色渐变
            //   data: [],
            //   type: 'line'
            // },
            {
              name:'油烟浓度',
              symbol:'circle',
              symbolSize:8,
              color:'#E39915',
              itemStyle : {
                normal : {
                  lineStyle:{
                    color:'#E39915',
                    borderColor:'#E39915'
                  }
                }
              },
              areaStyle:{
                normal:{
                  //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(227,153,21,0.5)'
                  }, {
                    offset: .2,
                    color: 'rgba(227,153,21,0.5)'
                  },{
                    offset: 1,
                    color: 'rgba(227,153,21,0)'
                  }])

                }
              },//区域颜色渐变
              data: [],
              type: 'line',
              markLine: {
                silent: true,
                symbol:"none", //去掉警戒线最后面的箭头
                lineStyle: {
                  normal: {
                    color: 'red'                  // 这儿设置安全基线颜色
                  }
                },
                data: [{
                  yAxis: 2     //这儿定义基准线的数值为多少
                }],
                label: {
                  normal: {
                    formatter: '超标\n基线'           // 这儿设置安全基线
                  }
                }

              },
            }]
        };
        this.PieChartLegend=[];
        this.companyInfo={};
      },

    }
  }
</script>
<style lang="scss">
  @import '@/styles/variables.scss';
  .view_tab{
    width: 60%;
    margin: 0 auto 30px;
    line-height: 2.6;
    color:$txtColor;
    background: #0a275f !important;
    box-shadow: $menuText 0 0 8px inset;
    border-radius: 5px;

    .active{
      color: #fff;
      background: #0a275f !important;
      box-shadow: $menuText 0 0 18px inset;
    }
    .flex-item{
      &:nth-child(1){
        &.active{
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
      }
      &:nth-child(4){
        &.active{
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
    }
  }
  .table_title{
    /*width: 60%;*/
    line-height: 2.6;
    color:$txtColor;
    background: #0a275f !important;
    box-shadow: $menuText 0 0 8px inset;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .view_ul{
    li{
      margin: 0 5px;
      border: 1px solid $txtColor;
      border-radius: 5px;
      & > div{
        padding: 10px 0;
        p{
          margin-top: 5px;
        }
      }
      .num{
        line-height: 2.5;
      }
    }
  }
  .company_table{
    width: 100%;
    border-top: 1px solid #223492;
    border-left: 1px solid #223492;
    border-spacing: 0;
    tr{
      line-height: 2;

      td{
        padding: 0 5px;
        border-right: 1px solid #223492;
        border-bottom: 1px solid #223492;
      }
    }
  }
  .equipment_table{
    width: 80% !important;
    margin: 0 auto;
  }
</style>
