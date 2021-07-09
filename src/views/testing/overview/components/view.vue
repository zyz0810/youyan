<template>
  <myDialog
    :visible.sync="showViewDialog"
    :close-on-click-modal="false"
    width="60%"
    @close="close"
    top="10vh"
    title=""
    class="dialogContainer"
    @open="open"
  >

    <div class="view_tab flex text-center">
      <div class="flex-item active">实时工况</div>
      <div class="flex-item">趋势曲线</div>
      <div class="flex-item">企业信息</div>
      <div class="flex-item">设备信息</div>
    </div>
    <div class="flex">
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



  </myDialog>
</template>

<script>
  import {paraValueList,paraValueSave,paraValueUpdate,paraValueDelete} from '@/api/parameter'
  import draggable from 'vuedraggable'
  import waves from '@/directive/waves'
  import Pagination from "@/components/Pagination/index"; // waves directive
  export default {
    name: 'parameterView',
    directives: { waves },
    components: {
      draggable,
      Pagination
    },
    props: {
      showDialog: {
        required: true,
        type: Boolean,
        default: false
      },
      paraData: {
        required: true,
        type: Object,
        default: {
          option: {},
          operatorType: "view",
          id: ""
        }
      }
    },
    data() {
      return {
        paraLoading:false,
        operatingMode:'',
        updateBtn:true,
        total:0,
        specificationsItem:[''],
        list: null,
        listLoading: false,
        listQuery:{
          parameterId:'',
          page:1,
          limit:10
        },
        updateId:undefined,
        dialogFormVisible: false,
        temp: {
          name:'',
          parameterId:undefined,
          deleted:0
        },
        textMap: {
          update: '编辑规格信息',
          create: '新增规格信息'
        },
        dialogStatus: '',
        rules: {
          name: [{ required: true, message: '请输入名称', trigger: 'change' }],
        },
        name:''
      }
    },
    computed: {
      showViewDialog: {
        get() {
          return this.showDialog;
        },
        set(value) {
          this.$emit("update:show-dialog", value);
        }
      },
    },
    filters:{
      filtersStatus: function(value) {
        let StatusArr = {0:'禁用', 1:'启用'}
        return StatusArr[value]
      }
    },
    mounted() {

    },
    methods: {
      open(){
        this.listQuery.parameterId = this.paraData.id
        this.operatingMode = this.paraData.option.operatingMode
        this.getList();
        this.name = this.paraData.option.name
      },
      close(){},
      getList(){
        paraValueList(this.listQuery).then(res=>{
          this.list = res.data.data;
          this.total = res.data.count
        });
      },
      clickRow(row){
        this.$refs.tableList.toggleRowSelection(row)
      },
      handleSelectionChange(val) {
        this.rowInfo = val;
        if(val.length > 1){
          this.updateBtn = true
          this.deleteBtn = true
        }else if(val.length == 1){
          this.updateBtn = false
          this.deleteBtn = false
        }else{
          this.updateBtn = true
          this.deleteBtn = true
        }
      },

      resetTemp() {
        this.temp = {
          // parameterId:undefined,
          name:'',
          parameterId:undefined,
          deleted:0
          // orders:'',
          // isSystem:1,
        }
      },

      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.paraLoading = true
            this.temp.parameterId = this.paraData.id
            paraValueSave(this.temp).then((res) => {
              setTimeout(()=>{
                this.paraLoading = false
              },1000)
              if(res.resp_code == 0) {
                this.getList();
                // this.list.unshift(res.data);
                this.dialogFormVisible = false;
                // debugger
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
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, this.rowInfo[0]); // copy obj
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.paraLoading = true
            const tempData = Object.assign({}, this.temp);
            this.$delete(tempData,'createTime')
            this.$delete(tempData,'updateTime')
            paraValueUpdate(tempData).then((res) => {
              setTimeout(()=>{
                this.paraLoading = false
              },1000)
              if(res.resp_code == 0) {
                // const index = this.list.findIndex(v => v.id === this.temp.id);
                // this.list.splice(index, 1, res.data);
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
        })
      },
      handleDelete(row, index) {
        this.$confirm('确定删除此记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {id: this.rowInfo[0].id};
          paraValueDelete(para).then((res) => {
            this.listLoading = false;
            if(res.resp_code == 0) {
              this.getList();
              //NProgress.done();
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
  @import '@/styles/variables.scss';
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
</style>
