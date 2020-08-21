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
      <div class="right" v-if="data.messageType =='RichContentMessage'&&data.messageDirection=='1'">
          <div class="right-head"><img class="right-head-img" :src="rightHeadImageUrl"></div>
          <div class="right-con">
              <div class="rightUserName">{{rightUserName}}</div>
<!--              <div class="content">{{data.content.content}}</div>-->
              <img :src=getThumbnail(data.content.imageUri) class="img" @click="getEnlargedView(data.content)">
              <div class="time">{{time}}</div>
          </div>
      </div>
      <div class="right" v-if="data.messageType =='ImageMessage'&&data.messageDirection=='1'">
          <div class="right-head"><img class="right-head-img" :src="rightHeadImageUrl"></div>
          <div class="right-con">
              <div class="rightUserName">{{rightUserName}}</div>
              <img :src=getThumbnail(data.content.imageUri) class="img1" @click="getEnlargedView(data.content)">
              <div class="time">{{time}}</div>
          </div>
      </div>

      <div class="left" v-if="data.messageType =='TextMessage'&&data.messageDirection=='2'">
         <div class="left-head"><img class="left-head-img" :src=getUserInfo(data.senderUserId).HeadPortrait></div>
         <div class="left-con">
           <div class="leftUserName">{{getUserInfo(data.senderUserId).NickName}}</div>
           <div class="content">{{data.content.content}}</div>
           <div class="time">{{time}}</div>
         </div>        
      </div>
      <div class="left" v-if="data.messageType =='RichContentMessage'&&data.messageDirection=='2'">
          <div class="left-head"><img class="left-head-img" :src=getUserInfo(data.senderUserId).HeadPortrait></div>
          <div class="left-con">
              <div class="leftUserName">{{getUserInfo(data.senderUserId).NickName}}</div>
<!--              <div class="content">{{data.content.content}}</div>-->
              <img :src=getThumbnail(data.content.imageUri) class="img" @click="getEnlargedView(data.content)">
              <div class="time">{{time}}</div>
          </div>
      </div>
      <div class="left" v-if="data.messageType =='ImageMessage'&&data.messageDirection=='2'">
          <div class="left-head"><img class="left-head-img" :src=getUserInfo(data.senderUserId).HeadPortrait></div>
          <div class="left-con">
              <div class="leftUserName">{{getUserInfo(data.senderUserId).NickName}}</div>
              <img :src=getThumbnail(data.content) class="img1" @click="getEnlargedView(data.content)" >
              <div class="time">{{time}}</div>
          </div>
      </div>
      <div class="left" v-if="data.messageType =='HQVoiceMessage'&&data.messageDirection=='2'">
          <div class="left-head"><img class="left-head-img" :src=getUserInfo(data.senderUserId).HeadPortrait></div>
          <div class="left-con">
              <div class="leftUserName">{{getUserInfo(data.senderUserId).NickName}}</div>
              <div class="voice">
                  <img :src=vioceImg class="voiceImg" @click="getVoice(data.content)" ><span> {{data.content.duration}}</span>
              </div>
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
        vioceImg:require('../assets/images/voice.png')
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
    },
    getThumbnail(d){
        if(this.data.messageType=='ImageMessage'){
            // console.log(d.content)
           let src='data:image/jpg;base64,'+d.content
            // console.log('src='+src)
            return  src
        }else{
            return d.imageUri
        }
     },
     getEnlargedView(d){

     },
     getVoice(){}
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
.img{
    width: 100%;
    height: 100%;
}
.img1{
    max-width: 300px;
    max-height: 300px;
}
.voice{
    background-color: #0FAF17;
    color: white;
}
.voiceImg{
    width: 30px;
    height: 30px;
}
</style>

