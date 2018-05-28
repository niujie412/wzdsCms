<template>
  <div class="articleAddPage">
    <h1>文章添加页面</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="addform">
      <el-form-item label="文章标题" prop="articleTitle">
        <el-input v-model="ruleForm.articleTitle"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="ruleForm.author"></el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="subTitle">
        <el-input v-model="ruleForm.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="图片地址" prop="imgUrl">
        <el-input v-model="ruleForm.imgUrl"></el-input>
      </el-form-item>
      <el-form-item label="立即上架" prop="isputaway">
        <el-switch v-model="ruleForm.isputaway"></el-switch>
      </el-form-item>
      <el-form-item label="文章内容" prop="articles" class="articlewrap">
        <el-input type="textarea" v-model="ruleForm.articles"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'isTure?',
      ruleForm: {
        articleTitle: '',
        author: '',
        subTitle: '',
        imgUrl: '',
        isputaway: false,
        articles: ''
      },
      rules: {
        articleTitle: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者名称', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        articles: [
          { required: true, message: '请填写文章内容', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
//        let _this = this;
//        let data = _this.$ruleForm;
        if (valid) {
//          alert('submit!');
          console.log(this.ruleForm);
          this.$http.post('http://127.0.0.1:8083/addarticle', {
              articleTitle: this.ruleForm.articleTitle,
              author: this.ruleForm.author,
              subTitle: this.ruleForm.subTitle,
              imgUrl: this.ruleForm.imgUrl,
              articles: this.ruleForm.articles
          }, {emulateJSON: true}).then((response) => {
            console.log(response.body.code);
            let isSuccess = response.body.code;
            if (isSuccess) {
              this.msg = response.body.message;
            }
          }, (response) => {
            console.log('error');
            console.log(this.ruleForm.articleTitle);
          });
        } else {
          console.log('error submit!!');
          return false;
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
h1
  font-style: 25px
.addform
  width: 400px
  .articlewrap
    width: 500px
</style>

