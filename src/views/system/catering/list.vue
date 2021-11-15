<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="search_form">
        <el-form-item label="">
          <el-select v-model="listQuery.city_id" placeholder="选择辖区" clearable>
            <el-option v-for="item in cityList" :label="item.province+item.city+item.area" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="listQuery.scale_type" placeholder="选择规模" clearable>
            <el-option v-for="option in scaleList" :label="option.name" :value="option.id" :key="option.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="listQuery.cook_type" placeholder="选择菜系" clearable>
            <el-option v-for="option in cookList" :label="option.name" :value="option.id" :key="option.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="listQuery.status" placeholder="选择营业状态" clearable>
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-input v-model.trim="listQuery.key_word" placeholder="输入餐企名称或简称" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button class="filter-item btn_purple" type="primary" icon="el-icon-notebook-2" @click="handleView('create',{})">新增信息</el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-notebook-2" @click="handleCreate">导出信息</el-button>
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
      <el-table-column label="餐企简称" align="center" prop="simple_name"></el-table-column>
      <el-table-column label="所属辖区" align="center" prop="city_name"></el-table-column>
      <el-table-column label="所属来源" align="center" prop="depart_id">
        <template slot-scope="scope">
          <span>{{scope.row.depart_id | filtersDepart}}</span>
        </template>
      </el-table-column>
      <el-table-column label="餐企规模" align="center" prop="scale_type"></el-table-column>
      <el-table-column label="餐企类型" align="center" prop="num">
        <template slot-scope="scope">
          <span>{{$moment(scope.row.time).format('YYYY-MM-DD HH:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="营业状态" align="center" prop="status">
        <template slot-scope="scope">
          <span>{{scope.row.status |  filtersStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="160">
        <template slot-scope="scope">
          <el-button class="filter-item" type="primary" @click="handleView('view',scope.row)">查看</el-button>
<!--          <el-button class="filter-item btn_purple" type="primary" @click="handleView('update',scope.row)">修改</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList" class="text-right"/>
    <companyDetail :showDialog.sync="showViewDialog" :viewData="viewData" @insertList="getList"></companyDetail>

  </div>
</template>

<script>
  import {companyList} from '@/api/catering'
  import {cityList} from '@/api/jurisdiction'
  import {dicList} from "@/api/dictionary";
  import draggable from 'vuedraggable'
  import waves from '@/directive/waves'
  import { mapState } from 'vuex'
  import Pagination from "@/components/Pagination/index"; // waves directive
  import companyDetail from "./components/view";
  import {getCitySelected} from "@/utils/auth";
  export default {
    name: 'companyList',
    directives: {waves},
    components: {
      draggable,
      Pagination,
      companyDetail
    },
    data() {
      return {
        showViewDialog:false,
        viewData:{},
        paraLoading:false,
        enableBtn: true,
        disableBtn: true,
        total: 0,
        parameterValueList: [{name: ''}],
        list: [],
        listLoading: false,
        listQuery: {
          city_id:'',
          key_word: '',
          scale_type:'',
          cook_type:'',
          status:'',
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
        tableHeight:'100',
        cityList:[],
        scaleList:[],
        cookList:[]
      }
    },
    filters: {
      filtersStatus: function (value) {
        let StatusArr = {2: '禁用', 1: '启用'}
        return StatusArr[value]
      },
      filtersMode: function (value) {
        let StatusArr = {0: '下拉框', 1: '复选框', 2: '输入框'}
        return StatusArr[value]
      },
      filtersDepart: function (value) {
        let StatusArr = {1: '浦沿中队', 2: '长河中队',3: '西兴中队'};
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
      getCookType(){
        dicList({ city_id:getCitySelected(), parent_id: 1,
          page: 1,
          pageSize: 9999,}).then(res => {
          this.cookList = res.data.data
        });
      },
      getScaleType(){
        dicList({ city_id:getCitySelected(), parent_id: 3,
          page: 1,
          pageSize: 9999,}).then(res => {
          this.scaleList = res.data.data
        });
      },
      getCity() {
        cityList({  city_id:getCitySelected(), key_word:'', page: 1, pageSize: 10}).then(res => {
          this.cityList = res.data.data;
        });
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
        companyList(this.listQuery).then(res => {
          this.list = res.data.data
          this.total = res.data.total
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
      handleView(type,row){
        this.showViewDialog = true
        this.viewData = {
          operatorType:type,
          id:row.id,
          option:{}
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
