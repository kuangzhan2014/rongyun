<template>
  <div id="app">
    <Init ref="mainPart"/>
  </div>
</template>

<script>
import Init from './components/Init.vue'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
export default {
  name: 'app',
  components: {
    Init
  },
created () { //生命周期函数-可发起求
    let that = this
    //融云初始化8w7jv4qb78a9y
    //自己的pvxdm17jpe59r
    RongIMLib.RongIMClient.init('pvxdm17jpe59r',); //------------------------------重要填写appkey
    that.beforeIm() //设置监听，必须先设置监听，再连接
    that.nowIm()  //连接融云
  },
  methods: {
    ...mapMutations({ //读取最新消息列表，并设置----------------------------重要
      getAnswer:'getAnswer'
    }),    
    beforeIm(){
      let that = this
      // 连接状态监听器
      RongIMClient.setConnectionStatusListener({
          onChanged: function (status) {
              // status 标识当前连接状态
              switch (status) {
                  case RongIMLib.ConnectionStatus.CONNECTED:
                      console.log('链接成功');
                      break;
                  case RongIMLib.ConnectionStatus.CONNECTING:
                      console.log('正在链接');
                      break;
                  case RongIMLib.ConnectionStatus.DISCONNECTED:
                      console.log('断开连接');
                      break;
                  case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                      console.log('其他设备登录');
                      break;
                  case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                      console.log('域名不正确');
                      break;
                  case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                      console.log('网络不可用');
                      break;
              }
          }
      });

      // 消息监听器
      RongIMClient.setOnReceiveMessageListener({
          // 接收到的消息
          onReceived: function (message) {
              // 判断消息类型
              console.log('接受到的全部消息',message)
              switch(message.messageType){
                  case RongIMClient.MessageType.TextMessage:
                      // message.content.content => 文字内容
                      //----------------------------重要-------把获取的消息存放在store中，全局公用homeIm.vue要使用
                      console.log('接受到的文字消息',message,message.content.content)
                      that.$refs.mainPart.gotMsg(message) //全部消息放到组件中处理
                    //   that.getAnswer(message)
                      break;
                  case RongIMClient.MessageType.VoiceMessage:
                      // message.content.content => 格式为 AMR 的音频 base64
                      break;
                  case RongIMClient.MessageType.ImageMessage:
                      // message.content.content => 图片缩略图 base64
                      // message.content.imageUri => 原图 URL
                      break;
                  case RongIMClient.MessageType.LocationMessage:
                      // message.content.latiude => 纬度
                      // message.content.longitude => 经度
                      // message.content.content => 位置图片 base64
                      break;
                  case RongIMClient.MessageType.RichContentMessage:
                      // message.content.content => 文本消息内容
                      // message.content.imageUri => 图片 base64
                      // message.content.url => 原图 URL
                      break;
                  case RongIMClient.MessageType.InformationNotificationMessage:
                      // do something
                      break;
                  case RongIMClient.MessageType.ContactNotificationMessage:
                      // do something
                      break;
                  case RongIMClient.MessageType.ProfileNotificationMessage:
                      // do something
                      break;
                  case RongIMClient.MessageType.CommandNotificationMessage:
                      // do something
                      break;
                  case RongIMClient.MessageType.CommandMessage:
                      // do something
                      break;
                  case RongIMClient.MessageType.UnknownMessage:
                      // do something
                      break;
                  default:
                      // do something
              }
          }
      });
    },
    nowIm(){
        const self=this;
    //自己的token------从接口获取，写到缓存
<<<<<<< HEAD
     var chooseUser='';
     var chooseUserToken='';
     var user1=20000001;
     var user2=2;
     var user1Token='lFLCTdymLem/eleH16XcVGqWa1TUI8otXuWvIK0HUgo=@zeph.cn.rongnav.com;zeph.cn.rongcfg.com';
     var user2Token='FDZatHEEaGj/TGampTkAyAZpwg7GPoPL@zeph.cn.rongnav.com;zeph.cn.rongcfg.com';
     var a=confirm('确认是user1，取消是user2')
     if(a){
         chooseUser=user1;
         chooseUserToken=user1Token;
         localStorage.setItem("targetId",user2);
     }else{
         chooseUser=user2;
         chooseUserToken=user2Token
         localStorage.setItem("targetId",user1);
     }
=======
      let userId = 2
      let url = '/api/IM/getUserInfo/'+userId;
      axios.get(url).then(function (response) {
        console.log("获取用户信息成功");
        console.log(response);
        if(response.status === 200){
          //获得成功响应返回的数据
          let userInfo=response.data.ReturnData[0];
          // console.log(userInfo.ry_token);
          //将用户信息转化为字符串写入缓存
          localStorage.setItem('userInfo',JSON.stringify(userInfo));
          // console.log(JSON.parse(localStorage.getItem('userInfo')).ry_token);
        }
      }).catch(function (error) {
            console.log(error);
      });
>>>>>>> f1b151ef6e480dac4511b2ae8b9474b4686998ef
      // var token = JSON.parse(localStorage.getItem('userInfo')).IMUser.token//"WzrthC5f4UfuiI7dIwCQ5fwtGfqCdobpowIZkcQnj8PQOQuAJb/nIi1ayzGFwJguvbQZxbJH3x0=";
      //lFLCTdymLem/eleH16XcVGqWa1TUI8otXuWvIK0HUgo=@zeph.cn.rongnav.com;zeph.cn.rongcfg.com
      RongIMClient.connect(chooseUserToken, {
          onSuccess: function(userId) {
              console.log('Connect successfully. ' + userId);
              self.$store.state.isConnect=true;
              console.log('state中的状态',self.$store.state)
          },
          onTokenIncorrect: function() {
              console.log('token 无效');
          },
          onError: function(errorCode){
              var info = '';
              switch (errorCode) {
                  case RongIMLib.ErrorCode.TIMEOUT:
                      info = '超时';
                      break;
                  case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
                      info = '不可接受的协议版本';
                      break;
                  case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
                      info = 'appkey不正确';
                      break;
                  case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
                      info = '服务器不可用';
                      break;
              }
              console.log(info);
          }
      });
    }
  },
}
</script>

<style>
*{
  margin: 0;
  padding: 0;  
}

</style>
