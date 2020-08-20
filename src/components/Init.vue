<template>
  <div class="con" >
    <div class="con-head">
      <img class="con-head-m" src="../assets/login_icon_logo.png" alt="">
      <span class="con-head-t">v1.0.0  <img src="" alt=""></span>
    </div>
    <div class="con-box">
      <div class="con-nav">
        <div class="con-nav-head"><img class="con-head-img" :src="headImageUrl" ></div>
      </div>
      <div class="chatList">
        <div class="search">
          <input class="search-1" type="text" placeholder="请输入搜索内容并按回车键结束" @keyup.enter="getSearchChat()" ref="searchContent">
        </div>
        <connectCard  ref="tem" v-on:openChat="openChat" v-for="(detail,index) in chatList"   :key="index" :detail="detail"></connectCard>
      </div>
      <div class="chatRoom" >
        <img class="background-img" :src="backgroundImg" v-show="showBackgroundImg" >
        <div class="chatRoom"  v-show="showChat" >
            <div class="chatHeader">{{conversationName}}</div>
            <div class="chatContent" id='homeIm' @scroll="scrollEvent" ref='chatBox'>
              <div class="loadHistory">
                <span class="loadHistory-t" @click="loadHis()">{{haveHis?'加载历史记录':'没有历史记录了'}}</span>
              </div>
             <homeNews ref="homeNews" v-for="(item ,index) in answer" :key='index' :item='item' :data='item'></homeNews>
            </div>
            <div class="inpOp">
       <div class="inpTool">
             <!-- 点击上传文件 -->
             <label for="fileInput">
               <span class="images" ><img style="width:28px; height:28px"  :src="flag?one:two"  @mouseover="flag=!flag"  @mouseout="flag=!flag" alt=""></span> 
             </label>
             <input v-show="false" type="file" id="fileInput" style=" opacity: 0;">
              <span  v-if="messageType!==1" class="images"  id="bgimg" ><img  style="display:block"  v-show="isShow"  class="imag" :src="fleg?ones:twos"  @click="price"   alt=""></span>
           </div>
          <textarea  v-show="isShew" id="textarea" v-on:keyup.enter="send"  ref="msg" style="resize:none;"  class="inpEnter" v-model="say" placeholder="请输入内容..."  ></textarea>
             <div  v-on:keyup.enter="sendMs"  @blur="side"  v-html="meg" @click="huoqu" v-show="isShcw" id ="sss" placeholder="请输入内容"  class="inpEnter" ref="msg" contenteditable="true"  @input="inputDiv($event)" 
             style="resize:none ;overflow-y:auto;overflow-x:auto;width:100%;height:100%"
             ></div>
          <button class="sendBtn" v-show="btn"  @click="sendMs" :disabled ='say?false:true'>发送</button>
          <button class="sendBtn" v-show="bbtn" @click="send" :disabled ='say?false:true'>发送</button>
           </div>
         </div>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from "vue"
import axios from "axios"
import qs from 'qs';
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import homeNews from './homeNews'
import connectCard from './connectCard'
import b1 from '../assets/images/B1.png'
import b2 from '../assets/images/B2.png'
import imga from '../assets/picture_chose.png'
import imgb from '../assets/picture_unchose.png'
// const arr = [ Field ,Button];
// arr.map(e => {
//   //动态生成组件
//   Vue.use(e);
// });

export default {
  data() {
    return { 
      meg:'',
      messageType:'',
      bbtn:true,
      btn:false,
      isShow:true,
      isShew:true,
      isShcw:false,
      topimgs:imga,
      isDisable: false,
      flag:true,
      fleg:true,
      one:require('../assets/picture_unchose.png'),   
      two:require('../assets/picture_chose.png'),
      ones:require('../assets/images/B1.png'),   
      twos:require('../assets/images/B3.png'),
      backgroundImg:require('../assets/images/background.jpg'),
      showBackgroundImg:true,
      showChat:false,
      chatList:[],//会话列表
      say:'',
      nowChat:null,//当前对话框对象
      targetMan:10,//目前会话框的对象
      hisObj:[],//历史记录大对象
      haveHis:true,//该会话是否还有历史记录
      privateChatList:[],//存放私聊类型的融云返回会话记录
      groupChatList:[],//存放群聊类型的融云返回会话记录
      allChatList:[],//存放所有类型的融云返回会话记录
      userInfoMap:[],//本地缓存存放所有用户信息
      headImageUrl:decodeURIComponent(JSON.parse(localStorage.getItem('userInfo')).HeadPortrait),
      // headImageUrl:require('../assets/images/person1.png'),
      searchContent:'',
      userId:JSON.parse(localStorage.getItem('userInfo')).UserId,
      nowTime: new Date(),
      conversationName:'',
      Himg:'',
    };
  },
  name: "homeIm",
  props: {
    msg: String
  },
  components:{
    homeNews,
    connectCard
  },
  created() {

    // this.EditURL()
    console.log('组件初始化中是否链接上了',this.$store.state.isConnect)
    if(this.$store.state.isConnect){
      this.getChat()
    }
    setTimeout(()=>{
      console.log('一秒之后组件初始化中是否链接上了',this.$store.state.isConnect)
    },1000)
    this.$nextTick(() => {//------------------------重要-------有消息就滚动到底部-----------------------
        let list = document.getElementById('homeIm')
        document.documentElement.scrollTop = list.scrollHeight
        //如不行，请尝试->  list.scrollTop = list.scrollHeight
      })
  },
  mounted(){
        // this.huoqu()
        // this.$refs.msg.value=''
        // if(this.fleg=false){
        //   this.send()
        // }
  },
  computed:{
    ...mapState({
      answer:"answer",
    }),
    ...mapGetters([
        'isConnect'
    ]),    
    getIsConnect() {
      return this.$store.state.isConnect;
    }
  },
  watch: { //------------------------重要-------有消息就滚动到底部-----------------------
    answer() {
      this.$nextTick(() => {
        let list = document.getElementById('homeIm')
        list.scrollTop = list.scrollHeight
        //如不行，请尝试->  list.scrollTop = list.scrollHeight
      })
    },
    isConnect(newVal){
      console.log('组件中监听链接是否成功',newVal)
      if(newVal){  //全局监听融云连接成功
        this.getChat()//获取会话列表，要钱
        // this.getChatRecord() //获取指定会话聊天记录，要钱
      }
    },
    //  say(newvalue) {
    //    this.po_Last_Div(this.$refs.msg);
      // console.log(newvalue);
      // // if (!this.isLocked && !this.innerText) {
      // if (!newvalue) {
      //   // 清空节点内所有html来清空文本
      //   this.$refs.msg.innerHTML = '';
      // } else {
      //   this.keepLastIndex(this.$refs.msg);
      // }
    // } ,
  },
  methods: {
    huoqu(e){
       
      // console.log(e.target.innerHTML)
    },
     inputDiv:function(e){
      let reg = new RegExp('<div><br></div>','g')
      this.say =  e.target.innerHTML.toString().replace(/&nbsp;/g, ' ').replace(/<div>/g,'').replace(/<\/div>/g,'').replace(/<br>/g,'\n');;
      // console.log('Text: %o', this.say.split('"')[1].split(',')[1])
      // this.Himg = this.say.split('"')[1].split(',')[1]
      // if(this.Himg){
      //     this.say.split('"')[1].split(',')[1]
      //      console.log(this.Himg)
      // }
      // console.log( typeof(this.Himg))
     
      // console.log('Text: %o', this.say)
    },
   
    price(){    // 报价
      this.fleg=!this.fleg
      this.isShew=!this.isShew
      this.isShcw=!this.isShcw
      this.btn=!this.btn
      this.bbtn=!this.bbtn
      // console.log(this.targetMan) //发送者的id
      // console.log(this.messageType)
      // console.log(this.$refs.chatBox)
      // console.log(this.$refs.tem)
      // console.log(this.$refs.tem[0].sendTime)
    },
    side(){
      this.isShcw=!this.isShcw
      this.fleg=!this.fleg
      this.isShew=!this.isShew
    },
    back(){
      if(this.topimgs=imga){
        this.topimgs=imgb
      }else{
        this.topimgs=imga;
      }
      
      //  this.topimgs=imga;
    },
    openChat(d){ //点击了会话列表，获取对应会话的历史记录
      const self=this;
      console.log('当前会话对象',d)
      self.conversationName=d.ConversationName
      //点开任意一个会话就隐藏初始化图片显示chatRoom
      self.showBackgroundImg=false;
      self.showChat=true;
      if(d.targetId==self.targetMan){
        return false;//重复点击不会加载聊天记录
      }
      self.hisObj.forEach((v,i,a)=>{ //把对应的历史记录塞到对应对象中
        if(v.targetId==d.targetId){
            // v.history=v.history.concat(list)
            if(!v.history[0]){//不存在记录，是初次打开,正常执行
               self.getchatHistory(d);    
            }else{
              self.getchatHistory(d,1);//只切换对话，不加载历史记录
            }
        }
      })      
      // if(d.targetId!=self.targetMan){
      //   this.getchatHistory(d);//开始获取该对话的历史记录
      // }
    },
    toBottom(){ //聊天框滚动到底
      this.$nextTick(() => {
        let list = document.getElementById('homeIm')
        list.scrollTop = list.scrollHeight
        //如不行，请尝试->  list.scrollTop = list.scrollHeight
      })          
    },
    gotMsg(d){  //收到消息啦！！！！
      this.answer.push(d);
      this.toBottom();
    },
    //转码base64
    // base64ImgtoFile(dataurl, filename = 'file') {
    //   let arr = dataurl.split(',')
    //   let mime = arr[0].match(/:(.*?);/)[1]
    //   let suffix = mime.split('/')[1]
    //   let bstr = atob(arr[1])
    //   let n = bstr.length
    //   let u8arr = new Uint8Array(n)
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n)
    //   }
    //   return new File([u8arr], `${filename}.${suffix}`, {
    //     type: mime
    //   })
    // },
    //  div  发送
    sendMs(){
      if(this.say!==''){
        var ss = (this.say||"").split('<img src="data:image/png;base64,')
        var ss2=(ss[1]||"").split('" alt="">')
        var zd = "imgs*";
        var zd2 = "imgend*";
        // this.say = ss[0]+zd+ss2[0]+zd2+ss2[1]
        if(ss2[0]==''){
          this.say=ss[0]
        }
        var arr= [];
        this.say = txt1 + txt2 
        let that = this
        let msg = new RongIMLib.TextMessage({ content: that.say, extra:'' });
        let conversationType = RongIMLib.ConversationType.PRIVATE; // 单聊, 其他会话选择相应的消息类型即可
        let targetId = that.targetMan
      // let targetId = JSON.parse(localStorage.getItem('userInfo')).IMUser.assistantId; // 目标 Id
        let groupId = targetId
        let shopID= 1 
        let bidType =0
        // let createTime=that.nowTime
        let ct = that.nowTime;
        //  时间标准格式
        // let createTime = ct.getFullYear()+'-'+(ct.getMonth()+1)+'-'+ct.getDate()+'T'+ct.getHours()+':'+ct.getMinutes()+':'+ct.getSeconds()
        // 当前时间的时间戳
        let createTime = new  Date().getTime()
        let Content =""
        let nickName=JSON.parse(localStorage.getItem('userInfo')).Nickname
        let url = 'http://192.168.4.190:7777/api/WebIm/QuotedPrice/'
        let params = { GroupID: groupId,Shop_ID: shopID ,User_ID: that.userId,BidType: bidType,Content: Content,NickName: nickName,CreatTimeStamp: createTime }
        console.log(Content)
             for (let index = 0; index < ss.length; index++) {
            // console.log(ss[index])
            if ((ss[index].indexOf('" alt="">')) == -1) {
              // 输出结果 
              var txt1 = ss[index]
              txt1.replace("\n","")
              if (txt1!="") {
               params.CreatTimeStamp+=1
               params.BidType = 0;
               params.Content = txt1;
               axios.post(url,qs.stringify(params),{
                    headers:{
                      'Content-Type': 'application/x-www-form-urlencoded',
                    }
               }).then(function(response){
                 var data = response.data;
                  console.log(data)
                 console.log(" 文字>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
               }).catch(function(error){
                 console.log(error)
               })
              }
              // arr.push(ss[index])
            }else{
              var img2 = ss[index].split('" alt="">')[0]
              var txt2 = ss[index].split('" alt="">')[1]
              if (img2!="") {
               params.CreatTimeStamp+=1
               params.BidType = 1;
               params.Content = img2;
                       axios.post(url,qs.stringify(params),{
                    headers:{
                      'Content-Type': 'application/x-www-form-urlencoded',
                    }
               }).then(function(response){
                 var data = response.data;
                 img2 = JSON.parse(data).ReturnData.ImageAirUrl
                  console.log(img2)
                 console.log(" 图片>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
               }).catch(function(error){
                 console.log(error)
               })
              }
              let re = /(\n(?=(\n+)))+/g
              txt2= txt2.replace("\n","")
              if (txt2!="") {
              params.CreatTimeStamp+=1
              params.BidType = 0;
              params.Content = txt2;
              axios.post(url,qs.stringify(params),{
                    headers:{
                      'Content-Type': 'application/x-www-form-urlencoded',
                    }
               }).then(function(response){
                 var data = response.data;
                 console.log(data)
                  console.log("文字 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
               }).catch(function(error){
                 console.log(error)
               })
              }
            }
        }
        arr.forEach((c,m)=>{

        });
            RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
                onSuccess: function (message) {
                    // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
                    console.log('Send successfully',message,message.content.content);
                    that.answer.push(message,message.content.content)
                    that.say = ''
                    that.toBottom();
                },
          onError: function (errorCode, message) {
              let info = '';
              switch (errorCode) {
                  case RongIMLib.ErrorCode.TIMEOUT:
                      info = '超时';
                      break;
                  case RongIMLib.ErrorCode.UNKNOWN:
                      info = '未知错误';
                      break;
                  case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                      info = '在黑名单中，无法向对方发送消息';
                      break;
                  case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                      info = '不在讨论组中';
                      break;
                  case RongIMLib.ErrorCode.NOT_IN_GROUP:
                      info = '不在群组中';
                      break;
                  case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                      info = '不在聊天室中';
                      break;
              }
              console.log('发送失败: ' + info + errorCode);
          }
      });
       this.$refs.msg.innerHTML=''
      if(this.say!==''){
      console.log(this.say)
      if(!this.send){
        return false;
      }
      }
     }
    },
    // dingshi(){
    //          setTimeout(() => {
    //             this.isDisable = true;
    //     }, 1000 * 5);
    // },
    //  textarea 发送
    send() {
      console.log(123)
     if(this.say!==''){
      let that = this
      let msg = new RongIMLib.TextMessage({ content: that.say, extra:'' });
      let conversationType = RongIMLib.ConversationType.PRIVATE; // 单聊, 其他会话选择相应的消息类型即可
      let targetId = that.targetMan
      // let targetId = JSON.parse(localStorage.getItem('userInfo')).IMUser.assistantId; // 目标 Id
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
          onSuccess: function (message) {
              // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
              console.log('Send successfully',message,message.content.content);
              that.answer.push(message,message.content.content)
              that.say = ''
              that.toBottom();
              
          },
          onError: function (errorCode, message) {
              let info = '';
              switch (errorCode) {
                  case RongIMLib.ErrorCode.TIMEOUT:
                      info = '超时';
                      break;
                  case RongIMLib.ErrorCode.UNKNOWN:
                      info = '未知错误';
                      break;
                  case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                      info = '在黑名单中，无法向对方发送消息';
                      break;
                  case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                      info = '不在讨论组中';
                      break;
                  case RongIMLib.ErrorCode.NOT_IN_GROUP:
                      info = '不在群组中';
                      break;
                  case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                      info = '不在聊天室中';
                      break;
              }
              console.log('发送失败: ' + info + errorCode);
          }
      });
       this.$refs.msg.innerHTML=''
      if(this.say!==''){
      console.log(this.say)
      if(!this.send){
        return false;
      }
      }
     }
     console.log(this.say)
    },
    getChat(){ //获取会话列表
      let self=this;
      let conversationType = [RongIMLib.ConversationType.PRIVATE,RongIMLib.ConversationType.GROUP,RongIMLib.ConversationType.SYSTEM]; //先传单聊再传群聊,null值传所有
      let count=150;
      RongIMClient.getInstance().getConversationList({
          onSuccess: function(list) {
              // list => 会话列表集合
              console.log('会话列表集合',list)
              self.chatList=list
              self.chatList.forEach((v,i,a)=>{
                //融云返回的会话列表缺少会话名称、头像、最新消息发送者名字
                Vue.set(v,'ConversationName',null)
                Vue.set(v,'HeadPortrait',null)
                Vue.set(v,'SenderUserName',null)
                let ddd={targetId:'',
                         history:[],
                         conversationType:'',
                         senderUserId:''}
                v.latestMessage.senderUserId=v.latestMessage.senderUserId.replace(/[^0-9]/ig,"")//数据库中userId是纯数字
                ddd.senderUserId=v.latestMessage.senderUserId
                //融云返回的会话targetId,如果是私聊，其值为userId,如果是群聊，其值是groupId
                ddd.conversationType=v.conversationType
                if(ddd.conversationType===1){
                    v.targetId=v.targetId.replace(/[^0-9]/ig,"")//数据库中userId是纯数字
                    ddd.targetId=v.targetId
                    self.privateChatList.push(ddd)
                }else if(ddd.conversationType===3){
                    ddd.targetId=v.targetId
                    self.groupChatList.push(ddd)
                }else if(ddd.conversationType===6){
                    v.ConversationName='系统消息'
                }
                self.allChatList.push(ddd)
                self.hisObj.push(ddd)
              })
              self.getAllChatInfo(self.allChatList,self.chatList)
              self.getPrivateChatInfo(self.privateChatList,self.chatList)
              self.getGroupChatInfo(self.groupChatList,self.chatList)
              self.getDefault(self.chatList)            
              // console.log('成功',self.getUserInfo(1))
              console.log('历史记录的对象',self.hisObj)
          },
          onError: function(error) {
             console.log('会话列表获取失败')
          }
      },conversationType,count);

    },
    getPrivateChatInfo(d,charList){
       //通过userId获取私聊对象的头像和名字
       // console.log('单聊',d)
       let self =this
       let userIdList=''
       let userInfoList=''
       d.forEach(v=>{
           userIdList+=v.targetId+','
       })
       userIdList=userIdList.substring(0, userIdList.length-1)//去掉最后的逗号
       // console.log ('userId拼接',userIdList)
        let userInfoListUrl = '/api/WebIM/getUserInfo/'+userIdList;
        axios.get(userInfoListUrl).then(function (response) {
            // console.log('单聊用户信息',response);
            if(response.status === 200){
                userInfoList =response.data.ReturnData
                // console.log('单聊',userInfoList)
                let allUserList=JSON.parse(localStorage.getItem('allUserInfo'))
                localStorage.setItem('allUserInfo',JSON.stringify(self.getUniques(allUserList,userInfoList)))
                charList.forEach(v=>{
                    userInfoList.forEach(c=>{
                        if(v.targetId==c.UserID && v.conversationType==1){
                            v.ConversationName=c.NickName
                            v.HeadPortrait=c.HeadPortrait
                        }
                    })
                })
            }
        }).catch(function (error) {
            console.log(error);
        });
    },
    getGroupChatInfo(d,charList){
        //通过groupId获取群聊名称
        // console.log('群聊',d)
        let self =this
        let groupIdList=''
        let groupInfoList=''
        d.forEach(v=>{
            groupIdList+=v.targetId+','
        })
        groupIdList=groupIdList.substring(0, groupIdList.length-1)//去掉最后的逗号
        // console.log ('groupId拼接',groupIdList)
        let groupInfoListUrl = '/api/WebIM/getGroupInfo/'+groupIdList;
        axios.get(groupInfoListUrl).then(function (response) {
            // console.log('群聊信息',response);
            if(response.status === 200){
                groupInfoList =response.data.ReturnData
                // console.log(groupInfoList)
                charList.forEach(v=>{
                    groupInfoList.forEach(c=>{
                        let allUserList=JSON.parse(localStorage.getItem('allUserInfo'))
                        localStorage.setItem('allUserInfo',JSON.stringify(self.getUniques(allUserList,c.MerberList)))
                        if(v.targetId==c.GroupID && v.conversationType==3){
                            v.ConversationName=c.GroupName
                            v.HeadPortrait=c.HeadPortrait
                        }
                    })
                })
            }
        }).catch(function (error) {
            console.log(error);
        });
    },
    getAllChatInfo(d,charList){
        //获取最新消息发送者的名字
        let userIdList=''
        let userInfoList=''
        let self =this
        d.forEach(v=>{
            userIdList+=v.senderUserId+','
        })
        userIdList=userIdList.substring(0, userIdList.length-1)//去掉最后的逗号
        // console.log ('senderUserId拼接',userIdList)
        let userInfoListUrl = '/api/WebIM/getUserInfo/'+userIdList;
        axios.get(userInfoListUrl).then(function (response) {
            // console.log('sender用户信息',response);
            if(response.status === 200){
                userInfoList =response.data.ReturnData
                let allUserList=JSON.parse(localStorage.getItem('allUserInfo'))
                localStorage.setItem('allUserInfo',JSON.stringify(self.getUniques(allUserList,userInfoList)))
                charList.forEach(v=>{
                    userInfoList.forEach(c=>{
                        if(v.latestMessage.senderUserId==c.UserID){
                           v.senderUserName=c.NickName
                        }
                    })
                })
            }
        }).catch(function (error) {
            console.log(error);
        });
    },
    getDefault(charList){
        charList.forEach(v=>{
            if(v.ConversationName===null || v.ConversationName===''){
                if(v.conversationType===1){
                    v.ConversationName='修理厂私聊'
                }else if(v.conversationType===3){
                    v.ConversationName='修理厂群聊'
                }
            }
        })
    },
    getUserInfo(id){
        let self =this
        // id=id.replace(/[^0-9]/ig,"")
        let userInfoList=JSON.parse(localStorage.getItem('allUserInfo'))
        let userInfo=[]
        let isExist=false
        userInfoList.forEach(c=>{
            // console.log(c)
            if(c.UserID==id){
                isExist=true
                userInfo=c
                // console.log('存在')
            }
        })
        // console.log(isExist)
        if(!isExist){
            let userInfoListUrl = '/api/WebIM/getUserInfo/'+id;
            axios.get(userInfoListUrl).then(function (response) {
                if(response.status === 200){
                    userInfo =response.data.ReturnData[0]
                    // console.log('重新查找',userInfo)
                    let ddd={ UserID:userInfo.UserID,
                        HeadPortrait:userInfo.HeadPortrait,
                        NickName:userInfo.NickName
                    }
                    userInfoList.push(ddd)
                    // console.log('新增',userInfoList)
                    let allUserList=JSON.parse(localStorage.getItem('allUserInfo'))
                    localStorage.setItem('allUserInfo',JSON.stringify(self.getUniques(allUserList,userInfoList)))
                    // localStorage.setItem('allUserInfo',JSON.stringify(userInfoList))
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        return userInfo
    },
    getUniques(a,b){
        //数组去重
        let aa=a
        let bb=b
        let obj=aa.concat(bb)
        // console.log(obj)
        var uniques = [];
        var stringify = {};
        for (var i = 0; i < obj.length; i++) {
            var keys = Object.keys(obj[i]);
            keys.sort(function(a, b) {
                return (Number(a) - Number(b));
            });
            var str = '';
            for (var j = 0; j < keys.length; j++) {
                str += JSON.stringify(keys[j]);
                str += JSON.stringify(obj[i][keys[j]]);
            }
            if (!stringify.hasOwnProperty(str)) {
                uniques.push(obj[i]);
                stringify[str] = true;
            }
        }
        uniques = uniques;
        // console.log(uniques)
        return uniques;
    },
    scrollEvent (d) {
      let self= this;
      // console.log(this.$refs.chatBox.scrollTop)
      // if(this.$refs.chatBox.scrollTop<=10){ //拉到顶了。加载历史记录
      //   console.log('我要加载历史记录啦')
      //   this.getchatHistory(self.nowChat);
      // }
    },   
    loadHis(d){
      const self=this;
      this.getchatHistory(self.nowChat);
    }, 
    getchatHistory(d,type){ //获取指定对话历史记录
      const self=this;
      if(d.targetId!=self.targetMan){ //切换了会话框了，先清空当前信息记录
        self.$store.state.answer=[]
        self.haveHis=true
      }
      self.nowChat=d;
      self.targetMan=d.targetId
      // console.log(d.conversationType)
      this.messageType=d.conversationType
      // console.log(this.messageType)
      if(type&&type==1&&type==3){ //不加载记录，只是切换聊天框
        self.hisObj.forEach((v,i,a)=>{ //把对应的历史记录塞到对应对象中
          if(v.targetId==d.targetId){
              self.$store.state.answer=v.history
          }
        }) 
        self.toBottom();           
        return false
      }
        let conversationType=null
        if(d.conversationType==1){
            conversationType = RongIMLib.ConversationType.PRIVATE; //单聊, 其他会话选择相应的消息类型即可
        }else if(d.conversationType==3){
            conversationType = RongIMLib.ConversationType.GROUP;//群聊
        }else if(d.conversationType==4){
            conversationType = RongIMLib.ConversationType.CHATROOM;//聊天室
        }else if(d.conversationType==6){
            conversationType = RongIMLib.ConversationType.SYSTEM;//系统
        } else{
          alert(`消息类型为${d.conversationType}`)
          return false
        }
        let targetId = d.targetId; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id
        let timestrap = null; // 默认传 null，若从头开始获取历史消息，请赋值为 0, timestrap = 0;
        let count = 20; // 每次获取的历史消息条数，范围 0-20 条，可以多次获取
        RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
            onSuccess: function(list, hasMsg) {
                let flag=false;
                self.hisObj.forEach((v,i,a)=>{ //把对应的历史记录塞到对应对象中
                  if(v.targetId==d.targetId){
                      // v.history=v.history.concat(list)
                      if(!v.history[0]){//不存在记录，是初次打开，要滚动到底
                         flag=true     
                      }
                      console.log('当前获取到的历史记录',list)
                      v.history=list.concat(v.history)
                      self.$store.state.answer=v.history
                  }
                })
                if(flag){
                 self.toBottom(); 
                }
                console.log('被插入过的历史记录大对象',self.hisObj)
                // self.$store.state.answer=list
                console.log('历史纪录',list, hasMsg)
                self.haveHis=hasMsg
            },
            onError: function(error) {
                console.log('GetHistoryMessages, errorcode:' + error);
            }
        });
      
    },
    getChatRecord(){  //获取指定会话历史
      let conversationType = RongIMLib.ConversationType.PRIVATE; //单聊, 其他会话选择相应的消息类型即可
      let targetId = ''; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id
      let timestrap = null; // 默认传 null，若从头开始获取历史消息，请赋值为 0, timestrap = 0;
      let count = 20; // 每次获取的历史消息条数，范围 0-20 条，可以多次获取
      RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
          onSuccess: function(list, hasMsg) {
              // list => Message 数组。
              // hasMsg => 是否还有历史消息可以获取。
              console.log('历史纪录',list, hasMsg)
          },
          onError: function(error) {
              console.log('GetHistoryMessages, errorcode:' + error);
          }
      });
    },
    getSearchChat(){  //搜索会话
      this.searchContent = this.$refs.searchContent.value;
      // if(searchContent)
      console.log(this.searchContent);
      axios.get('/api/Im/getlist',{
        params:{
          userId:this.userId,
          searchContent:this.searchContent
        }
      }).then(function (response) {
        if(response.status === 200){
          //获得成功响应返回的数据

        }
      }).catch(function (error) {
        console.log(error);
      });
    },

  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatHeader{
  width: 100%;
  text-align: center;
  background: greenyellow;
  height: 50px;
  line-height:50px;
}
.btn{
  top: 10px;
  position: absolute;
}
.con{
  widows: 100vw;
  height: 100vh;
  background: lavender;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.con-head{
  width: 100%;
  height: 75px;
  background: rgb(3, 156, 3);
  padding: 0 50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.con-head-img{
  width: 100%;
  height: 100%;
  border-radius:50%
}
.con-head-m{
  width: 50px;
  margin-right:15px; 
}
.con-head-t{
  color: white;
  font-size: 15px;
}
.con-box{
  width: 100%;
  flex: 1;
  display: flex;
}
.con-nav{
  width: 100px;
  height: 100%;
  background: rgb(6, 197, 22);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.con-nav-head{
  width: 65px;
  height: 65px;
  background: lavender;
  border-radius:50%; 
  margin-top:20px; 
}
.chatList{
  width: 400px;
  height:calc(100vh - 75px);
  flex-shrink: 0;
  background: lemonchiffon;
  overflow-y: auto;
}
.search{
  width: 100%;
  height: 50px;
  background: lightgreen;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top:0px;
  z-index: 10;
}
.search-1{
  width: 80%;
  height: 40px;
  background: #eee;
  border-radius:20px;
  text-indent: 10px;
  border: none;
  outline: none; 

}
.chatRoom{
  flex: 1;
  height: 100%;
  background: white;
  position: relative;
  box-sizing: border-box; 
  display: flex;
  flex-direction: column;
}
.background-img{ 
  width: 100%;
  height: 100%;
}
.chatContent{
  width: 100%;
  height: calc(100vh - 75px - 50px - 150px );
  overflow-y: auto;
}
.inpOp{
  position: relative;;
  width: 100%;
  height: 150px;
  background: white;
  border: 2px solid #eee;
  border-radius:5px; 
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}
.inpTool{
  width: 100%;
  height: 34px;
  background: white;
}
.inpEnter{
  width: 100%;
  flex: 1;
  border: none;
  outline: none;
  padding:15px;
  box-sizing: border-box;
}
.sendBtn{
  width: 80px;
  height: 30px;
  position: absolute;
  right: 20px;
  bottom:15px;
}
.loadHistory{
  width: 100%;
  text-align: center;
  color: #999;
  font-size: 12px;
  margin-top:5px; 
}
.loadHistory-t{
  cursor: pointer;
}
.images{
  display:inline-block;
  padding-left: 10px;
  padding-top: 4px;
}
</style>


