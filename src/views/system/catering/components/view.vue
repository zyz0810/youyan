<template>
  <myDialog
    :visible.sync="showViewDialog"
    :close-on-click-modal="false"
    width="80%"
    @close="close"
    top="5vh"
    title="餐企信息"
    class="dialogContainer"
    @open="open"
  >
    <el-form ref="dataForm" :rules="rules" :inline="true" :model="temp" label-width="120px">
      <el-form-item label="餐企名称" prop="company">
        <el-input v-model.trim="temp.company" placeholder="请输入餐企名称" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="餐企简称" prop="simple_name">
        <el-input v-model.trim="temp.simple_name" placeholder="请输入餐企简称" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="信用代码" prop="credit_code">
        <el-input v-model.trim="temp.credit_code" placeholder="请输入信用代码" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="组织机构代码" prop="organization_code">
        <el-input v-model.trim="temp.organization_code" placeholder="请输入组织机构代码" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="企业状态" prop="status">
        <el-select v-model="temp.status">
          <el-option v-for="item in companyStatus" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业编码" prop="company_code">
        <el-input v-model.trim="temp.company_code" placeholder="请输入企业编码" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="负责人" prop="principal">
        <el-input v-model.trim="temp.principal" placeholder="请输入负责人" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model.trim="temp.mobile" placeholder="请输入手机号码" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="餐企电话" prop="tel">
        <el-input v-model.trim="temp.tel" placeholder="请输入餐企电话" autocomplete="off" clearable/>
      </el-form-item>



      <el-form-item label="餐企类型" prop="company_type">
        <el-select v-model="temp.company_type">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜系" prop="cook_type">
        <el-select v-model="temp.cook_type">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="营业面积" prop="area">
        <el-input v-model.trim="temp.area" placeholder="请输入营业面积" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="灶头数量" prop="kitchen_range_num">
        <el-input v-model.trim="temp.kitchen_range_num" placeholder="请输入灶头数量" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="排口数量" prop="outlet_num">
        <el-input v-model.trim="temp.outlet_num" placeholder="请输入排口数量" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="餐企规模" prop="scale_type">
        <el-select v-model="temp.scale_type">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属城市" prop="city">
        <el-select v-model="temp.city">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="所属分组" prop="street">-->
<!--        <el-select v-model="temp.street">-->
<!--          <el-option label="启用" value="1"></el-option>-->
<!--          <el-option label="禁用" value="0"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
    </el-form>
    <el-form ref="dataForm" :rules="rules" :model="temp" label-width="120px">
      <el-form-item label="详细地址" prop="address">
        <el-input v-model.trim="temp.address" placeholder="请输入详细地址" autocomplete="off" clearable/>
        <div id='mapDiv' class="mapDiv mt_10" style="width: 100%;height: 200px"></div>
      </el-form-item>
      <el-form-item label="门面照片" prop="images">
        <SingleImage :tempUrl="temp.images" v-on:imgSrc="hasImgSrc"></SingleImage>
      </el-form-item>
      <el-form-item label="营业执照" prop="name">
        <SingleImage :tempUrl="temp.imageUrl" v-on:imgSrc="hasImgSrc"></SingleImage>
      </el-form-item>
      <el-form-item label="备  注" prop="remark">
        <el-input type="textarea" v-model.trim="temp.remark" placeholder="备注：1000字以内" clearable></el-input>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()" :loading="paraLoading">确 定</el-button>
      <el-button @click="showViewDialog = false">取 消</el-button>
    </div>


  </myDialog>
</template>

<script>
  import {companyDetail} from '@/api/catering'
  import draggable from 'vuedraggable'
  import waves from '@/directive/waves'
  import Pagination from "@/components/Pagination/index"; // waves directive
  import map from '@/components/Map/map' // 引入刚才的map.js 注意路径
  import SingleImage from "@/components/Upload/SingleImage.vue"; // waves directive
  export default {
    name: 'parameterView',
    directives: { waves },
    mixins: [map],
    components: {
      draggable,
      Pagination,
      SingleImage
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
        map: '', // 对象
        zoom: 12, // 地图的初始化级别，及放大比例
        centerLatitude:'30.20835',//中心纬度
        centerLongitude:'120.21194',//中心经度
        paraLoading:false,
        updateId:undefined,
        dialogFormVisible: false,
        companyStatus:[{
          id:1,
          name:'正常'
        },{
          id:2,
          name:'禁用'
        }],
        temp: {
          company:'',
          simple_name:'',
          organization_code:'',
          status:1,
          company_code:'',
          principal:'',
          mobile:'',
          tel:'',
          company_type:'',
          cook_type:'',
          area:'',
          kitchen_range_num:'',
          outlet_num:'',
          scale_type:'',
          city:'',
          street:'',
          address:'',
          images:'',
          remark:'',
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
      isCanView() {
        return this.viewData.operatorType == "view";
      },
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
    methods: {
      onLoad() {
        let T = window.T
        this.map = new T.Map('mapDiv')
        this.map.centerAndZoom(new T.LngLat(this.centerLongitude, this.centerLatitude), this.zoom) // 设置显示地图的中心点和级别
        // 添加地图类型控件
        this.addCtrl()
        // // 普通标注
        let site = [
          { lng: 117.283042, lat: 31.86119 },
          { lng: 116.41238, lat: 40.07689 },
          { lng: 116.34143, lat: 40.03403 },
        ]
        // this.markerPoint(site)
        //创建图片对象
        // var icon = new T.Icon({
        //   iconUrl: point01,
        //   iconSize: new T.Point(19, 27),
        //   iconAnchor: new T.Point(10, 25)
        // });
        //创建信息窗口对象
        let marker = new T.Marker(new T.LngLat(117.283042, 31.86119));// 创建标注
        // let marker = new T.Marker(new T.LngLat(117.283042, 31.86119), {icon: icon});// 创建标注
        this.map.addOverLay(marker);



        document.getElementsByClassName("tdt-control-copyright tdt-control")[0].style.display = 'none';


      },
      hasImgSrc(val) {
        this.temp.imageUrl = val;
      },
      open(){
        if(this.viewData.operatorType != 'create'){
          this.getView();
        }

        this.$nextTick(function() {
          this.onLoad();
        })

      },
      close(){},
      getView(){
        companyDetail({id:this.viewData.id}).then(res=>{
          const {id,company, simple_name, organization_code, status, company_code, principal, mobile, tel, company_type, cook_type, area,
            kitchen_range_num, outlet_num, scale_type, city, street, address, images, remark} = res.data;
          this.temp = {id,company, simple_name, organization_code, status, company_code, principal, mobile, tel, company_type, cook_type, area,
            kitchen_range_num, outlet_num, scale_type, city, street, address, images, remark};
        });
      },


      resetTemp() {
        this.temp = {
          company:'',
          simple_name:'',
          organization_code:'',
          status:1,
          company_code:'',
          principal:'',
          mobile:'',
          tel:'',
          company_type:'',
          cook_type:'',
          area:'',
          kitchen_range_num:'',
          outlet_num:'',
          scale_type:'',
          city:'',
          street:'',
          address:'',
          images:'',
          remark:'',
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
