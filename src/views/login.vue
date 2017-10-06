<template>
  <div class="main">
    <div class="header">
      <div class="headImg">
        <img :src="'http://imagess-google.com/system/common/headimg/'+(lastLoginImage||'defaultHead.png')" width="100%" height="100%" alt="">
        <!-- <img v-else src="/static/img/face.png" width="100%" height="100%" alt=""> -->
      </div>
    </div>
    <form autocomplete="off">
    <table>
      <tbody>
        <tr>
          <td class="username-icon"></td>
          <td colspan="2">
            <input v-model="UserName" class="input" tag="帐号" type="email" ref="UserName" v-va:UserName placeholder="请输入账号"/>
            <span class="downico" v-if="UserList" @click="BottomBoxShow=true"></span>
            <!-- <em v-show="UserName&&vas.UserName" class="clearInput" v-va-clear:UserName></em> -->
            <clearInput inputName="UserName"></clearInput>
          </td>
        </tr>
        <tr>
          <td class="password-icon"></td>
          <td colspan="2">
            <input v-model="Password" maxlength="16" class="input" autocomplete="off" tag="密码" type="text" ref="Password"  v-va:Password placeholder="请输入密码" />
            <pwdEye type="close"></pwdEye>
            <clearInput></clearInput>
          </td>
        </tr>
        <tr v-if="IcodeShow">
          <td>验证码</td>
          <td><input type="text" maxlength="4" v-va:ImgCode tag="验证码" v-model="ImgCode" placeholder="请输入验证码">
          </td>
          <td>
            <img class="yzm" :src="imgSrc" @click="imgUrl">
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    </form>

    <div class="loginBtn BTN" v-va-check>
      <a>立即登录</a>
    </div>
    <div class="otherBtn">
      <router-link class='signup' to = "/register">立即注册</router-link><router-link class='forget' to = "/forgetPwd?Q=ResetPwd">忘记密码</router-link>
    </div>

    <ul id="usedList"></ul>
    <!-- 区分是否登录记录数据 -->
    <bottom-box v-show = "BottomBoxShow"
                 :list = "UserList"
                 ></bottom-box>

  </div>
</template>
<script>
  import BottomBox from '../components/bottom-box';
  import pwdEye from '../components/pwdEye';
  import clearInput from '../components/clearInput';
  export default {
    data:()=>{
      /*var BottomBoxList={
        'forgetPwd': '忘记密码',
        'pc': '电脑版'
      }
      if(_App) delete  BottomBoxList.pc*/

      return{
        /*vas:{
          UserName:false,
          Password:false
        },//清除内容开关*/
        UserName:'',
        Password:'',
        ImgCode:'',
        isLogin:true,
        imgSrc:'',
        IcodeShow:false,
        BottomBoxShow: false,
        // BottomBoxList,
        UserList:'',
        // Eyes:false,
        lastLoginImage:localStorage.getItem('lastLoginImage')||''
      }
    },
    created(){
      // 判断是否有缓存帐号记录
      // var obj=this.getLocalStorage();
      // this.UserList=(obj&&obj.length)?this.ArrToObj(obj):''
      var UserList=localStorage.getItem('Logined')
      try{
        UserList=JSON.parse(UserList)
        if (typeof(UserList[0])==='string') {
          UserList.forEach(function(v,i,thisArr){
            UserList[i]=v.split('&')
          })
        }
        console.log(UserList)
      }catch(e){
        UserList=''
      }
      this.UserList=UserList
    },
    beforeRouteEnter:(to,from,next)=>{
      next(v=>{
        var IVK=getCookie('IVK')
        if(!IVK){
          // let arr={Action:"GetInitData"}//修正IVK获取问题
          // _fetch(arr).then()
          RootApp.getServerTime()
        }
      })
    },
    methods:{
      $vaSubmit:function(e){
        //浏览器记住密码修正
        this.UserName=this.$refs.UserName.value
        this.Password=this.$refs.Password.value
          var ajax = {
            Action:"Login",
            UserName:this.UserName,
            Password:this.Password
          }
          if(this.IcodeShow){
            ajax['ImgCode']=this.ImgCode
          }
          layer.msgWait("正在登录")
          _fetch(ajax).then((json)=>{
            if (json.Code===1) {
              RootApp.Logout()
              RootApp.Login(this.UserName,()=>{
                this.addLogin(this.UserName.toLowerCase(),md5(this.UserName+md5(this.Password)))
                // this.setFace()
                router.replace(state.login2path||"/index")
              })
            }else if(json.Code===2){
              this.IcodeShow=true
              this.imgUrl()
              layer.msgWarn(json.StrCode)
            }else{
              layer.msgWarn(json.StrCode)
            }
          })
      },
      bottomBox(key,val){
        // 判断是否APP
        // if(this.isLogin){
          this.BottomBoxShow=false
          this.autoLogin(key,val)
        // }else{
        //   if(key=='forgetPwd'){
        //     router.replace("/forgetPwd")
        //   }else if(key=='pc'){
        //     location.href="http://"+location.host.replace('m.','')+"?CanPc";
        //   }
        // }
      },
      imgUrl(){
        var ArrD={Action:'GetImageCode'}
        var vm=this
        _fetchT(ArrD).then(data=>{
            vm.imgSrc="data:image/png;base64,R0lGODlhPAAWAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAAA8ABYAAAj" + data;
        })
      },
      // setType(val){
      //   // 切换组件类型
      //   // this.isLogin=val
      //   this.BottomBoxShow=true
      // },
      addLogin(key,val){
        // 添加登录记录
        var thisUser=[key,val]
        console.log(this.UserList)
        if (!this.UserList) {
          this.UserList=[thisUser]
        }else{
          for (var i = this.UserList.length - 1; i >= 0; i--) {
            if(this.UserList[i][0]===key){
              console.log(i,'已存在')
              this.removeLogin(i)
            }
          }
          this.UserList.unshift([key,val])
        }
        this.saveLogined()
      },
      delLogin(val){
        // 删除登录记录
        layer.confirm('是否删除登录记录',()=>{
          this.removeLogin(val)
          layer.alert('记录删除成功')
        })
      },
      /*getLocalStorage(){
        // 获取缓存帐号
        return JSON.parse(localStorage.getItem('Logined'))
      },
      setArrUN(val){
        return Array.from(new Set(val))
      },*/
      saveLogined(){
        if(this.UserList.length>5){
          this.UserList.length=5
        }
        localStorage.setItem('Logined',JSON.stringify(this.UserList))
      },
      removeLogin(key){
        this.UserList.splice(key,1)
        this.saveLogined()
      },
      /*isNull(val){
        return val&&val.length
      },
      ArrToObj(Arr){
        let Obj={}
        for(var i=0;i<Arr.length;i++){
          var val=Arr[i].split("&")
          Obj[val[0]]=val[1]
        }
        return Obj
      },
      setFace(){
        var arr=['UserPhoto']
        RootApp.GetInitData(arr, state=>{
          this.lastLoginImage=state.UserPhoto
          localStorage.setItem('lastLoginImage',state.UserPhoto)
        })
      },*/
      autoLogin(index,userData){
        // 从记录自动登录
        var ajax = {
          Action:"Login",
          UserName:userData[0],
          Password:userData[1]
        }
        layer.msgWait("正在登录")
        _fetch(ajax).then((json)=>{
          if (json.Code===1) {
            RootApp.Logout()
            RootApp.Login(userData[0],()=>{
              router.replace(state.login2path||"/index")
            })
            this.addLogin(userData[0],userData[1])
          }else{
            if (json.StrCode.search('密码错误')!==1) {
              this.removeLogin(index)
              layer.msgWarn('由于您近期修改过密码<br/>请重新手动输入密码进行登录')
              //密码错误要删除记录
            }else{
              layer.msgWarn(json.StrCode)
            }
          }
        })
      }
      /*setEyes(){
        this.Eyes=this.Eyes=='open'?'close':'open'
      }*/
    },
    //子组件
    components:{
      pwdEye,
      clearInput,
      'bottom-box': BottomBox
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/login.scss';
  table{
    table-layout: fixed;
    tr{
      td:first-child{
        width: 3em;
      }
      td:last-child{
        width: 100%;
      }
    }
  }
  .main{
    background: #fafafa;
    height: 100%;
    padding-top: 2.3em;
  }
  .headImg{
    width:4rem;
    height: 4rem;
    margin:1.2em auto;
    img{
      border-radius: 50%;
      display: block;
      border:3px solid #e2e0e0;
    }
  }
  .username-icon,.password-icon{
    &:before{
      font-family: 'iconfont';
      display: block;
      color:#c6c6c6;
      font-size:1.2em;
      line-height: 1em;
      text-align: center;
    }
  }
  .username-icon:before{
    content:'\e605';
  }
  .password-icon:before{
    content:'\e604';
  }

  .otherBtn{
    text-align: center;
    margin-top:.7em;
    a{
      font-size: .7em;
      color: #bbb;
      padding: 0 .6em;
      line-height: 1em;
    }
    >a{
      display: inline-block;
    }
    .signup{
      color: #dc3b40;
      border-right:1px solid #e5e5e5;
    }
  }
</style>
