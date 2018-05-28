<template>
  <div class="equipmentListPage">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="装备名称">
      </el-table-column>
      <el-table-column
        prop="price"
        label="装备价格">
      </el-table-column>
      <el-table-column
        prop="base"
        label="装备基础属性">
      </el-table-column>
      <el-table-column
        prop="only"
        label="装备唯一属性">
      </el-table-column>
      <el-table-column
        prop="url"
        label="装备图片">
      </el-table-column>
      <el-table-column
        prop="type"
        label="装备类型">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [{
          id: '',
          equipName: '',
          price: '',
          base: '',
          only: '',
          url: '',
          type: ''
        }]
      };
    },
    created () {
      this.$http.get('http://127.0.0.1:8083/equipment/getequips', {
        param: {}
      }).then((response) => {
        console.log(response.body.data);
//          console.log(response.body.data.content);
        }, (response) => {
          console.log('error');
        }
      );
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">

</style>

