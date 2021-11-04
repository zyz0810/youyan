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
        <el-button class="filter-item" type="primary" icon="el-icon-notebook-2" @click="">导出信息</el-button>

      </div>
    </div>
    <el-table v-loading="listLoading" :data="list" :height="tableHeight"
              element-loading-text="拼命加载中" fit ref="tableList">
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          {{(listQuery.page - 1) * listQuery.pageSize + scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="餐企名称" align="center" prop="company"></el-table-column>
      <el-table-column label="设备名称" align="center" prop="name"></el-table-column>
<!--      <el-table-column label="所属辖区" align="center" prop="city_name"></el-table-column>-->
      <el-table-column label="油烟浓度（mg/m3）" align="center" prop="concentration">
        <!--浓烟浓度=浓烟浓度字段/times-->
        <template slot-scope="scope">
         {{(Number(scope.row.concentration)/Number(scope.row.times)).toFixed(2)}}
        </template>
      </el-table-column>
      <el-table-column label="TVOC（mg/m3）" align="center" prop="tvoc">
        <!--tvoc=tvoc/times-->
        <template slot-scope="scope">
          {{(Number(scope.row.tvoc)/Number(scope.row.times)).toFixed(2)}}
        </template>
      </el-table-column>
      <el-table-column label="超标时长（分）" align="center" prop="times">
        <!--超标时长= （times-1）*5-->
        <template slot-scope="scope">
          {{((Number(scope.row.times)-1)*5).toFixed(2)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        <template slot-scope="scope">
          <el-button class="filter-item" type="primary" @click="handleView(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize"
                @pagination="getList" class="text-right"/>
    <paraView :showDialog.sync="showViewDialog" :viewData="viewData"></paraView>

  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import waves from '@/directive/waves'
  import { mapState } from 'vuex'
  import Pagination from "@/components/Pagination/index"; // waves directive
  import paraView from "./components/view";
  import {policeList} from '@/api/police'
  import {dicList} from "@/api/dictionary";
  import {cityList} from "@/api/jurisdiction";
  import {getCitySelected} from "@/utils/auth";
  export default {
    name: 'policeList',
    directives: {waves},
    components: {
      draggable,
      Pagination,
      paraView
    },
    data() {
      return {
        showViewDialog:false,
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
          city_id:getCitySelected(),
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
        let StatusArr = {0: '禁用', 1: '启用'}
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
      getScaleType(){
        dicList({  city_id:getCitySelected(),parent_id: 2,
          page: 1,
          pageSize: 9999,}).then(res => {
          this.scaleList = res.data.data
        });
      },
      getCookType(){
        dicList({ city_id:getCitySelected(), parent_id: 1,
          page: 1,
          pageSize: 9999,}).then(res => {
          this.cookList = res.data.data
        });
      },
      getCity() {
        cityList({  city_id:getCitySelected(), key_word:'', page: 1, pageSize: 99999}).then(res => {
          this.cityList = res.data.data
        });
      },

      handleFilter() {
        this.listQuery.page = 1;
        this.getList()
      },
      getList() {
        policeList(this.listQuery).then(res => {
          this.list = res.data.data;
          this.total = res.data.total;
          console.log('总页数：'+this.total)
        });
      },
      handleView(row){
        this.showViewDialog = true
        this.viewData = {
          facility_id:row.facility_id,
          id:row.id
        }
      },
    }
  }
</script>
