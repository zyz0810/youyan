<template>
<!--  <div class="sidebar-logo-container" :class="{'collapse':collapse}">-->
<!--    <transition name="sidebarLogoFade">-->
<!--      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">-->
<!--        <img v-if="logo" :src="logo" class="sidebar-logo">-->
<!--        <h1 v-else class="sidebar-title">{{ title }}111 </h1>-->
<!--      </router-link>-->
<!--      <router-link v-else key="expand" class="sidebar-logo-link" to="/">-->
<!--        <h1 class="sidebar-title"><span class="f18">集 据 物 连 </span></h1>-->
<!--      </router-link>-->
<!--    </transition>-->
<!--  </div>-->
  <el-header>
    <el-row>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"> <span style="color: transparent;">logo</span></el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="logo text-center">
        <img src="./../../../assets/image/logo.png"/>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="top_right">
        <div class="right-menu">
          <!--<template v-if="device!=='mobile'">-->
          <!--<search id="header-search" class="right-menu-item" />-->

          <!--<error-log class="errLog-container right-menu-item hover-effect" />-->

          <!--<screenfull id="screenfull" class="right-menu-item hover-effect" />-->

          <!--<el-tooltip content="Global Size" effect="dark" placement="bottom">-->
          <!--<size-select id="size-select" class="right-menu-item hover-effect" />-->
          <!--</el-tooltip>-->

          <!--</template>-->
<!--          <span class="date">{{$moment().format('YYYY-MM-DD')}}</span>-->
          <!--<div class="m_r30">-->
            <!--<span class="bold" style="margin: 0 5px; font-size: 18px">{{name}}</span>-->
            <!--<i class="el-icon-caret-bottom" />-->
          <!--</div>-->
          <el-select v-model="citySelected" placeholder="请选择" @change="chooseCity">
            <el-option v-for="item in cityList" :label="item.province+item.city+item.area" :value="item.id" :key="item.id">
            </el-option>
            <!--<el-option v-for="item in cityList" :label="item.mobile" :value="item.id" :key="item.id">-->
            <!--</el-option>-->
          </el-select>

                    <!--<el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">-->
                      <!--<div class="avatar-wrapper">-->
                        <!--&lt;!&ndash;<img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">&ndash;&gt;-->
          <!--&lt;!&ndash;              <img :src="headImg" class="user-avatar">&ndash;&gt;-->
                        <!--<span class="bold" style="margin: 0 5px; font-size: 18px">{{cityList[0].province+cityList[0].city+cityList[0].area}}</span>-->
                        <!--<i class="el-icon-caret-bottom" />-->
                      <!--</div>-->
                      <!--<el-dropdown-menu slot="dropdown" class="text-center">-->
                        <!--<el-dropdown-item divided @click.native="updateCity" v-for="item in cityList" :key="item.id">-->
                          <!--<span style="display:block;">{{item.province+item.city+item.area}}</span>-->
                        <!--</el-dropdown-item>-->
                        <!--&lt;!&ndash;<el-dropdown-item divided @click.native="logout">&ndash;&gt;-->
                          <!--&lt;!&ndash;<span style="display:block;">退 出</span>&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-dropdown-item>&ndash;&gt;-->
                      <!--</el-dropdown-menu>-->
                    <!--</el-dropdown>-->


          <!--<div class="m_r30 ml_20" @click="updatePassword">  <i class="el-icon-menu f20 bold"></i></div>-->
          <div class="f16 bold ml_20" @click="logout">退 出<i class="el-icon-switch-button bold" style="margin-left: 5px"></i></div>
        </div>
        <my-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%">
          <ul class="street">
            <li>街道1</li>
            <li>街道1</li>
            <li>街道1</li>
            <li>街道1</li>
            <li>街道1</li>
            <li>街道1</li>
            <li>街道1</li>
            <li>街道1</li>
            <li>街道1</li>
          </ul>
          <div slot="footer" class="dialog-footer" v-if="dialogStatus != 'updatePassword'">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateData()">确 定</el-button>
          </div>
        </my-dialog>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import headImg from '@/assets/headImg/img.png'
import { getToken, setToken, removeToken,getId,setId,removeId,getName,setName,removeName,getMobile,getCity,setCitySelected,getCitySelected } from '@/utils/auth'
import { validUsername, validatePhone,isPassword } from "@/utils/validate";
import {updatePassword} from '@/api/user'
import {getSmsCode} from "@/api/code";
export default {
  name: 'topTitle',
  data() {
    return {
      citySelected:Number(getCitySelected()),
      headImg: headImg,
      systemDate:'',
      // name:getName()!='null'?getName():'',
      name:'滨江区',
      nowDate:'',
      dialogFormVisible: false,
      textMap: {
        update: '选择街道',
      },
      dialogStatus: '',
      temp:{
        oldPassword:''
      },
      cityList:getCity(),
      rules:{
        password: [
          { required: true, message: "请输入密码", trigger: "change" },{validator: isPassword}
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "change" },
          { validator: validatePhone }
        ],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "change" }
        ],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "change" },{validator: isPassword}
        ]
      },
      passwordTemp:{
        confirmPassword:'',
        mobile:getMobile(),
        password:'',
        verifyCode:''
      },
      codeTxt: "获取验证码",
      disabled:false
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'city'
    ])
  },
  methods: {
    chooseCity(val){
      this.citySelected = val;
      setCitySelected(val);
      location.reload();
      console.log( getCity())
     console.log( getCitySelected())
    },
    updateCity(){},
    resetPasswordTemp(){
      this. passwordTemp={
        confirmPassword:'',
        mobile:getMobile(),
        password:'',
        verifyCode:''
      }
    },
    getCode() {
      if (this.passwordTemp.mobile != "") {
        getSmsCode({ mobile: this.passwordTemp.mobile }).then(res => {
          // this.publishOption = res.data
          // if(res.resp_code == 0){
          this.countdown2(this);
          // }
        });
      }else{
        this.$confirm(
          '请输入手机号码',
          "提示",
          {
            type: "warning",
            showCancelButton: false
          }
        )
          .then(() => {})
          .catch(() => {});
      }
    },
    countdown2(that) {
      let setTime = 60;
      let time = setTime;
      let codeTxt = "获取验证码";
      return (function timeFn(o) {
        if (time == 0) {
          that.codeTxt = codeTxt;
          that.disabled = false;
          time = setTime;
        } else {
          that.codeTxt = time + "s重试";
          that.disabled = true;
          time--;
          setTimeout(function() {
            timeFn(o);
          }, 1000);
        }
        if(that.dialogFormVisible == false){
          time = 0
        }
      })();
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    updatePassword(){
      this.resetPasswordTemp()
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData(){
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updatePassword(this.passwordTemp).then((res) => {
            if(res.resp_code == 0){
              this.dialogFormVisible = false;
              this.$message({
                message: '密码重置成功',
                type: 'success'
              });
            }
          })
        }
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/login?redirect=/dashboard`)
      location.href = 'http://erp-web.susongzhijia.com/jsc/index.html#/login?redirect=/dashboard';
    },
    // addDate() {
    //   let nowDate = new Date();
    //   this.nowDate = new Date();
    //   let date = {
    //     year: nowDate.getFullYear(),
    //     month: nowDate.getMonth() + 1,
    //     date: nowDate.getDate(),
    //   };
    //   if(date.month<10 && date.date<10){
    //     this.systemDate = date.year + '-' + 0 + date.month + '-' + 0 + date.date;
    //   }else if(date.month<10 && date.date>10){
    //     this.systemDate = date.year + '-' + 0 + date.month + '-' + date.date;
    //   }else if(date.month>10 && date.date<10){
    //     this.systemDate = date.year + '-' + date.month + '-' + 0 + date.date;
    //   }else {
    //     this.systemDate = date.year + '-' + date.month + '-' + date.date;
    //   }
    // }
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";
  .el-header{
    color: $txtColor;
    height: 100px !important;
    line-height: 60px;
    background: url("../../../assets/image/top_bg.png") left top no-repeat;
    background-size: 100% 100%;
  }
  .get_code {
    position: relative;
    button {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .logo{
    img{
      width: 60%;
      margin-top: 20px;
    }

  }
  .top_right {
    height: 60px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .date{
      font-size: 20px;
      font-weight: 500;
      line-height: 50px;
      display: inline-block;
      height: 100%;
      float: left;
      margin-right: 20px;
    }

    .right-menu {
      /*float: right;*/
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 100%;
      line-height: 60px;
      color: $txtColor !important;
      &:focus {
        outline: none;
      }
      .el-dropdown{
        color: $txtColor !important;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }
      /deep/.el-input__inner{
        font-size: 16px;
        font-weight: bold;
        background: transparent!important;
        border: none!important;
      }
      /deep/.el-select .el-input .el-select__caret{
        color: $txtColor !important;
        font-size: 20px;
        font-weight: bold;
      }
      /deep/.el-input__suffix{
        top: -2px;
      }

      /deep/.el-icon-arrow-up{
        &:before{
          content: "\e790";
        }
      }
      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          /*margin-top: 5px;*/
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
            margin-top: 5px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 20px;
            font-size: 12px;
          }
        }
      }
    }
  }
  .street{
    li{
      display: inline-block;
      line-height: 1;
      padding:  10px 20px;
      border: 1px solid $txtColor;
      border-radius: 10px;
      margin: 0 10px 10px 10px;
    }
  }
</style>
