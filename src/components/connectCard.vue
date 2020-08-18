<template>
  <div class="coc" @click="openChat()">
    <div class="coc-b1">
      <img :src=getImg(detail.HeadPortrait)  class ="coc-PrivateChat" v-if="detail.conversationType===1">
      <img :src=groupImg  class ="coc-GroupChat" v-else-if="detail.conversationType===3">
      <img :src=systemImg  class ="coc-SystemChat" v-else-if="detail.conversationType===6">
      <div class="coc-tnum" v-if="detail.unreadMessageCount*1>0">{{detail.unreadMessageCount}}</div>
    </div>
    <div class="coc-b2">
      <div class="coc-b21">
        <span class="coc-b21-1">{{detail.ConversationName}}</span>
        <span class="coc-b21-2">{{sendTime}}</span>
      </div>
      <div class="coc-b22">
        {{`${getUserInfo(detail.latestMessage.senderUserId)}说`}}：{{detail.latestMessage.content.content}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      sendTime:'',
      groupImg:require('../assets/images/groupImg.png'),
      systemImg:require('../assets/images/systemImg.png'),
      defaultImg:require('../assets/images/person2.png')
    }
  },
  props:{
    detail:Object
  },
  created(){
    this.sendTime=this.getLocalTime(this.detail.sentTime)
  },
  methods:{
    getLocalTime(nS) {     
      return new Date(parseInt(nS) ).toLocaleString().replace(/:\d{1,2}$/,' ');     
    },
    openChat(){
      this.$emit('openChat',this.detail)
    },
    getImg(d){
      if(d===undefined || d === null  || d===''){
        return d= this.defaultImg
      }else{
        return  d
      }
    },
    getConversationName(d){
      if(d===undefined || d === null  || d===''){
        if(this.detail.conversationType===1){
          return d='修理厂私聊'
        }else if(this.detail.conversationType===3) {
          return d='修理厂群聊'
        }else if(this.detail.conversationType===6){
          return d='系统消息'
        }
      }else{
        return d
      }
    },
    getSenderUserName(d){
      if(d===undefined || d === null  || d===''){
        return d='id为'+this.detail.latestMessage.senderUserId+'的人'
      }else{
       return d
      }
    },
    getUserInfo(id){
      // console.log(this.detail.latestMessage.senderUserId)
      let userInfo=this.$parent.getUserInfo(id)
      return userInfo.NickName
      // return  this._self.$parent.getUserInfo(id).ConversationName
      // this.$emit('getUserInfo',id);
    }
  },
}
</script>
<style scoped>
.coc{
  width: 100%;
  height: 100px;
  background: white;
  border: 1px solid #eee;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.coc-b1{
  width: 80px;
  height: 80px;
  border-radius:50%;
  background: lavender;
  margin-right:15px;  
  position: relative;
}
.coc-PrivateChat{
  width:80px;
  height:80px;
  border-radius:50%;
  margin-right:15px;
  position: relative;
}
.coc-GroupChat{
  width:80px;
  height:80px;
  margin-right:15px;
  position: relative;
}
.coc-GroupChat{
  width:80px;
  height:80px;
  margin-right:15px;
  position: relative;
}
.coc-tnum{
  position: absolute;
  width: 20px;
  height: 20px;
  background: red;
  border-radius:50%;
  color: white;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  position: absolute;
  right: 0px;
  top: 0px; 
}
.coc-b2{
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.coc-b21{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.coc-b21-1{
  font-size: 15px;
  color: #333;
}
.coc-b21-2{
  font-size: 15px;
  color: #999;
}
.coc-b22{
  width: 100%;
  margin-top:10px; 
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;  /*要显示的行数*/
  -webkit-box-orient: vertical;
  word-break: break-all;
}
</style>


