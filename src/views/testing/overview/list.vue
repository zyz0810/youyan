<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="search_form">
        <el-form-item label="">
          <el-select v-model="listQuery.street" placeholder="选择辖区">
            <el-option v-for="item in cityList" :key="item.id" :label="item.province + item.city +item.area" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="listQuery.scale_type" placeholder="选择规模">
<!--            scaleList-->
            <el-option v-for="item in scaleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="listQuery.cook_type" placeholder="选择菜系">
<!--            cookList-->
            <el-option v-for="item in cookList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="listQuery.super_status" placeholder="选择监测状态">
            <el-option label="正常" value="1"></el-option>
            <el-option label="关闭" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="key_word">
          <el-input v-model.trim="listQuery.key_word" placeholder="输入餐企名称或简称" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
        </el-form-item>
      </el-form>
      <div>
        <!--<el-button class="filter-item btn_purple" type="primary" icon="el-icon-notebook-2" @click="handleCreate">新增信息</el-button>-->
        <el-button class="filter-item" type="primary" icon="el-icon-notebook-2" @click="">导出信息</el-button>

      </div>
    </div>
    <el-table v-loading="listLoading" :data="list" :height="tableHeight"
              element-loading-text="拼命加载中" fit ref="tableList" class="titleBg_table">
      <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
      <el-table-column label="餐企名称" align="center" prop="company"></el-table-column>
      <el-table-column label="设备名称" align="center" prop="name"></el-table-column>
<!--      <el-table-column label="所属辖区" align="center" prop="city_name"></el-table-column>-->
      <el-table-column label="监测时间" align="center" width="140" prop="addtime"></el-table-column>
      <el-table-column label="油烟浓度（mg/m3）" align="center" prop="concentration"></el-table-column>
      <el-table-column label="TVOC（mg/m3）" align="center" prop="tvoc"></el-table-column>
      <el-table-column label="风机状态" align="center" prop="num">
        <template slot-scope="scope">
<!--          <span>{{$moment(scope.row.time).format('YYYY-MM-DD HH:mm:ss')}}</span>-->
          <i :class="['iconfont','icon-fengji',scope.row.fan == 2 ? 'red01':'green01']"></i>
        </template>
      </el-table-column>
      <el-table-column label="净化器" align="center" prop="num">
        <template slot-scope="scope">
          <i :class="['iconfont','icon-youyanjinghuaqi',scope.row.cleansing == 2 ? 'red01':'green01']"></i>
        </template>
      </el-table-column>
      <el-table-column label="监测状态" align="center" prop="super_status" :formatter="formatStatus">
<!--        <template slot-scope="scope">-->
<!--          <span>{{scope.row.super_status  | filtersStatus}}</span>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="160">
        <template slot-scope="scope">
          <el-button class="filter-item" type="primary" @click="handleView(scope.row)">详情</el-button>
          <el-button class="filter-item btn_purple" type="primary" @click="handleHistory(scope.row)">历史</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize"
                @pagination="getList" class="text-right"/>
    <paraView :showDialog.sync="showViewDialog" :viewData="viewData" @insertProduct="getList"></paraView>
    <history :showDialog.sync="showHistoryDialog" :historyData="historyData"></history>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import waves from '@/directive/waves'
  import { mapState } from 'vuex'
  import Pagination from "@/components/Pagination/index"; // waves directive
  import paraView from "./components/view";
  import history from "./components/history";
  import {cityList} from '@/api/jurisdiction'
  import {dataList} from '@/api/police'
  import {dicList} from "@/api/dictionary";
  export default {
    name: 'parameterList',
    directives: {waves},
    components: {
      draggable,
      Pagination,
      paraView,
      history
    },
    data() {
      return {
        showViewDialog:false,
        showHistoryDialog:false,
        historyData:{},
        viewData:{},
        total: 0,
        list: [],
        listLoading: false,
        listQuery: {
          street: '',
          scale_type: '',
          cook_type:'',
          super_status:'',
          key_word:'',
          page: 1,
          pageSize: 10
        },
        tableHeight:'100',
        cityList:[],
        scaleList:[],
        cookList:[],
      }
    },
    filters: {
      filtersStatus: function (value) {
        let StatusArr = {1: '正常', 2: '关闭'}
        return StatusArr[value]
      },
    },
    computed: {
      ...mapState({
        roles: state => state.user.roles,
      }),
    },
    mounted() {
      this.$nextTick(function() {
        // this.$refs.filter-container.offsetHeight
        let height = window.innerHeight - this.$refs.tableList.$el.offsetTop - 260;
        if(height>100){
          this.tableHeight = height
        }else{
          this.tableHeight = 100
        }
        // 监听窗口大小变化
        const self = this;
        window.onresize = function() {
          let height = window.innerHeight - self.$refs.tableList.$el.offsetTop - 260;
          if(height>100){
            self.tableHeight = height
          }else{
            self.tableHeight = 100
          }
        };
      });
      this.getList();
      this.getCity();
      this.getScaleType();
      this.getCookType();
    },
    methods: {
      formatStatus(row, column, cellValue, index) {
        // 第一版
        // item.is_trouble == 1 && item.status == 1   正常设备
        // item.status == 2   离线设备
        // item.is_trouble == 2    && item.status == 1故障设备
        // super_status==2 超标设备
        // return row.is_trouble == 1 && cellValue == 1
        //   ? "正常"
        //   : cellValue == 2
        //     ? "离线"
        //     : row.is_trouble == 2 && cellValue == 1
        //       ? "故障"
        //       :  row.super_status == 2
        //         ? "超标"
        //         : "";
        // 第二版
        // super_status 1、正常   2  超标'
        return cellValue == 1
          ? "正常"
          : cellValue == 2
            ? "超标"
                : "";
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
      getCity() {
        cityList({  key_word:'', page: 1, pageSize: 99999}).then(res => {
          this.cityList = res.data.data
        });
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList()
      },
      getList() {
        dataList(this.listQuery).then(res => {
          this.list = res.data.data
          this.total = res.data.total
        });
      },

      handleView(row){
        this.showViewDialog = true
        let status = '';

        if(row.super_status == 1){
          status = '正常'
        }else  if(row.super_status == 2){
          status = '超标'
        }
        this.viewData = {
          fac_id:row.fac_id,
          facility_id:row.facility_id,
          company_id:row.company_id,
          companyName:row.company,
          status:status
        }
        console.log(this.viewData)
      },
      handleHistory(row){
        this.showHistoryDialog = true
        this.historyData = {
          facility_id:row.facility_id
        }
      },
    }
  }
</script>
