<template>
  <div class="equipmentAddPage">
    <h1>文章添加页面</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="addform">
      <el-form-item label="装备名称" prop="equipmentName">
        <el-input v-model="ruleForm.equipmentName"></el-input>
      </el-form-item>
      <el-form-item label="装备价格" prop="equipmentPrice">
        <el-input v-model="ruleForm.equipmentPrice"></el-input>
      </el-form-item>
      <el-form-item label="装备基础属性" prop="equipmentBaseProperty">
        <el-input v-model="ruleForm.equipmentBaseProperty"></el-input>
      </el-form-item>
      <el-form-item label="装备唯一属性" prop="equipmentOnlyProperty">
        <el-input type="textarea" v-model="ruleForm.equipmentOnlyProperty"></el-input>
      </el-form-item>
      <el-form-item label="装备图片" prop="equipmentImgUrl">
        <el-upload
          :action="uploadurl"
          list-type="picture"
          :on-success="onsucess"
          :on-preview="loadfile"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="装备类型" prop="type" >
        <el-select type="textarea" v-model="ruleForm.type" placeholder="装备类型" class="selectwrap">
          <el-option label="鞋子" value="1"></el-option>
          <el-option label="法抗" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <span>{{msg}}</span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'isTure?',
        dialogImageUrl: '',
        dialogVisible: false,
        uploadurl: 'http://127.0.0.1:8083/upload/uploadimg',
        imageurl: '',
        ruleForm: {
          equipmentName: '',
          equipmentBaseProperty: '',
          equipmentOnlyProperty: '',
          equipmentImgUrl: '',
          equipmentPrice: '',
          type: ''
        },
        rules: {
          equipmentName: [
            { required: true, message: '请输入装备名称', trigger: 'blur' },
            { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
          ],
          equipmentBaseProperty: [
            { required: true, message: '请输入装备基础属性', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          equipmentOnlyProperty: [
            { required: true, message: '请输入装备唯一属性', trigger: 'blur' }
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
            this.$http.post('http://127.0.0.1:8083/equipment/addEquipment', {
              equipmentName: this.ruleForm.equipmentName,
              equipmentBaseProperty: this.ruleForm.equipmentBaseProperty,
              equipmentOnlyProperty: this.ruleForm.equipmentOnlyProperty,
              equipmentImgUrl: this.imageURL,
              equipmentPrice: this.ruleForm.equipmentPrice,
              type: this.ruleForm.type
            }, {emulateJSON: true}).then((response) => {
                console.log('fanhui' + response);
                let success = response.body.code;
                if (success === 1) {
                  this.msg = response.body.message;
                }
//                console.log(response.body.code);
              }, (response) => {
                console.log('error');
              }
            );
          } else {
            console.log('error submit');
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview (file) {
        this.upload(file);
        this.dialogImageUrl = file.url;
        console.log('上传' + this.dialogImageUrl);
//        this.dialogVisible = true;
      },
      loadfile: function (file) {
        console.log('file:' + file.response);
      },
      onsucess: function (response, file) {
        console.log('response:' + response);
        this.imageURL = response;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.addform
  width 400px
  .selectwrap
    width 120px
</style>

