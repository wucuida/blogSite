<template>
  <el-dialog
    title="登录"
    width="40%"
    :visible.sync="display"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :show-close='false'
    center>
    <el-form :model="formModel" status-icon :rules="rules" ref="formModel" label-width="100px" class="demo-ruleForm" >
      <el-form-item label="用户" prop="name">
        <el-input  v-model="formModel.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formModel.password" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancleLogin">取 消</el-button>
      <el-button type="primary" @click="submitForm('formModel')">登 录</el-button>
    </span>
  </el-dialog>
</template>
<script type="text/javascript">
  import md5 from "md5"
  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (value !== undefined && value.length) {
          if(value.length > 3 && value[value.length-3] == "?"){
            callback();
          }else{
            callback(new Error("密码格式有误"))
          }
          
        } else {
          callback(new Error('请输入密码'));
        }
      };
      return {
        display: true,
        formModel: {
          name: '',
          password: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur,change' },
            { min: 4, max: 15, message: '用户名称长度在 4 到 15 个字符', trigger: 'blur,change' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur,change' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        console.log(formName)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // todo 请求api 登录获取access_token
            let password = this.formModel.password
            this.$http.post("/api/auth", {
              'name': this.formModel.name,
              "password": md5(password.slice(0, -3)) + password.slice(-3)
            }).then(response => {
              if(response.data.error){
                this.$message({
                  'type': 'error',
                  'message': response.data.message
                })
              }else {
                sessionStorage.setItem("access_token", response.data.result)
                this.$router.push("/manage")
              }
            })
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancleLogin() {
        this.display = false
        this.$emit("home")
        this.$router.push({ path: 'home' })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      this.display = true
    }
  }
</script>