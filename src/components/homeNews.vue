<template>
  <div class="homeNews">
      <!-- 1:文字，2：红包，3：文章 ,css:类型 -->
      <div class="right" v-if="data.messageType =='TextMessage'&&data.messageDirection=='1'">
         <div class="right-head"><img class="right-head-img" :src="rightHeadImageUrl"></div>
         <div class="right-con">
           <div class="rightUserName">{{rightUserName}}</div>
           <div class="content">{{data.content.content}}</div>
           <div class="time">{{time}}</div>
         </div>
      </div>
      <div class="left" v-if="data.messageType =='TextMessage'&&data.messageDirection!='1'">
         <div class="left-head"><img class="left-head-img" :src=getUserInfo(data.senderUserId).HeadPortrait></div>
         <div class="left-con">
           <div class="leftUserName">{{getUserInfo(data.senderUserId).NickName}}</div>
           <div class="content">{{data.content.content}}</div>
           <div class="time">{{time}}</div>
         </div>        
      </div>

  </div>
</template>

<script>
// import Vue from "vue";
export default {
  name: "homeNews",
  props:['data'],
  data() {
    return {
      time:'',
        rightUserName:JSON.parse(localStorage.getItem('userInfo')).Nickname,
        rightHeadImageUrl:decodeURIComponent(JSON.parse(localStorage.getItem('userInfo')).HeadPortrait),
        // leftHeadImageUrl:require('../assets/images/person2.png'),
        // leftUserName:'用户名2'
    };
  },
  created() {
    this.time=this.getLocalTime(this.data.sentTime)
  },
  methods: {
    getLocalTime(nS) {     
      return new Date(parseInt(nS) ).toLocaleString().replace(/:\d{1,2}$/,' ');     
    },
    getUserInfo(d){
        let userInfo=this.$parent.getUserInfo(d)
        return userInfo
    }
  }
};
</script>
<style scoped>
.homeNews{
  width: 100%;
}
.right{
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  padding: 15px;
  box-sizing: border-box;
}
.right-head{
  width: 80px;
  height: 80px;
}
.right-head-img{
    width: 100%;
    height: 100%;
    border-radius:50%;
}
.right-con{
  max-width:600px;
  display: flex;
  flex-direction: column;
  /*align-items: right;*/
  margin-right:15px;
  margin-left:15px;
  word-break: break-all;
}
.rightUserName{
  width: 100%;
  text-align: right;; 
  margin-bottom:5px; 
}
.leftUserName{
  text-align: left;
  margin-bottom:5px;   
}
.content{
  display: inline-block;
  padding: 10px;
  border-radius:5px;
  background:  rgb(3, 156, 3);
  color: white;
}
.time{
  color: #999;
  font-size: 12px;
}
.left{
  width: 100%;
  display: flex;
    flex-direction: row;
  padding: 15px;
  box-sizing: border-box;  
}
.left-head{
    width: 80px;
    height: 80px;
}
.left-head-img{
    width: 100%;
    height: 100%;
    border-radius:50%;
}
.left-con{
    max-width:600px;
    display: flex;
    flex-direction: column;
    /*align-items: left;*/
    margin-right:15px;
    margin-left:15px;
    word-break: break-all;
}
</style>

