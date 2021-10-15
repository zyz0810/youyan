<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="search_form">
        <el-form-item label="">
          <el-input v-model.trim="listQuery.facility_no" placeholder="设备编号" clearable/>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model.trim="listQuery.imei" placeholder="设备IMEI" clearable/>
        </el-form-item>
        <el-form-item label="" prop="key_word">
          <el-input v-model.trim="listQuery.key_word" placeholder="输入设备名称或简称" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button class="filter-item btn_purple" type="primary" icon="el-icon-notebook-2" @click="handleView('create','')">新增信息</el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-notebook-2" @click="handleExport">导出信息</el-button>

      </div>
    </div>
    <el-table v-loading="listLoading" :data="list" :height="tableHeight"
              element-loading-text="拼命加载中" fit ref="tableList">
      <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
<!--      <el-table-column label="餐企名称" align="center" prop="name"></el-table-column>-->
      <el-table-column label="设备名称" align="center" prop="name"></el-table-column>
      <el-table-column label="所属辖区" align="center" prop="city_name"></el-table-column>
      <el-table-column label="设备编号" align="center" prop="facility_no"></el-table-column>
      <el-table-column label="设备IMEI" align="center" prop="imei"></el-table-column>
      <el-table-column label="安装日期" align="center" width="140" prop="start_time"></el-table-column>
      <el-table-column label="操作" align="center" min-width="160">
        <template slot-scope="scope">
          <el-button class="filter-item" type="primary" @click="handleView('view',scope.row)">查看</el-button>
          <el-button class="filter-item btn_purple" type="primary" @click="handleView('update',scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize"
                @pagination="getList" class="text-right"/>
    <paraView :showDialog.sync="showViewDialog" :paraData="paraData" @insertList="getList"></paraView>

  </div>
</template>

<script>
  import {facilityList} from '@/api/monitor'
  import draggable from 'vuedraggable'
  import waves from '@/directive/waves'
  import { mapState } from 'vuex'
  import Pagination from "@/components/Pagination/index"; // waves directive
  import paraView from "./components/view";
  import {getCitySelected} from "@/utils/auth";
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
        showViewDialog:false,
        paraData:{},
        paraLoading:false,
        total: 0,

        list: [],
        listLoading: false,
        listQuery: {
          facility_no: '',
          imei: '',
          key_word:'',
          city_id:getCitySelected(),
          page: 1,
          pageSize: 10
        },
        dialogFormVisible: false,

        tableHeight:'100'
      }
    },
    filters: {
      filtersStatus: function (value) {
        let StatusArr = {0: '禁用', 1: '启用'}
        return StatusArr[value]
      },
      filtersMode: function (value) {
        let StatusArr = {0: '下拉框', 1: '复选框', 2: '输入框'}
        return StatusArr[value]
      }
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
    },
    methods: {

      handleFilter() {
        this.listQuery.page = 1;
        this.getList()
      },
      getList() {
        facilityList(this.listQuery).then(res => {
          this.list = res.data.data
          this.total = res.data.total
        });
      },



      handleView(type,row){
        this.showViewDialog = true;
        this.paraData={
          option: {
            // name: this.rowInfo[0].name,
            // operatingMode: this.rowInfo[0].operatingMode
          },
          operatorType: type,
          id: type == 'create'?'':row.id
        }
      },

      handleExport(){},

    }
  }
</script>
