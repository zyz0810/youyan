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
    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" fit ref="tableList" class="titleBg_table">
      <el-table-column label="序号" type="index" width="80" align="center" ></el-table-column>
      <el-table-column label="设备名称" align="center" prop="name"></el-table-column>
      <el-table-column label="监测时间" align="center">
        <template slot-scope="scope">
          <span>{{$moment(scope.row.time).format('YYYY-MM-DD HH:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="油烟浓度（mg/m3）" align="center" prop="num"></el-table-column>
      <el-table-column label="TVOC（mg/m3）" align="center" prop="num"></el-table-column>
      <el-table-column label="风机状态" align="center">
        <template slot-scope="scope">
          <i :class="['iconfont','icon-fengji', { red01: scope.row.status==0, green01: scope.row.status==1 }]"></i>
        </template>
      </el-table-column>
      <el-table-column label="净化器" align="center">
        <template slot-scope="scope">
          <i class="iconfont icon-fengji red01"></i>
        </template>
      </el-table-column>
      <el-table-column label="监测状态" align="center">
        <template slot-scope="scope">
          <span>{{$moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList" class="text-right"/>

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
      viewData: {
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
        total:0,
        list: [{
          name:1111,
          num:1,
          status:1
        }],
        listLoading: false,
        listQuery:{
          parameterId:'',
          page:1,
          limit:10
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
        let StatusArr = {0:'禁用', 1:'启用'}
        return StatusArr[value]
      }
    },
    mounted() {

    },
    methods: {
      open(){
        // this.listQuery.parameterId = this.paraData.id
        // this.operatingMode = this.paraData.option.operatingMode
        // this.getList();
        // this.name = this.paraData.option.name
      },
      close(){},
      getList(){
        paraValueList(this.listQuery).then(res=>{
          this.list = res.data.data;
          this.total = res.data.count
        });
      },

    }
  }
</script>
