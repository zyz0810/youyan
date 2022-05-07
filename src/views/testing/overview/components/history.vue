<template>
  <myDialog
    :visible.sync="showViewDialog"
    :close-on-click-modal="false"
    width="80%"
    @close="close"
    top="10vh"
    title="历史信息"
    class="dialogContainer"
    @open="open"
  >
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="search_form">
        <el-form-item label="">
          <el-select v-model="listQuery.street" placeholder="选择辖区" @change="handleFilter">
            <el-option v-for="item in cityList" :key="item.id" :label="item.province + item.city +item.area" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="key_word">
          <el-input v-model.trim="listQuery.key_word" placeholder="输入餐企名称或简称" @change="handleFilter" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" fit ref="tableList" :height="tableHeight" class="titleBg_table">
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          {{(listQuery.page - 1) * listQuery.pageSize + scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="设备名称" align="center" prop="name"></el-table-column>
      <el-table-column label="监测时间" align="center" prop="addtime"></el-table-column>
      <el-table-column label="油烟浓度（mg/m3）" align="center" prop="concentration"></el-table-column>
<!--      <el-table-column label="TVOC（mg/m3）" align="center" prop="tvoc"></el-table-column>-->
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
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize"
                @pagination="getList" class="text-right"/>

  </myDialog>
</template>

<script>
  import {dataList} from '@/api/police'
  import draggable from 'vuedraggable'
  import waves from '@/directive/waves'
  import Pagination from "@/components/Pagination/index";
  import {cityList} from "@/api/jurisdiction"; // waves directive
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
      historyData: {
        required: true,
        type: Object,
        default: {
          option: {},
          facility_id: ""
        }
      }
    },
    data() {
      return {
        tableHeight:200,
        total:0,
        list: [],
        cityList:[],
        listLoading: false,
        listQuery:{
          street:'',
          key_word:'',
          facility_id:'',
          page:1,
          pageSize:10
        },
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
        // super_status==2 超标设备
        // return row.is_trouble == 1 && cellValue == 1
        //   ? "正常"
        //   : cellValue == 2
        //     ? "离线"
        //     : row.is_trouble == 2 && cellValue == 3
        //       ? "故障"
        //       :  row.super_status == 2
        //         ? "超标"
        //         : "";
        return cellValue == 1
          ? "正常"
          : cellValue == 2
            ? "超标"
            : "";
      },
      open(){
        this.listQuery.facility_id = this.historyData.facility_id
        console.log( this.listQuery)
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
      },
      close(){},
      getList(){
        dataList(this.listQuery).then(res=>{
          this.list = res.data.data;
          this.total = res.data.total
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

    }
  }
</script>
