<template>
  <div class="articleDetailPage">
    <h1>{{articleTitle}}</h1>
    <div><h3>作者：{{author}}， </h3><h3>创建时间：{{ createTime | formatDate }}    </h3><h3>修改时间：{{updateTime}}</h3></div>
    <div><p>我是图片：{{imgUrl}}</p></div>
    <br>
    <p>{{article}}</p>
    <p id="goback"><router-link to="/articleListPage">返回</router-link></p>
  </div>
</template>

<script>
  import {formatDate} from '../components/date';
export default {
  data () {
    return {
     articleTitle: '文章标题',
      author: '作者',
      createTime: 'new date',
      updateTime: 'update time',
      imgUrl: '',
      article: 'ateTime":1512223806000,"updateTime":15133ity":0,"articles":"我是文章内哦难过，我很类似的风景啊落脚点放辣椒苏打绿浓浓的咖啡脚后跟开发阿萨德就放辣椒收到了风景啊的法拉的发生率低筋粉拉屎都发啦水淀粉啊的发售分'
    };
  },
  created () {
    console.log(this.$route.query.id);
    this.$http.get('http://127.0.0.1:8083/getarticle/{id}', {
      params: {
        id: this.$route.query.id
      }
    }).then((response) => {
      console.log(response.body.data);
      console.log(this.$route.query.id);
      this.articleTitle = response.body.data.articleTitle;
      this.author = response.body.data.author;
      this.createTime = response.body.data.createTime;
      this.updateTime = response.body.data.updateTime;
      this.imgUrl = response.body.data.imgUrl;
      this.article = response.body.data.articles;
    }, (response) => {
      console.log('error');
    });
//    this.$http.get('http://127.0.0.1:8082/getarticles', {
//      param: {
//        id: this.id
//      }
//    }).then((response) => {
//        console.log(response.body.data[0].id);
//        this.tableData = response.body.data;
//      }, (response) => {
//        console.log('error');
//      }
//    );
  },
  filters: {
    formatDate: function (time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
h1
  font-size: 25px
h3
  display: inline;
#goback
  text-align: center;
</style>

