<template>
  <div class="app-container">
    <div class="flex data_flex">
      <div :class="['txtColor flex-item flex',activeIndex == 0?'active bold':'']" @click="handleClick(0)">
        <span class="clr_white data_icon block text-center mr_5"><i class="iconfont icon-shouji f26"></i></span>
        <span class="txtColor f16">餐企年月日超标次数排名表</span>
      </div>
      <div :class="['txtColor flex-item flex',activeIndex == 1?'active bold':'']" @click="handleClick(1)">
       <span class="clr_white data_icon block text-center mr_5"><i class="iconfont icon-shouji f26"></i></span>
        <span class="txtColor f16">污染物平均浓度年月日排名表</span>
      </div>
      <div :class="['flex-item flex',activeIndex == 2?'active bold':'']" @click="handleClick(2)">
        <span class="clr_white data_icon block text-center mr_5"><i class="iconfont icon-shouji f26"></i></span>
        <span class="txtColor f16">餐企油烟污染物历史数据</span>
      </div>
    </div>
    <div class="filter-container mt_20">
      <el-form :inline="true" :model="listQuery" class="search_form">
        <el-form-item label="时 间：" prop="name">
          <el-date-picker
            v-model="dateTime"
            clearable
            type="daterange"
            value-format="yyyy-MM-dd"
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
        <el-button class="filter-item" type="primary" icon="el-icon-notebook-2" @click="handleExport">导出信息</el-button>
      </div>
    </div>
    <div v-show="activeIndex == 0">
      <el-table v-loading="listLoading" :data="list" :height="tableHeight"
                element-loading-text="拼命加载中" fit ref="tableList">
        <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
        <el-table-column label="餐企名称" align="center" prop="x_name"></el-table-column>
        <el-table-column label="超标次数" align="center" prop="y_count"></el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize"
                  @pagination="getList" class="text-right"/>
    </div>
    <div v-show="activeIndex == 1">
      <el-table v-loading="listLoading" :data="list" :height="tableHeight"
                element-loading-text="拼命加载中" fit ref="tableList">
        <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
        <el-table-column label="餐企名称" align="center" prop="x_name"></el-table-column>
        <el-table-column label="平均油烟浓度(mg/m3)" align="center" prop="y_avg"></el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize"
                  @pagination="getList" class="text-right"/>
    </div>
    <div v-show="activeIndex == 2">
      <el-table v-loading="listLoading" :data="list" :height="tableHeight"
                element-loading-text="拼命加载中" fit ref="tableList">
        <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
        <el-table-column label="餐企名称" align="center" prop="company_name"></el-table-column>
        <el-table-column label="时间" align="center" prop="create_at">
          <template slot-scope="scope">
           {{$moment(Number(scope.row.create_at)*1000).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column label="油烟浓度(mg/m3)" align="center" prop="concentration"></el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize"
                  @pagination="getList" class="text-right"/>
    </div>
    <a v-show="false" :href="downLoadUrl" id="fileDownload"></a>
  </div>
</template>

<script>
  import {historyData,timesOfWarn} from '@/api/statistics'
  import draggable from 'vuedraggable'
  import waves from '@/directive/waves'
  import { mapState } from 'vuex'
  import Pagination from "@/components/Pagination/index"; // waves directive
  export default {
    name: 'parameterList',
    directives: {waves},
    components: {
      draggable,
      Pagination,
    },
    data() {
      return {
        activeIndex:0,
        total: 0,
        list: [],
        listLoading: false,
        listQuery: {
          start_time: '',
          end_time: '',
          company_id:'',
          page: 1,
          pageSize: 10,
          type:'allList'
        },
        tableHeight:'100',
        downLoadUrl:this.global.domainName + 'api/Export/timesOfWarn',
        // downLoadUrl:this.global.domainName + 'api/Export/historyData',
      }
    },

    computed: {
      ...mapState({
        roles: state => state.user.roles,
      }),
      dateTime: {
        get () {
          if (this.listQuery.start_time && this.listQuery.end_time) {
            return [this.listQuery.start_time, this.listQuery.end_time];
          } else {
            return [];
          }
        },
        set (v) {
          if (v) {
            this.listQuery.start_time = v[0];
            this.listQuery.end_time = v[1];
          } else {
            this.listQuery.start_time = "";
            this.listQuery.end_time = "";
          }
        },
      },
    },
    mounted() {
      this.$nextTick(function() {
        // this.$refs.filter-container.offsetHeight
        let height = window.innerHeight - this.$refs.tableList.$el.offsetTop - 510;
        if(height>100){
          this.tableHeight = height
        }else{
          this.tableHeight = 100
        }
        // 监听窗口大小变化
        const self = this;
        window.onresize = function() {
          let height = window.innerHeight - self.$refs.tableList.$el.offsetTop - 510;
          if(height>100){
            self.tableHeight = height
          }else{
            self.tableHeight = 100
          }
        };
      });
      this.getListTwo();
    },
    methods: {
      getUrl(){
        if(this.activeIndex == 2){
          this.downLoadUrl=this.global.domainName + 'api/Export/historyData?start_time='+this.listQuery.start_time+'&end_time='+this.listQuery.end_time+'&company_id='+this.listQuery.company_id+'&type=allList';
        }else{
          this.downLoadUrl=this.global.domainName + 'api/Export/timesOfWarn?start_time='+this.listQuery.start_time+'&end_time='+this.listQuery.end_time+'&company_id='+this.listQuery.company_id+'&type=allList';
        }
      },
      async handleExport(){
        await this.getUrl();
        document.getElementById("fileDownload").click();
        // if(this.activeIndex == 2){
        //   this.downLoadUrl=this.global.domainName + 'api/Export/historyData?start_time='+this.listQuery.start_time+'&end_time='+this.listQuery.end_time+'company_id='+this.listQuery.company_id+'type=allList';
        //   await document.getElementById("fileDownload").click();
        // }else{
        //   this.downLoadUrl=this.global.domainName + 'api/Export/timesOfWarn?start_time='+this.listQuery.start_time+'&end_time='+this.listQuery.end_time+'company_id='+this.listQuery.company_id+'type=allList';
        //   document.getElementById("fileDownload").click();
        // }
      },
      handleClick(val){
        this.activeIndex = val;
        if(val == 2){
          this.getList()
        }else{
          this.getListTwo();
        }
      },

      handleFilter() {
        if(this.activeIndex == 2){
          this.listQuery.page = 1;
          this.getList()
        }else{
          this.getListTwo()
        }
      },
      getList() {
        historyData({
          start_time:this.listQuery.start_time,end_time:this.listQuery.end_time,company_id:this.listQuery.company_id,page:this.listQuery.page,pageSize:this.listQuery.pageSize,
        }).then(res => {
          this.list = res.data.data
          this.total = res.data.total
        });
      },
      getListTwo(){
        timesOfWarn({
          start_time:this.listQuery.start_time,end_time:this.listQuery.end_time,company_id:this.listQuery.company_id,type:this.listQuery.type,
        }).then(res => {
          this.list = res.data
          // this.total = res.data.total
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
      &.active{
        background: #061635 !important;
      }
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
