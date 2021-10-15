<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="search_form">
        <el-form-item label="" prop="name">
          <el-input v-model.trim="listQuery.key_word" placeholder="输入关键词" @change="handleFilter" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
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
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="辖区名称" align="center" prop="name">
        <template slot-scope="scope">
          {{scope.row.province + scope.row.city + scope.row.area}}
        </template>
      </el-table-column>
      <el-table-column label="负责人" align="center" prop="principal"></el-table-column>
      <el-table-column label="负责人电话" align="center" prop="mobile"></el-table-column>
<!--      <el-table-column label="上级ID" align="center" prop="num"></el-table-column>-->
      <el-table-column label="操作" align="center" min-width="160">
        <template slot-scope="scope">
<!--          <el-button class="filter-item btn_yellow" type="primary" @click="handleDelete(scope.row)">删除</el-button>-->
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
  import {cityList} from '@/api/jurisdiction'
  import { mapState } from 'vuex'
  import Pagination from "@/components/Pagination/index";
  import paraView from "./components/view";
  import {getCitySelected} from "@/utils/auth";
  export default {
    name: 'jurisdictionList',
    components: {
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
          city_id:getCitySelected(),
          key_word:'',
          page: 1,
          pageSize: 10
        },
        tableHeight:'100'
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
        cityList(this.listQuery).then(res => {
          this.list = res.data.data
          this.total = res.data.total
        });
      },
      handleExport(){},
      handleView(type,row){
        this.showViewDialog = true;
        this.paraData = {
          option: {},
          operatorType: type,
          id: type == 'create'?'':row.id
        }
      },
    }
  }
</script>
