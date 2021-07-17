<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="search_form">
        <el-form-item label="" prop="name">
          <el-input v-model.trim="listQuery.key_word" placeholder="输入关键词" @change="handleFilter" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button class="filter-item btn_purple" type="primary" icon="el-icon-notebook-2" @click="handleUpdate('create',{})">新增信息</el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-notebook-2" @click="handleExport">导出信息</el-button>

      </div>
    </div>
    <el-table v-loading="listLoading" :data="list" :height="tableHeight"
              element-loading-text="拼命加载中" fit ref="tableList" @row-click="clickRow" @selection-change="handleSelectionChange" class="titleBg_table">
      <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="用户名" align="center" prop="name"></el-table-column>
      <el-table-column label="所属分组" align="center" prop="address"></el-table-column>
      <el-table-column label="密码" align="center" prop="password"></el-table-column>
      <el-table-column label="操作" align="center" min-width="160">
        <template slot-scope="scope">
          <el-button class="filter-item btn_yellow" type="primary" @click="handleDelete">删除</el-button>
          <el-button class="filter-item btn_purple" type="primary" @click="handleUpdate('update',scpoe.row)">修改</el-button>
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
      paraView
    },
    data() {
      return {
        showViewDialog:false,
        paraData:{},
        paraLoading:false,
        operationOption: [{
          id: 0,
          name: '下拉框'
        }, {
          id: 1,
          name: '复选框'
        }, {
          id: 2,
          name: '输入框'
        }],
        updateBtn: true,
        enableBtn: true,
        disableBtn: true,
        total: 0,
        parameterValueList: [{name: ''}],
        list: [{
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
          status:1
        }],
        listLoading: false,
        listQuery: {
          key_word: '',
          page: 1,
          pageSize: 10
        },
        updateId: undefined,
        dialogFormVisible: false,
        temp: {
          // id: undefined,
          status: 1,
          name: '',
          orders: '',
          isRequired: 0,
          operatingMode: 0,
          parameterValueList: [],
        },
        textMap: {
          update: '编辑参数信息',
          create: '新增参数信息',
          view:'查看'
        },
        dialogStatus: '',
        rules: {
          name: [{required: true, message: '请输入名称', trigger: 'change'}],
        },
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
      handleValue(val){
        // this.temp.parameterValueList.map(item=>{
        //   if(item.name == val.srcElement.value){
        //     this.$confirm(
        //       '参数值重复，请重新输入',
        //       "提示",
        //       {
        //         type: "warning",
        //         showCancelButton: false
        //       }
        //     )
        //       .then(() => {
        //
        //       })
        //       .catch(() => {});
        //   }
        // })
      },
      handleOperating(val){
        console.log(val.srcElement.value)

      },
      deleteParam(index) {
        this.parameterValueList.splice(index, 1)
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList()
      },
      getList() {
        userList(this.listQuery).then(res => {
          this.list = res.data.data
          this.total = res.data.count
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
      clickRow(row){
        this.$refs.tableList.toggleRowSelection(row)
      },
      handleSelectionChange(val) {
        console.log(val)
        this.rowInfo = val;
        if (val.length == 1) {
          this.updateBtn = false
          this.deleteBtn = false
          if(val[0].status == 0){
            this.enableBtn = false
            this.disableBtn = true
          }else{
            this.enableBtn = true
            this.disableBtn = false
          }
        } else {
          this.updateBtn = true
          this.deleteBtn = true
          this.enableBtn = true
          this.disableBtn = true
        }
      },
      addSpecifications() {
        this.parameterValueList.push({name: ''})
      },
      goView() {
        // this.$router.push('/product/view')
        // this.$router.push({path: "/product/paramView", query: {id: this.rowInfo[0].id, name: this.rowInfo[0].name,operatingMode: this.rowInfo[0].operatingMode}})
        this.showViewDialog = true
        this.paraData = {
          option: {
            name: this.rowInfo[0].name,
            operatingMode: this.rowInfo[0].operatingMode
          },
          operatorType: 'view',
          id: this.rowInfo[0].id
        }
      },

      resetTemp() {
        this.temp = {
          // id: undefined,
          status: 1,
          name: '',
          orders: '',
          isRequired: 0,
          operatingMode: 0,
          parameterValueList: [],
        }
      },

      handleUpdate(val,row) {
        this.showViewDialog = true
        this.paraData = {
          option: {
            // name: this.rowInfo[0].name,
            // operatingMode: this.rowInfo[0].operatingMode
          },
          operatorType: val,
          id: val == 'create'?'':row.id
        }
      },
      handleDelete(row, index) {
        console.log(this.rowInfo[0].id)
        this.$confirm('确定删除此记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {id: this.rowInfo[0].id};
          paraDelete(para).then((res) => {
            this.listLoading = false;
            if (res.resp_code == 0) {
              // this.list.splice(index, 1);
              //NProgress.done();
              this.getList();
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }
          });
        }).catch(() => {

        });
      },


    }
  }
</script>
