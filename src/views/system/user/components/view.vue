<template>
  <myDialog
    :visible.sync="showViewDialog"
    :close-on-click-modal="false"
    width="60%"
    @close="close"
    top="10vh"
    title="用户信息"
    class="dialogContainer"
    @open="open"
  >
    <el-form ref="dataForm" :rules="rules" :model="temp" label-width="120px" style="width: 400px; margin-left:50px;">

      <el-form-item label="所属分组" prop="name">
        <el-input v-model.trim="name" placeholder="请输入所属分组" autocomplete="off" :disabled="true" clearable/>
      </el-form-item>
      <el-form-item label="分组ID" prop="name">
        <el-input v-model.trim="temp.name" placeholder="请输入分组ID" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model.trim="temp.name" placeholder="请输入用户名" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="temp.password" placeholder="请输入密码" autocomplete="off" clearable/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showViewDialog = false">取 消</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()" :loading="paraLoading">确 定</el-button>
    </div>


  </myDialog>
</template>

<script>
  import {addUser} from '@/api/user'
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
        temp: {
          name:'',
          password:'',
        },
        rules: {
          name: [{ required: true, message: '请输入用户名', trigger: 'change' }],
          password: [{ required: true, message: '请输入密码', trigger: 'change' }],
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
    methods: {
      open(){
        this.getList();
      },
      close(){},
      getList(){
        addUser(this.listQuery).then(res=>{
          this.list = res.data.data;
          this.total = res.data.count
        });
      },

      resetTemp() {
        this.temp = {
          name:'',
          password:'',
        }
      },


      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.paraLoading = true
            addUser(this.temp).then((res) => {
              setTimeout(()=>{
                this.paraLoading = false
              },1000)
              if(res.resp_code == 1) {
                this.getList();
                this.showViewDialog = false;
                this.$emit('insertUser');
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
                this.showViewDialog = false;
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

    }
  }
</script>
