<template>
  <div class="bannerAdd">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="banner-form">
      <el-form-item label="bannerTitle" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入banner标题"></el-input>
      </el-form-item>
      <el-form-item label="bannerurl" prop="url">
        <el-input v-model="ruleForm.url" placeholder="请输入banner跳转链接"></el-input>
      </el-form-item>
      <el-form-item label="bannerimg" prop="img">
        <el-upload
          :action="uploadurl"
          list-type="picture"
          :on-success="onsuccess"
          :on-preview="loadfile"
          :on-remove="handleRemove"
          >
        <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        uploadurl: 'http://127.0.0.1:8083/upload/uploadimg',
        msg: '这里是banner管理页面',
        dialogVisible: false,
        dialogImageUrl: '',
        imageUrl: '',
        ruleForm: {
          title: '',
          url: '',
          img: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入bannerTitle名称', trigger: 'blur' },
            { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '请输入bannerurl', trigger: 'blur' },
            { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      onsuccess: function (response, file) {
        this.imageURL = response;
        console.log(response);
      },
      loadfile: function (file) {
        console.log('file:' + file.response);
      },
      handleRemove: function (file) {
        this.upload(file);
        this.dialogImageUrl = file.url;
        console.log('上传' + this.dialogImageUrl);
      },
      submitForm: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('http://127.0.0.1:8083/banner/addbanner', {
              title: this.ruleForm.title,
              url: this.ruleForm.url,
              img: this.imageURL
            }, {emulateJSON: true}).then((response) => {
              console.log('fanhui' + response);
              let success = response.body.code;
              if (success === 1) {
                this.msg = response.body.message;
              }
            }, (response) => {
              console.log('error');
            });
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.banner-form
  width 400px
</style>

