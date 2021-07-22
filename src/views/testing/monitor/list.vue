<template>
  <div class="app-container">
    <div id='mapDiv' class="mapDiv" style="width: 100%; "></div>
    <div class="map_info">
      <div class="clr_white f18 map_info_tit text-center p20">信息查询</div>
      <el-form :model="temp">
        <el-form-item label="区域">
          <el-select v-model="temp.area" placeholder="选择区域" @change="showSearchDialog = true">
            <el-option label="区域1" value="1"></el-option>
            <el-option label="区域2" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="餐企">
          <el-select v-model="temp.name" placeholder="选择餐企" @change="showSearchDialog = true">
            <el-option label="餐企1" value="1"></el-option>
            <el-option label="餐企2" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="search_result" v-show="showSearchDialog">
      <i class="el-dialog__close el-icon el-icon-close f18 block fr close_search" @click="showSearchDialog = false"></i>
      <div class="view_tab flex text-center">
        <div :class="['flex-item',activeId == 0 ? 'active':'']" data-id="0" @click="handleTab(0)">实时工况</div>
        <div :class="['flex-item',activeId == 1 ? 'active':'']" data-id="1" @click="handleTab(1)">趋势曲线</div>
        <div :class="['flex-item',activeId == 2 ? 'active':'']" data-id="2" @click="handleTab(2)">企业信息</div>
        <div :class="['flex-item',activeId == 3 ? 'active':'']" data-id="3" @click="handleTab(3)">设备信息</div>
      </div>
     <div v-show="activeId == 0">
       <div class="flex baseColor">
         <el-form style="flex: 3">
           <el-form-item label="餐企名称：">新石器烤肉</el-form-item>
           <el-form-item label="检测状态："><span class="red01">超标</span></el-form-item>
           <el-form-item label="监测时间：">2021-8-4 12:20:08</el-form-item>
         </el-form>
         <div style="flex: 5">
           <div class="table_title text-center">污染物排放情况（mg/m3）</div>
           <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" fit ref="tableList" border class="table_noBg">
             <el-table-column label="污染物类型" align="center" prop="name"></el-table-column>
             <el-table-column label="实测值" align="center" prop="createUserName"></el-table-column>
             <el-table-column label="状态" align="center">
               <template slot-scope="scope">
                 <span>{{$moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
               </template>
             </el-table-column>
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
             <p class="num">32℃</p>
           </li>
           <li class="flex-item">
             <div class="bg_blue">
               <i class="iconfont icon-wenshidu1 f26"></i>
               <p>湿度</p>
             </div>
             <p class="num">32rh</p>
           </li>
           <li class="flex-item">
             <div class="bg_green">
               <i class="iconfont icon-fengsu f26"></i>
               <p>风速</p>
             </div>
             <p class="num">32m/s</p>
           </li>
           <li class="flex-item">
             <div class="bg_purple">
               <i class="iconfont icon-zaosheng f26"></i>
               <p>噪声</p>
             </div>
             <p class="num">32Hz</p>
           </li>
         </ul>
         <div style="flex: 5">
           <div class="table_title text-center">污染物排放情况（mg/m3）</div>
           <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" fit border ref="tableList">
             <el-table-column label="设备类型" align="center" prop="name"></el-table-column>
             <el-table-column label="状态" align="center">
               <template slot-scope="scope">
                 <span>{{$moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
               </template>
             </el-table-column>
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
          <td class="txtColor">新石器烤肉</td>
          <td class="baseColor">餐企简称</td>
          <td class="txtColor">新石器</td>
          <td class="baseColor">信用代码</td>
          <td class="txtColor">986843451215445</td>
        </tr>
        <tr>
          <td class="baseColor">组织机构码</td>
          <td class="txtColor">组织机构代码</td>
          <td class="baseColor">企业状态</td>
          <td class="txtColor">正常营业</td>
          <td class="baseColor">企业编码</td>
          <td class="txtColor">浦沿街道08</td>
        </tr>
        <tr>
          <td class="baseColor">负责人</td>
          <td class="txtColor">负责人</td>
          <td class="baseColor">手机号码</td>
          <td class="txtColor">156332285</td>
          <td class="baseColor">餐企电话</td>
          <td class="txtColor">51215445</td>
        </tr>
        <tr>
          <td class="baseColor">餐企类型</td>
          <td class="txtColor">食堂</td>
          <td class="baseColor">菜系</td>
          <td class="txtColor">食堂</td>
          <td class="baseColor">营业面积</td>
          <td class="txtColor">126</td>
        </tr>
        <tr>
          <td class="baseColor">灶头数量</td>
          <td class="txtColor">1</td>
          <td class="baseColor">排口数量</td>
          <td class="txtColor">1</td>
          <td class="baseColor">餐企规模</td>
          <td class="txtColor">中型</td>
        </tr>
        <tr>
          <td class="baseColor">所属辖区</td>
          <td class="txtColor">浦沿街道</td>
          <td class="baseColor">所属分组</td>
          <td class="txtColor" colspan="3">浦沿街道</td>
        </tr>
        <tr>
          <td class="baseColor">详细地址</td>
          <td class="txtColor" colspan="5">浦沿街道853号</td>
        </tr>
      </table>
      <table v-if="activeId == 3" class="company_table equipment_table f14">
        <tr>
          <td class="baseColor">餐企名称</td>
          <td class="txtColor">新石器烤肉</td>
          <td class="baseColor">设备类型</td>
          <td class="txtColor">油烟检测设备</td>
        </tr>
        <tr>
          <td class="baseColor">设备名称</td>
          <td class="txtColor">新石器烤肉</td>
          <td class="baseColor">设备型号</td>
          <td class="txtColor">jsh-123</td>
        </tr>
        <tr>
          <td class="baseColor">设备编号</td>
          <td class="txtColor">2313</td>
          <td class="baseColor">设备IMEI</td>
          <td class="txtColor">156332285</td>
        </tr>
        <tr>
          <td class="baseColor">生产厂家</td>
          <td class="txtColor">浙大网新</td>
          <td class="baseColor">安装日期</td>
          <td class="txtColor">2021-5-21</td>
        </tr>
      </table>
    </div>
    <ul class="company_leibie f14 clr_white bold" @click="showCompanyDialog = true">
      <li>正常 <span class="f18 clr_yellow bold">39</span></li>
      <li>超标 <span class="f18 clr_yellow bold">39</span></li>
      <li>故障 <span class="f18 clr_yellow bold">39</span></li>
      <li>离线 <span class="f18 clr_yellow bold">39</span></li>
    </ul>
    <div class="company_list" v-if="showCompanyDialog">
      <div class="company_tit p20 clearfix">
        <span class="txtColor block fl">今日监测情况</span>
        <i class="el-dialog__close el-icon el-icon-close f18 block fr" @click="showCompanyDialog = false"></i>
      </div>
      <div class="p20">
        <el-table v-loading="companyListLoading" :data="companyList" :height="500"
                  element-loading-text="拼命加载中" fit ref="tableList">
          <el-table-column label="餐企名称" align="center" prop="name"></el-table-column>
          <el-table-column label="温度℃" align="center" prop="name"></el-table-column>
          <el-table-column label="温度rh" align="center" prop="address"></el-table-column>
          <el-table-column label="风速m/s）" align="center" prop="num"></el-table-column>
          <el-table-column label="油烟浓度（mg/m3）" align="center" prop="num"></el-table-column>
          <el-table-column label="TVOC（mg/m3）" align="center" prop="num"></el-table-column>
          <el-table-column label="风机状态" align="center" prop="num">
            <template slot-scope="scope">
              <span>{{scope.row.status == 1?'开':'关'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="净化器状态" align="center" prop="num">
            <template slot-scope="scope">
              <span>{{scope.row.status == 1?'开':'关'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="监测状态" align="center">
            <template slot-scope="scope">
              <span class="clr_yellow">超标</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                    @pagination="getList" class="text-right"/>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {paraList, paraSave, paraUpdate, paraDelete} from '@/api/parameter'
  import draggable from 'vuedraggable'
  import waves from '@/directive/waves'
  import { mapState } from 'vuex'
  import Pagination from "@/components/Pagination/index"; // waves directive
  import paraView from "./components/view";
  import point01 from '@/assets/image/point01.png' // 引入刚才的map.js 注意路径
  import LineChart from '@/components/Charts/LineChart'
  import map from '@/components/Map/map' // 引入刚才的map.js 注意路径
  export default {
    name: 'parameterList',
    directives: {waves},
    mixins: [map],
    components: {
      draggable,
      Pagination,
      paraView,
      LineChart
    },
    data() {
      return {
        showSearchDialog:false,
        showCompanyDialog:false,
        total:1,
        companyList: [{
          name:'列表1',
          address:'杭州市',
          time:1298963414,
          num:1,
          status:1
        },{
          name:'列表2',
          address:'杭州市',
          time:1298963414,
          num:1,
          status:2
        }],
        companyListLoading: false,
        listQuery: {
          name: '',
          status: undefined,
          page: 1,
          limit: 10
        },
        temp:{
          area:'',
          name:''
        },
        zoom:12,
        centerLatitude:'30.20835',//中心纬度
        centerLongitude:'120.21194',//中心经度
        activeId:'',
        list: null,
        listLoading: false,
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
            data: ['5.13', '5.14', '5.15', '5.16', '5.17', '5.18', '5.19']
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
          series: [{
            name:'TVOC',
            symbol:'circle',
            symbolSize:8,
            color:'#CC3275',
            itemStyle : {
              normal : {
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                //     offset: 0, color: 'purple' // 0% 处的颜色
                //   }, {
                //     offset: 0.5, color: 'green' // 100% 处的颜色
                //   }, {
                //     offset: 1, color: 'yellow' // 100% 处的颜色
                //   }]
                // ),  //背景渐变色
                lineStyle:{
                  color:'#CC3275',
                  borderColor:'#CC3275'
                }
              }
            },
            areaStyle:{
              normal:{
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(204,50,117,0.5)'
                }, {
                  offset: .2,
                  color: 'rgba(204,50,117,0.5)'
                },{
                  offset: 1,
                  color: 'rgba(204,50,117,0)'
                }])

              }
            },//区域颜色渐变
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          },{
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
            data: [520, 232, 501, 634, 790, 930, 320],
            type: 'line'
          }]
        },
        PieChartLegend:[],
      }
    },

    computed: {
      ...mapState({
        roles: state => state.user.roles,
      }),
    },
    mounted() {
      this.onLoad()
    },
    methods: {
      companyShow(){

      },
      handleFilter(){

      },
      onLoad() {
        let T = window.T
        this.map = new T.Map('mapDiv')
        this.map.centerAndZoom(new T.LngLat(this.centerLongitude, this.centerLatitude), this.zoom) // 设置显示地图的中心点和级别
        // 添加地图类型控件
        // this.addCtrl()
        // // 普通标注
        let site = [
          { lng: 117.283042, lat: 31.86119 },
          { lng: 116.41238, lat: 40.07689 },
          { lng: 116.34143, lat: 40.03403 },
        ]
        // this.markerPoint(site)
        //创建图片对象
        var icon = new T.Icon({
          iconUrl: point01,
          iconSize: new T.Point(50, 46),
          iconAnchor: new T.Point(10, 25)
        });
        //创建信息窗口对象
        // let marker = new T.Marker(new T.LngLat(117.283042, 31.86119));// 创建标注
        let marker = new T.Marker(new T.LngLat(120.21194, 30.20835), {icon: icon});// 创建标注
        this.map.addOverLay(marker);
        this.map.setStyle('indigo')
        document.getElementsByClassName("tdt-control-copyright tdt-control")[0].style.display = 'none';

      },
      handleTab(val){
        this.activeId = val;
      }

    }
  }
</script>
<style lang="scss" scoped>
  @import './../../../styles/variables.scss';
  .app-container{
    height: calc(100vh - 215px);
    overflow: auto;
    box-sizing: border-box;
    padding: 0!important;
  }
  .mapDiv {
    height: 100%;
    background-color: #074fb3 !important;
    box-shadow: $menuText 0 0 18px inset;
  }
  .map_info{
    width: 260px;
    position: fixed;
    top: 200px;
    right: 50px;
    z-index: 2000;
    .map_info_tit{
      width: 160px;
      line-height: 2.5;
      margin-left: 100px;
      background: rgba(28,47,113,0.8);
      box-shadow: $menuText 0 0 18px inset;
    }
    .el-form{
      padding: 20px;
      background: rgba(2,51,91,0.8);
      box-shadow: $menuText 0 0 18px inset;
    }
  }
  .search_result{
    position: fixed;
    left: 300px;
    top: 200px;
    z-index: 2000;
    width: 800px;
    padding: 20px;
    background: #0a275f;
    .close_search{
      position: absolute;
      right: 20px;
      top:20px;
      z-index: 2001;
    }
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
  }
  .line_chart{
    border-radius: 5px;
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
  .company_leibie{
    position: fixed;
    bottom: 100px;
    right: 50px;
    z-index: 2000;
    background: #0a275f;
    padding: 20px;
    li{
      width: 159px;
      height: 67px;
      line-height: 67px;
      padding-left: 70px;
      background: url("./../../../assets/image/communityNum_bg.png") left top no-repeat;
      background-size: 100% 100%;
    }
  }
  .company_list{
    width: 800px;
    position: fixed;
    bottom: 100px;
    right: 300px;
    z-index: 9999999;

    background: rgba(21,48,106,1);
    .company_tit{
      line-height: 2;
      box-shadow: #1E407D 0 0 8px inset;
    }
    .el-table {
      border: 1px dashed #1362a0 !important;
      td{
        border-bottom: 1px dashed #1362a0;
      }
    }
  }

</style>
