<template>
  <myDialog
    :visible.sync="showViewDialog"
    :close-on-click-modal="false"
    width="80%"
    @close="close"
    top="10vh"
    title="详细信息"
    class="dialogContainer"
    @open="open"
  >
    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" fit ref="tableList" :height="tableHeight" class="titleBg_table">
      <el-table-column label="序号" type="index" width="80" align="center" ></el-table-column>
      <el-table-column label="设备名称" align="center" prop="name"></el-table-column>
      <el-table-column label="监测时间" align="center" prop="addtime"></el-table-column>
      <el-table-column label="油烟浓度（mg/m3）" align="center" prop="concentration"></el-table-column>
      <el-table-column label="TVOC（mg/m3）" align="center" prop="tvoc"></el-table-column>
      <el-table-column label="风机状态" align="center">
        <template slot-scope="scope">
<!--          <i :class="['iconfont','icon-fengji', { red01: scope.row.fan == 2, green01: scope.row.status==1 }]"></i>-->
          <i :class="['iconfont','icon-fengji',scope.row.fan == 2 ? 'red01':'green01']"></i>
        </template>
      </el-table-column>
      <el-table-column label="净化器" align="center">
        <template slot-scope="scope">
<!--          <i class="iconfont icon-fengji red01"></i>-->
          <i :class="['iconfont','icon-youyanjinghuaqi',scope.row.cleansing == 2 ? 'red01':'green01']"></i>
        </template>
      </el-table-column>
        <el-table-column label="监测状态" align="center" prop="super_status" :formatter="formatStatus">
<!--        <template slot-scope="scope">-->
<!--          <span>{{scope.row.super_status | filtersStatus}}</span>-->
<!--        </template>-->
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize"
                @pagination="getList" class="text-right"/>
  </myDialog>
</template>

<script>
  import {dataList,warnDetail} from '@/api/police'
  import draggable from 'vuedraggable'
  import Pagination from "@/components/Pagination/index";
  import {getCitySelected} from "@/utils/auth";
  export default {
    name: 'policeView',
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
      viewData: {
        required: true,
        type: Object,
        default: {
          option: {},
          operatorType: "view",
          facility_id: "",
          id:''
        }
      }
    },
    data() {
      return {
        total:0,
        list: [],
        listLoading: false,
        listQuery:{
          city_id:getCitySelected(),
          facility_id:'',
          id:'',
          page:1,
          pageSize:10
        },
        tableHeight:200,
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
        let StatusArr = {1: '正常', 2: '关闭'}
        return StatusArr[value]
      }
    },

    methods: {
        formatStatus(row, column, cellValue, index) {
            // item.is_trouble == 1 && item.status == 1   正常设备
            // item.status == 2   离线设备
            // item.is_trouble == 2    && item.status == 1故障设备
            // // super_status==2 超标设备
            // return row.is_trouble == 1 && cellValue == 1
            //     ? "正常"
            //     : cellValue == 2
            //         ? "离线"
            //         : row.is_trouble == 2 && cellValue == 3
            //             ? "故障"
            //             :  row.super_status == 2
            //                 ? "超标"
            //                 : "";
          return cellValue == 1
            ? "正常"
            : cellValue == 2
              ? "异常"
              : "";
        },
      open(){
        this.listQuery.facility_id = this.viewData.facility_id;
        this.listQuery.id = this.viewData.id;
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
        // this.getCity();
      },
      close(){
        this.total=0;
        this.list= [];
        this.listLoading= false;
        this.listQuery={
          facility_id:'',
          page:1,
          pageSize:10
        };
        this.tableHeight=200;
      },
      getList(){
        // dataList(this.listQuery).then(res=>{
        //   this.list = res.data.data;
        //   this.total = res.data.total
        // });
        warnDetail({id:this.listQuery.id}).then(res=>{
          this.list = res.data;
        });
      },
    }
  }
</script>
