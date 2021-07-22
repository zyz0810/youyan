<template>
  <div class="app-container">
    <div class="flex data_flex">
      <div class="txtColor flex-item flex" @click="handleClick(0)">
        <span class="clr_white data_icon block text-center mr_5"><i class="iconfont icon-shouji f26"></i></span>
        <span class="txtColor f16">餐企年月日超标次数排名表</span>
      </div>
      <div class="txtColor flex-item flex" @click="handleClick(1)">
       <span class="clr_white data_icon block text-center mr_5"><i class="iconfont icon-shouji f26"></i></span>
        <span class="txtColor f16">污染物平均浓度年月日排名表</span>
      </div>
      <div class="flex-item flex" @click="handleClick(2)">
        <span class="clr_white data_icon block text-center mr_5"><i class="iconfont icon-shouji f26"></i></span>
        <span class="txtColor f16">餐企油烟污染物历史数据</span>
      </div>
    </div>
    <div v-show="activeIndex == 0">
      <div class="filter-container mt_20">
        <el-form :inline="true" :model="listQuery" class="search_form">
          <el-form-item label="时 间：" prop="name">
            <el-date-picker
              v-model="temp.name"
              clearable
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button class="filter-item" type="primary" icon="el-icon-notebook-2" @click="handleCreate">导出信息</el-button>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="list" :height="tableHeight"
                element-loading-text="拼命加载中" fit ref="tableList" @row-click="clickRow" @selection-change="handleSelectionChange">
        <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
        <el-table-column label="餐企名称" align="center" prop="name"></el-table-column>
        <el-table-column label="超标次数" align="center" prop="num"></el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                  @pagination="getList" class="text-right"/>
    </div>
    <div v-show="activeIndex == 1">
      <div class="filter-container mt_20">
        <el-form :inline="true" :model="listQuery" class="search_form">
          <el-form-item label="时 间：" prop="name">
            <el-date-picker
              v-model="temp.name"
              clearable
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button class="filter-item" type="primary" icon="el-icon-notebook-2" @click="handleCreate">导出信息</el-button>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="list" :height="tableHeight"
                element-loading-text="拼命加载中" fit ref="tableList" @row-click="clickRow" @selection-change="handleSelectionChange">
        <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
        <el-table-column label="餐企名称" align="center" prop="name"></el-table-column>
        <el-table-column label="油烟浓度(mg/m3)" align="center" prop="num"></el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                  @pagination="getList" class="text-right"/>
    </div>
    <div v-show="activeIndex == 2">
      <div class="filter-container mt_20">
        <el-form :inline="true" :model="listQuery" class="search_form">
          <el-form-item label="时 间：" prop="name">
            <el-date-picker
              v-model="temp.name"
              clearable
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button class="filter-item" type="primary" icon="el-icon-notebook-2" @click="handleCreate">导出信息</el-button>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="list" :height="tableHeight"
                element-loading-text="拼命加载中" fit ref="tableList" @row-click="clickRow" @selection-change="handleSelectionChange">
        <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
        <el-table-column label="超标时间" align="center" prop="name"></el-table-column>
        <el-table-column label="有烟雾浓度(mg/m3)" align="center" prop="num"></el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                  @pagination="getList" class="text-right"/>
    </div>
    <paraView :showDialog.sync="showViewDialog" :paraData="paraData" @insertProduct="getList"></paraView>

  </div>
</template>

<script>
  import {paraList, paraSave, paraUpdate, paraDelete} from '@/api/parameter'
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
        activeIndex:0,
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
          name: '',
          status: undefined,
          page: 1,
          limit: 10
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
      // this.getList();
    },
    methods: {
      handleClick(val){
        this.activeIndex = val;
      },
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
        paraList(this.listQuery).then(res => {
          this.list = res.data.data
          this.total = res.data.count
        });
      },

      resetList() {
        this.listQuery = {
          name: '',
          status: undefined,
          page: 1,
          limit: 10
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

      handleCreate() {
        this.resetTemp();
        this.parameterValueList = [{name: ''}];
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if(this.temp.operatingMode != 2){
              let parameterValueList = this.parameterValueList.filter(item=>item.name!='')
              console.log(parameterValueList)
              if(parameterValueList.length<1){
                this.$confirm('请输入参数值', "提示", {
                  type: "warning",
                  showCancelButton: false
                })
                  .then(() => {

                  })
                  .catch(() => {});
              }else{
                this.paraLoading = true
                this.temp.parameterValueList = parameterValueList
                paraSave(this.temp).then((res) => {
                  setTimeout(()=>{
                    this.paraLoading = false
                  },1000)
                  if(res.resp_code == 0){
                    this.list.unshift(res.data);
                    this.dialogFormVisible = false;
                    this.getList();
                    this.$message({
                      message: '增加成功',
                      type: 'success'
                    });
                  }
                }).catch(() => {
                  this.paraLoading = false;
                });
              }
            }else{
              this.paraLoading = true
              paraSave(this.temp).then((res) => {
                setTimeout(()=>{
                  this.paraLoading = false
                },1000)
                if(res.resp_code == 0){
                  this.list.unshift(res.data);
                  this.dialogFormVisible = false;
                  this.getList();
                  this.$message({
                    message: '增加成功',
                    type: 'success'
                  });
                }
              }).catch(() => {
                this.paraLoading = false;
              });
            }
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, this.rowInfo[0]); // copy obj

        if (this.temp.parameterValueList) {
          this.parameterValueList = this.temp.parameterValueList
        } else {
          this.parameterValueList = [{name: ''}]
        }
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp);
            this.$delete(tempData, 'updateTime')
            this.$delete(tempData, 'updateUser')
            this.$delete(tempData, 'createTime')
            this.$delete(tempData, 'createUser')
            this.$delete(tempData, 'remarks')
            this.$delete(tempData, 'status')
            if(tempData.operatingMode != 2){
              tempData.parameterValueList = this.parameterValueList
              let arr = tempData.parameterValueList.filter(item=>item.name!='')
              if(arr.length<1){
                this.$confirm('请输入参数值', "提示", {
                  type: "warning",
                  showCancelButton: false
                })
                  .then(() => {

                  })
                  .catch(() => {});
              }else{
                arr = arr.map(item=>{
                  let json={}
                  json.id=item.id;
                  json.name=item.name;
                  json.parameterId=item.parameterId;
                  return json
                })
                tempData.parameterValueList = arr
                this.paraLoading = true
                paraUpdate(tempData).then((res) => {
                  // const index = this.list.findIndex(v => v.id === this.temp.id);
                  // this.list.splice(index, 1, res.data);
                  setTimeout(()=>{
                    this.paraLoading = false
                  },1000)
                  if (res.resp_code == 0) {
                    this.getList();
                    this.dialogFormVisible = false;
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                  }
                }).catch(() => {
                  this.paraLoading = false;
                });
              }
            }else{
              this.$delete(tempData, 'parameterValueList')
              this.paraLoading = true
              paraUpdate(tempData).then((res) => {
                setTimeout(()=>{
                  this.paraLoading = false
                },1000)
                  // const index = this.list.findIndex(v => v.id === this.temp.id);
                  // this.list.splice(index, 1, res.data);
                if (res.resp_code == 0) {
                  this.getList();
                  this.dialogFormVisible = false;
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                }
              }).catch(() => {
                this.paraLoading = false;
              });
            }
          }
        })
      },
      handleState(val) {
        console.log(this.rowInfo[0].id)
        if (val == 0) {
          this.$confirm('确定禁用此参数吗?', '提示', {
            type: 'warning'
          }).then(() => {
            this.listLoading = true;
            //NProgress.start();
            let tempData = Object.assign({}, this.rowInfo[0]);
            tempData.status = 0;
            let para = {id:this.rowInfo[0].id,status:0}
            this.$delete(tempData,'createTime')
            this.$delete(tempData,'updateTime')
            this.$delete(tempData,'createUser')
            this.$delete(tempData,'updateUser')
            if(tempData.operatingMode != 2){
              tempData.parameterValueList = tempData.parameterValueList.map(item=>{
                let obj = {}
                obj.id = item.id
                obj.name = item.name
                return obj
              })
            }else{
              this.$delete(tempData, 'parameterValueList')
            }
            paraUpdate(tempData).then((res) => {
              this.listLoading = false;
              if (res.resp_code == 0) {
                // this.list.splice(index, 1);
                //NProgress.done();
                this.getList();
                this.$message({
                  message: '禁用成功',
                  type: 'success'
                });
              }
            });
          }).catch(() => {

          });
        } else {
          this.$confirm('确定启用此参数吗?', '提示', {
            type: 'warning'
          }).then(() => {
            this.listLoading = true;
            //NProgress.start();
            let tempData = Object.assign({}, this.rowInfo[0]);
            tempData.status = 1;
            this.$delete(tempData,'createTime')
            this.$delete(tempData,'updateTime')
            this.$delete(tempData,'createUser')
            this.$delete(tempData,'updateUser')
            if(tempData.operatingMode != 2){
              if(tempData.parameterValueList){
                tempData.parameterValueList = tempData.parameterValueList.map(item=>{
                  let obj = {}
                  obj.id = item.id
                  obj.name = item.name
                  return obj
                })
              }
            }else{
              this.$delete(tempData, 'parameterValueList')
            }
            // let para = {id:this.rowInfo[0].id,status:1}
            paraUpdate(tempData).then((res) => {
              this.listLoading = false;
              if (res.resp_code == 0) {
                // this.list.splice(index, 1);
                //NProgress.done();
                this.getList();
                this.$message({
                  message: '启用成功',
                  type: 'success'
                });
              }
            });
          }).catch(() => {

          });
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
<style lang="scss">
  @import './../../../styles/variables.scss';
  .data_flex{
    .flex-item{
      padding: 20px;
      border-radius: 10px;
      background: #0a275f !important;
      box-shadow: $menuText 0 0 18px inset;
      &:nth-child(1){
        .data_icon{
          background-image: linear-gradient(180deg, #2BB5F7, #4C8BEF);
        }
      }
      &:nth-child(2){
        margin: 0 10px;
        .data_icon{
          background-image: linear-gradient(180deg, #8863F7, #614CCE);
        }
      }
      &:nth-child(3){
        .data_icon{
          background-image: linear-gradient(180deg, #FFCA01, #F3B722);
        }
      }
    }
    .data_icon{
      width: 6vh;
      height: 6vh;
      line-height: 6vh;
      border-radius: 50%;
    }
  }
</style>
