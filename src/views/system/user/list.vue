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
        <el-button class="filter-item btn_purple" type="primary" icon="el-icon-notebook-2" @click="handleView('create',{})">新增信息</el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-notebook-2" @click="handleExport">导出信息</el-button>

      </div>
    </div>
    <el-table v-loading="listLoading" :data="list" :height="tableHeight"
              element-loading-text="拼命加载中" fit ref="tableList" class="titleBg_table">
      <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
      <!--<el-table-column label="ID" align="center" prop="id"></el-table-column>-->
      <el-table-column label="用户名" align="center" prop="name"></el-table-column>
      <el-table-column label="所属分组" align="center" prop="city_name"></el-table-column>
      <el-table-column label="手机号" align="center" prop="mobile"></el-table-column>
      <!--<el-table-column label="密码" align="center" prop="password"></el-table-column>-->
      <el-table-column label="操作" align="center" min-width="160">
        <template slot-scope="scope">
          <!--<el-button class="filter-item btn_yellow" type="primary" @click="handleDelete">删除</el-button>-->
          <el-button class="filter-item btn_purple" type="primary" @click="handleView('update',scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize"
                @pagination="getList" class="text-right"/>
    <paraView :showDialog.sync="showViewDialog" :paraData="paraData" @insertUser="getList"></paraView>
  </div>
</template>

<script>
  import {userList} from '@/api/user'
  import { mapState } from 'vuex'
  import Pagination from "@/components/Pagination/index";
  import paraView from "./components/view";
  import {getCitySelected} from "@/utils/auth";
  export default {
    name: 'parameterList',
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
          key_word: '',
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
      handleView(type,row){
        this.showViewDialog = true;
        this.paraData = {
          option: {},
          operatorType: type,
          id: type == 'create'?'':row.id
        }
      },
      handleExport(){},
      handleFilter() {
        this.listQuery.page = 1;
        this.getList()
      },
      getList() {
        userList(this.listQuery).then(res => {
          this.list = res.data.data
          this.total = res.data.total
        });
      },
      resetList() {
        this.listQuery = {
          key_word: '',
          page: 1,
          pageSize: 10
        }
        this.getList();
      },
    }
  }
</script>
