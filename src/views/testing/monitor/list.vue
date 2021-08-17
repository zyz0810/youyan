<template>
  <div class="app-container">
    <div id='mapDiv' class="mapDiv" style="width: 100%; "></div>
    <div class="map_info">
      <div class="clr_white f18 map_info_tit text-center p20">信息查询</div>
      <el-form :model="temp" label-width="40px">
        <el-form-item label="区域">
          <el-select v-model="temp.street" placeholder="选择区域" @change="getIndex">
            <el-option v-for="item in cityList" :key="item.id" :label="item.province + item.city +item.area" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="餐企">
          <el-select v-model="temp.company" placeholder="选择餐企" @change="getIndex">
            <el-option v-for="item in cateringList" :key="item.id" :label="item.company" :value="item.id"></el-option>
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
           <el-form-item label="餐企名称：">{{companyName}}</el-form-item>
           <el-form-item label="检测状态："><span class="red01">{{companyStatus}}</span></el-form-item>
           <el-form-item label="监测时间：">{{realTimeInfo?realTimeInfo.addtime:''}}</el-form-item>
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
             <p class="num">{{realTimeInfo?realTimeInfo.temperature:''}}℃</p>
           </li>
           <li class="flex-item">
             <div class="bg_blue">
               <i class="iconfont icon-wenshidu1 f26"></i>
               <p>湿度</p>
             </div>
             <p class="num">{{realTimeInfo?realTimeInfo.wind_speed:''}}rh</p>
           </li>
           <li class="flex-item">
             <div class="bg_green">
               <i class="iconfont icon-fengsu f26"></i>
               <p>风速</p>
             </div>
             <p class="num">{{realTimeInfo?realTimeInfo.wind_speed:''}}m/s</p>
           </li>
           <li class="flex-item">
             <div class="bg_purple">
               <i class="iconfont icon-zaosheng f26"></i>
               <p>噪声</p>
             </div>
             <p class="num">{{realTimeInfo?realTimeInfo.noise:''}}Hz</p>
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
          <td class="txtColor">{{companyInfo.company}}</td>
          <td class="baseColor">餐企简称</td>
          <td class="txtColor">{{companyInfo.simple_name}}</td>
          <td class="baseColor">信用代码</td>
          <td class="txtColor">{{companyInfo.credit_code}}</td>
        </tr>
        <tr>
          <td class="baseColor">组织机构码</td>
          <td class="txtColor">{{companyInfo.organization_code}}</td>
          <td class="baseColor">企业状态</td>
          <td class="txtColor">{{companyInfo.status | filtersCompanyStatus}}</td>
          <td class="baseColor">企业编码</td>
          <td class="txtColor">{{companyInfo.company_code}}</td>
        </tr>
        <tr>
          <td class="baseColor">负责人</td>
          <td class="txtColor">{{companyInfo.principal}}</td>
          <td class="baseColor">手机号码</td>
          <td class="txtColor">{{companyInfo.mobile}}</td>
          <td class="baseColor">餐企电话</td>
          <td class="txtColor">{{companyInfo.tel}}</td>
        </tr>
        <tr>
          <td class="baseColor">餐企类型</td>
          <td class="txtColor">{{filterType(companyType,companyInfo.company_type)}}</td>
          <td class="baseColor">菜系</td>
          <td class="txtColor">{{filterType(cookList,companyInfo.cook_type)}}</td>
          <td class="baseColor">营业面积</td>
          <td class="txtColor">{{companyInfo.area}}</td>
        </tr>
        <tr>
          <td class="baseColor">灶头数量</td>
          <td class="txtColor">{{companyInfo.kitchen_range_num}}</td>
          <td class="baseColor">排口数量</td>
          <td class="txtColor">{{companyInfo.outlet_num}}</td>
          <td class="baseColor">餐企规模</td>
          <td class="txtColor">{{filterType(scaleList,companyInfo.scale_type)}}</td>
        </tr>
        <tr>
          <td class="baseColor">所属辖区</td>
          <td class="txtColor">{{filterType(cityList,companyInfo.city_id)}}</td>
          <td class="baseColor">所属分组</td>
          <td class="txtColor" colspan="3"></td>
        </tr>
        <tr>
          <td class="baseColor">详细地址</td>
          <td class="txtColor" colspan="5">{{companyInfo.address}}</td>
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
    </div>
    <ul class="company_leibie f14 baseColor">
      <li class="clearfix"><img src="./../../../assets/image/monitor_icon01.png" class="fl"/><div class="">超标 <span class="f18 clr_yellow bold">{{info.superNum}}</span></div></li>
      <li class="clearfix"><img src="./../../../assets/image/monitor_icon02.png" class="fl"/><div class="">故障 <span class="f18 clr_yellow bold">{{info.trouble}}</span></div></li>
      <li class="clearfix"><img src="./../../../assets/image/monitor_icon03.png" class="fl"/><div class="">离线 <span class="f18 clr_yellow bold">{{info.off}}</span></div></li>
      <li class="clearfix"><img src="./../../../assets/image/monitor_icon04.png" class="fl"/><div class="">正常 <span class="f18 clr_yellow bold">{{info.normal}}</span></div></li>
    </ul>
    <div class="company_list" v-if="showCompanyDialog">
      <div class="company_tit p20 clearfix">
        <span class="txtColor block fl">今日监测情况</span>
        <i class="el-dialog__close el-icon el-icon-close f18 block fr" @click="showCompanyDialog = false"></i>
      </div>
      <div class="p20">
        <el-table v-loading="companyListLoading" :data="companyList" :height="500"
                  element-loading-text="拼命加载中" fit ref="tableList">
          <el-table-column label="餐企名称" align="center" prop="company"></el-table-column>
          <el-table-column label="温度℃" align="center" prop="temperature"></el-table-column>
          <el-table-column label="风速m/s）" align="center" prop="wind_speed"></el-table-column>
          <el-table-column label="噪声Hz" align="center" prop="noise"></el-table-column>
          <el-table-column label="油烟浓度（mg/m3）" align="center" prop="concentration"></el-table-column>
          <el-table-column label="TVOC（mg/m3）" align="center" prop="tvoc"></el-table-column>
          <el-table-column label="风机状态" align="center" prop="num">
            <template slot-scope="scope">
<!--              <i :class="['iconfont','icon-fengji',scope.row.status == 1 ? 'red01':'green01']"></i>-->
              <i :class="['iconfont','icon-fengji',scope.row.fan == 2 ? 'red01':'green01']"></i>
            </template>
          </el-table-column>
          <el-table-column label="净化器状态" align="center" prop="num">
            <template slot-scope="scope">
<!--              <i :class="['iconfont','icon-fengji',scope.row.status == 1 ? 'red01':'green01']"></i>-->
              <i :class="['iconfont','icon-fengji',scope.row.cleansing == 2 ? 'red01':'green01']"></i>
            </template>
          </el-table-column>
          <el-table-column label="监测状态" align="center" prop="trouble" :formatter="formatStatus">
<!--            <template slot-scope="scope">-->
<!--              <span class="red01">{{scope.row.super_status  | filtersStatus}}</span>-->
<!--            </template>-->
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize"
                    @pagination="getList" class="text-right"/>
      </div>
    </div>
    <div class="bottom_arrow text-center" @click="showCompanyDialog = true">
      <span :class="['triangle',showCompanyDialog == true ?'isTop':'isBottom']"></span>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {facilityDetail, homeIndex,} from '@/api/monitor'
  import draggable from 'vuedraggable'
  import waves from '@/directive/waves'
  import { mapState } from 'vuex'
  import Pagination from "@/components/Pagination/index"; // waves directive
  import paraView from "./components/view";
  import point01 from '@/assets/image/point01.png' // 引入刚才的map.js 注意路径
  import point02 from '@/assets/image/point02.png' // 引入刚才的map.js 注意路径
  import point03 from '@/assets/image/point03.png' // 引入刚才的map.js 注意路径
  import point04 from '@/assets/image/point04.png' // 引入刚才的map.js 注意路径
  import LineChart from '@/components/Charts/LineChart'
  import map from '@/components/Map/map'
  import {dataList, realTime} from "@/api/police";
  import {homeTrend} from "@/api/chart";
  import {cityList} from "@/api/jurisdiction";
  import {companyDetail, companyList} from "@/api/catering";
  import {dicList} from "@/api/dictionary"; // 引入刚才的map.js 注意路径
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
        polluteSListLoading:false,
        polluteSList:[{
          name:'净化器',
          val:'',
        },{
          name:'风机',
          val:'',
        }],
        polluteListLoading:false,
        polluteList:[{
          name:'油烟浓度',
          val:'',
          status:''
        }],
        companyName:'',
        companyStatus:"",
        companyInfo:{},
        cityList:[],
        cateringList:[],
        info:{},
        showSearchDialog:false,
        showCompanyDialog:false,
        total:1,
        companyList: [],
        companyListLoading: false,
        listQuery: {
          start_time:this.$moment().format('YYYY-MM-DD') + ' 00:00:00',
          end_time:this.$moment().format('YYYY-MM-DD') + ' 23:59:59',
          super_status:2,
          super:2,
          page:1,
          pageSize:10
        },
        temp:{
          street:'',
          company:''
        },
        zoom:12,
        centerLatitude:'30.20835',//中心纬度
        centerLongitude:'120.21194',//中心经度
        activeId:'',
        list: [],
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
          series: [{
            name:'TVOC',
            symbol:'circle',
            symbolSize:8,
            color:'#CC3275',
            itemStyle : {
              normal : {
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
            data: [],
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
            data: [],
            type: 'line'
          }]
        },
        PieChartLegend:[],
        normalList:[],
        offList:[],
        superList:[],
        troubleList:[],
        companyType:[],
        facilityInfo:{},
        cookList:[],
        scaleList:[],
        realTimeInfo:{
          // addtime:''
        },
      }
    },
    filters: {
      filtersStatus: function (value) {
        let StatusArr = {1: '正常', 2: '关闭'}
        return StatusArr[value]
      },
      filtersCompanyStatus: function (value) {
        let StatusArr = {1: '正常', 2: '禁用'}
        return StatusArr[value]
      },
    },
    computed: {
      ...mapState({
        roles: state => state.user.roles,
      }),
    },
    mounted() {
      this.onLoad();
      this.getIndex();
      this.getMonitor();
      this.getCity();
      this.getCompanyList();
      this.getCompanyType();
      this.getCookType();
      this.getScaleType();
    },
    methods: {
      // homeTrend
      getChart(id){
        homeTrend({facility_id:id}).then(res=>{
          // this.list = res.data.data;
          // this.total = res.data.count
          let a = res.data.map(item=>{return item.x_name})
          this.lineData.xAxis.data = a;
          console.log( a)
          console.log(res.data.map(item=>{ return item.y_tvoc_num}))
          this.lineData.series[0].data = res.data.map(item=>{ return item.y_tvoc_num})
          this.lineData.series[1].data = res.data.map(item=>{return item.y_fume_num})
        });
      },
      formatStatus(row, column, cellValue, index) {
        // item.is_trouble == 1 && item.status == 1   正常设备
        // item.status == 2   离线设备
        // item.is_trouble == 2    && item.status == 1故障设备
        // super_status==2 超标设备
        return row.is_trouble == 1 && cellValue == 1
          ? "正常"
          : cellValue == 2
            ? "离线"
            : row.is_trouble == 2 && cellValue == 3
              ? "故障"
              :  row.super_status == 2
                ? "超标"
                : "";
      },
      getInfo(id){
        realTime({facility_id:id}).then(res=>{
          this.realTimeInfo = res.data;
          this.polluteSList=[{
            name:'净化器',
            status:res.data.cleansing == 1?'正常':'关闭',
          },{
            name:'风机',
            status:res.data.fan == 1?'正常':'关闭',
          }]

          this.polluteList[0].val = res.data.concentration
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
        dicList({ parent_id: 2,
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
        dicList({ parent_id: 16,
          page: 1,
          pageSize: 9999,}).then(res => {
          this.companyType = res.data.data
        });
      },
      getFacilityDetail(id){
        facilityDetail({id:id}).then(res=>{
          const { id,product, city_id,name, version,facility_no,imei,start_time,images,remark} = res.data
          this.facilityInfo = { id,product, city_id,name, version,facility_no,imei,start_time,images,remark}
        });
      },
      getCity() {
        cityList({  key_word:'', page: 1, pageSize: 99999}).then(res => {
          this.cityList = res.data.data
        });
      },
      getCompanyList() {
        companyList({    key_word: '',
          street: '',
          scale_type:'',
          cook_type:'',
          status:'',
          page: 1,
          pageSize: 99999}).then(res => {
          this.cateringList = res.data.data
        });
      },
      getMonitor(){
        dataList(this.listQuery).then(res=>{
          this.companyList = res.data.data;
          this.total = res.data.total
        });
      },
      getIndex(){
        homeIndex(this.temp).then(res => {
          this.list = res.data.list;
          // let list = res.data.list;
          // // 正常图标
          // this.normalList = list.filter(item=>{
          //   return item.is_trouble == 1
          // })
          // // 离线图标
          // this.offList = list.filter(item=>{
          //   return item.is_trouble == 2 && item.status == 2
          // })
          // // 超标图标
          // this.superList = list.filter(item=>{
          //   // item.is_trouble == 1
          // })
          // // 故障图标
          // this.troubleList = list.filter(item=>{
          //   return item.is_trouble == 2 && item.status == 1
          // })
          let superNum = res.data.super;
          const {normal,off,trouble} = res.data;
          this.info = {normal,off,trouble,superNum};
          this.getMarker();
        });
      },
      onLoad() {
        let T = window.T
        this.map = new T.Map('mapDiv')
        this.map.centerAndZoom(new T.LngLat(this.centerLongitude, this.centerLatitude), this.zoom) // 设置显示地图的中心点和级别
        this.map.setStyle('indigo');
        document.getElementsByClassName("tdt-control-copyright tdt-control")[0].style.display = 'none';
      },
      getMarker(){
        //创建图片对象
        let icon01 = new T.Icon({
          iconUrl: point01,
          iconSize: new T.Point(66, 59),
          iconAnchor: new T.Point(34, 59)
        });
        let icon02 = new T.Icon({
          iconUrl: point02,
          iconSize: new T.Point(66, 59),
          iconAnchor: new T.Point(34, 59)
        });
        let icon03 = new T.Icon({
          iconUrl: point03,
          iconSize: new T.Point(66, 59),
          iconAnchor: new T.Point(34, 59)
        });
        let icon04 = new T.Icon({
          iconUrl: point04,
          iconSize: new T.Point(66, 59),
          iconAnchor: new T.Point(34, 59)
        });
        for (let i = 0; i < this.list.length; i++) {
          let markers = []
          // item.is_trouble == 1 && item.status == 1 正常设备
          if(this.list[i].is_trouble == 1 && this.list[i].status == 1){
            let point = new T.LngLat(this.list[i].log, this.list[i].lat);
            markers.push( drawTMaker(point, icon04,this,i));
          }else if(this.list[i].status == 2 ){ //离线设备
            let point = new T.LngLat(this.list[i].log, this.list[i].lat);
            markers.push(drawTMaker(point, icon03,this,i));
            //  marker = new T.Marker(point, {icon: icon02});// 创建标注
            // this.map.addOverLay(marker);
          } else if(this.list[i].is_trouble == 2 && this.list[i].status == 1){ //故障设备
              let point = new T.LngLat(this.list[i].log, this.list[i].lat);
              markers[i]  = drawTMaker(point, icon02,this,i);
          } else if(this.list[i].super_status && this.list[i].super_status == 2 ) {
            let point = new T.LngLat(this.list[i].log, this.list[i].lat);
            markers.push(drawTMaker(point, icon01,this,i));
          }
        }

        //往地图上添加一个marker。传入参数坐标信息lnglat。传入参数图标信息。
        function drawTMaker(lnglat,icon,that,i){
          let marker =  new T.Marker(lnglat, {icon: icon});
          that.map.addOverLay(marker);
          marker.addEventListener("click", function (m) {
            console.log(m)

            //创建信息窗口对象
            // let marker = new T.Marker(new T.LngLat(117.283042, 31.86119));// 创建标注
            // let marker = new T.Marker(new T.LngLat(this.centerLongitude, this.centerLatitude), {icon: icon01});// 创建标注
            // console.log(marker)
            // this.map.addOverLay(marker);
            let infoWin1 = new T.InfoWindow();
            let status = ''
            if(that.list[i].is_trouble == 1 && that.list[i].status == 1){
              status='正常'
            }else if(that.list[i].status == 2 ){
              status='离线'
            }else if(that.list[i].is_trouble == 2 && that.list[i].status == 1){
              status='故障'
            }else if(that.list[i].super_status && that.list[i].super_status == 2 ) {
              status='超标'
            }
            let sContent =
              '<div class="f14 baseColor text-center">' +
              '<p ref="enterpriseName" class="bold">'+ that.list[i].company +'</p>' +
              '<p ref="enterpriseName">监测状态：<span class="red01">'+ status +'</span></p>' +
              '</div>';
            infoWin1.setContent(sContent);
            marker.openInfoWindow(infoWin1);
            that.showSearchDialog = true;
            that.getCompanyView(that.list[i].company_id);
            that.companyName = that.list[i].company;
            that.companyStatus = status;
            that.getFacilityDetail(that.list[i].facility_id);
            that.getInfo(that.list[i].facility_id);
            that.getChart(that.list[i].facility_id);
          });// 将标注添加到地图中
          return marker;
        }
      },
      getCompanyView(companyId){
        companyDetail({id:companyId}).then(res=>{
          const {id,company, simple_name, organization_code, status, company_code, principal, mobile, tel, company_type, cook_type, area,
            kitchen_range_num, outlet_num, scale_type, city, street, address, images, remark} = res.data;
          this.companyInfo = {id,company, simple_name, organization_code, status, company_code, principal, mobile, tel, company_type, cook_type, area,
            kitchen_range_num, outlet_num, scale_type, city, street, address, images, remark};
        });
      },
      handleTab(val){
        this.activeId = val;
      }

    }
  }
</script>
<style lang="scss" scoped>
  @import './../../../styles/variables.scss';
  /deep/.tdt-infowindow-content-wrapper, /deep/.tdt-infowindow-tip{
    background: rgba(21,45,107,1);
    box-shadow: $menuText 0 0 8px inset;
  }
  /deep/.tdt-infowindow-content-wrapper{
    border-radius: 5px;
  }
  /deep/.tdt-infowindow-content p{
    margin: 5px 0;
  }
  .app-container{
    height: calc(100vh - 135px);
    overflow: auto;
    box-sizing: border-box;
    padding: 0!important;
  }
  .bottom_arrow{
    position: fixed;
    bottom: 15px;
    left: 50%;
    z-index: 2000;
    width: 50px;
    height: 25px;
    background: rgba(24,46,111,1);
    .triangle{
      display: inline-block;
      margin-top: 5px;
      width: 0;
      height: 0;

      border-right: 10px solid transparent;
      border-left: 10px solid transparent;
      &.isTop{
        border-bottom: 13px solid rgba(75,255,254,1);
      }
      &.isBottom{
        border-top: 13px solid rgba(75,255,254,1);
      }
    }
  }
  .mapDiv {
    height: 100%;
    background-color: #074fb3 !important;
    box-shadow: $menuText 0 0 18px inset;
  }
  .map_info{
    width: 260px;
    position: fixed;
    top: 150px;
    right: 50px;
    z-index: 2000;
    .map_info_tit{
      width: 160px;
      line-height: 2;
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
    top: 150px;
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
    bottom: 50px;
    right: 50px;
    z-index: 2000;
    background: #0a275f;
    padding: 20px 10px;
    border-radius: 10px;
    li{
      width: 160px;
      height: 53px;
      line-height: 53px;
      /*padding-left: 53px;*/
      background: url("../../../assets/image/monitor_bg1.png") right center no-repeat;
      /*background-size: 100% 100%;*/
      img{
        width: 53px;
        height: 53px;
      }
      div{
        padding-left: 66px;
        span{
          margin-left: 10px;
        }
      }
    }
  }
  .company_list{
    width: 800px;
    position: fixed;
    bottom: 45px;
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
