<template>
  <div class="articleListPage">
    文章列表
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      >
      <el-table-column
        fixed
        prop="id"
        label="id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="articleTitle"
        label="文章标题"
        width="220">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="100">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="200"
        :formatter="formatDate">
      </el-table-column>
      <el-table-column
        label="修改时间"
        width="200"
      :formatter="formatDate">
      </el-table-column>
      <el-table-column
        prop="readingQuantity"
        label="阅读量"
        width="120">
      </el-table-column>
      <el-table-column
        prop="likeQuantity"
        label="点赞量"
      width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next, jumper"
        :total="totalElements"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      >
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="currentPage"-->
      </el-pagination>
    </div>
    <div><span>{{totalElements}}</span></div>
  </div>
</template>

<script>
  import {formatDate} from '../components/date';
export default {
  data () {
    return {
      message: 444,
      totalElements: 10,
      currentPage: 0,
      size: 10,
      tableData: [{
        id: '',
        articleTitle: '王小虎',
        author: '上海',
        createTime: '',
        readingQuantity: '上海市',
        likeQuantity: 0
      }]
    };
  },
  created () {
//    this.$http.get('http://127.0.0.1:8082/getarticles', {
//      params: {
//        size: 10,
//        page: 0
//      }
//    }).then((response) => {
//      console.log('this.page:' + this.page);
//      console.log('this.size:' + this.size);
//        console.log(response.body.data);
//        this.tableData = response.body.data.content;
//        console.log('totalpage:' + response.body.data.totalPages);
//        this.totalElements = response.body.data.totalElements;
//        this.currentPage = response.body.data.number;
//        console.log('currentPage:' + this.currentPage);
//        }, (response) => {
//        console.log('error');
//      }
//    );
    this.loadData();
  },
  methods: {
    handleClick (row) {
//      console.log(row.id);
      this.$router.push({
        path: '/articleDetailPage',
        name: 'articledetailpage',
        query: {
          id: row.id
        }
      });
    },
    handleCurrentChange: function (currentPage) {
      console.log(currentPage);
      this.currentPage = currentPage;
      console.log('this.currentPage:' + this.currentPage);
      this.loadData(currentPage, this.size);
      console.log('this.size:' + this.size);
    },
    loadData: function (pageNum, size) {
      this.$http.get('http://127.0.0.1:8083/getarticles', {
        params: {
          page: pageNum,
          size: size
        }
      }).then((response) => {
        console.log(response.body.data);
        this.tableData = response.body.data.content;
//        this.page = pageNum - 1;
//        pageNum = response.body.data.content.number;
        this.totalElements = response.body.data.totalElements;
        console.log('page:' + pageNum + 'size' + size);
      }, (response) => {
        console.log('error');
      }
      );
    },
    formatDate (res) {
//      let date = Date(row.createTime);
      let date = new Date(res.createTime);
//      console.log(row.createTime);
//      console.log(11);
      // todo 此处有bug
//      console.log(cellvalue);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.block
  position: fixed
  right 0px
  bottom: 0px
</style>

