<template>
<div class="main">
  <table>
    <tbody>
      <tr>
        <td>邀请码</td>
        <td colspan="2">
          <input v-va:InvitationCode="[{'reg':/^\d{8}$/}]" regMsg="您输入的邀请码错误" tag="邀请码" class="input fl mL15"
                 type="tel"
                 placeholder="请输入8位数字邀请码"
                 maxlength="8"
                 :readonly  = "YqmReadOnly"
                 v-model = "InvitationCode"/>
          <clearInput></clearInput>
        </td>
      </tr>

      <tr>
        <td>账号</td>
        <td  colspan="2">
          <input class="input fl mL15"
                 type="url"
                 v-va:UserName="[{reg:/^[a-zA-Z\d]{4,16}$/}]"
                 tag="帐号"
                 @change="checkUser"
                 regMsg = "账号应为4-16个字符，可使用字母、数字"
                 maxlength="16"
                 v-model="UserName"
                 :placeholder="existed?exUserName+' 帐号已存在':'请输入您要注册的账号'"/>
          <!-- <em v-show="UserName&&vas.UserName" class="closebtn" v-va-clear:UserName.noright></em> -->
          <clearInput></clearInput>
        </td>
      </tr>

      <tr>
        <td>设置密码</td>
        <td colspan="2">
          <input type="url" class="input fl mL15" maxlength="16" tag="设置密码" v-model="Password" v-va:Password placeholder="请输入您要设置的密码" />
          <pwdEye></pwdEye>
          <clearInput></clearInput>
        </td>
      </tr>
      <tr v-if="isShowCode">
        <td>验证码</td>
        <td ><input class="input" type="email" maxlength="4" v-va:ImgCode tag="验证码" v-model="ImgCode" placeholder="请输入验证码" autocomplete="off"><clearInput></clearInput></td>
        <td @click = 'refreshYzm'>
          <img class="yzm" :src="imgSrc">
        </td>
      </tr>


      <tr>
      </tr>
    </tbody>
  </table>

  <router-link class='tologin fr' to = "/login">已有账号? 立即登录</router-link>
  <div class="loginBtn BTN mt30" v-va-check>
    <a>立即注册</a>
  </div>
</div>
</template>

<script>
import pwdEye from '../components/pwdEye';
import clearInput from '../components/clearInput';
export default {
  components:{
    clearInput,
    pwdEye
  },
  data:()=>{
    return {
      /*vas:{
        UserName:false,
        Password:false
      },*/
      InvitationCode: '',
      UserName: '',
      Password: '',
      checkPassword: '',
      ImgCode: '',
      imgSrc: '',         //邀请码图片地址
      YqmReadOnly: false,  //邀请码框是否只读
      existed:'',
      exUserName:'',
      Eyes:'open',
      isShowCode:false
    }
  },
  beforeRouteLeave: (to, from,next)=>{
    delete from.id
    next()
  },
  created (){
    let id = this.$route.query.id;
    if(id){
      this.InvitationCode = id;
      this.YqmReadOnly = true;
      localStorage.setItem('InvitationCode', id)
    }else{
      let InvitationCode = localStorage.getItem('InvitationCode');
      if(InvitationCode){
        this.InvitationCode = InvitationCode;
        this.YqmReadOnly = true;
      }
    }
    // this.refreshYzm()      //获取验证码
  },
  methods:{
    //刷新验证码
    refreshYzm () {
      _fetch({Action:'GetImageCode'}).then((text)=>{
        this.imgSrc = text;
      })
    },
    $vaSubmit() {
      var ajax = {
        Action:"Register",
        InvitationCode: this.InvitationCode,
        UserName: this.UserName,
        Password: this.Password,
        // ImgCode: this.ImgCode,
      }
      var that = this
      if(that.isShowCode){
        ajax.ImgCode=that.ImgCode
      }
      layer.msgWait("正在注册")
      _fetch(ajax).then((json)=>{
        if(json.Code===1||json.Code===0) {
         layer.open({
            shadeClose: false,
            className: "layerConfirm",
            content: json.StrCode + '，是否立即登录?',
            title: "温馨提示",
            btn: ["登录", '取消'],
            yes: function yes(index) {
              // sessionStorage.clear();
              RootApp.Logout()
              layer.close(index);
              var ajax1 = ajax;
              ajax1.Action="Login";
              ajax1.Password=that.Password;
              _fetch(ajax1).then((json)=>{
                if(json.Code === 1){
                  RootApp.Login(that.UserName,function(){
                    router.push("/index");
                  })
                }else{
                  layer.msgWarn(json.StrCode);
                }
              })
            },
            no: function no() {
              that.isShowCode&&that.refreshYzm()
              that.UserName= ''
              that.Password= ''
              that.checkPassword= ''
              that.isShowCode&&(that.ImgCode= '')
            }
          });
        }else if(json.Code===2){
          layer.msgWarn(json.StrCode)
          that.isShowCode=true
          that.refreshYzm()
        }else{
          if(json.Code === -2){
            that.InvitationCode=''
            that.isShowCode&&(this.ImgCode='')
            localStorage.removeItem('InvitationCode');
            that.YqmReadOnly = false;
          }
          layer.msgWarn(json.StrCode);
          that.isShowCode&&that.refreshYzm()
        }
      })
    },
    checkUser(){//校验帐号是否存在
      this.existed=''
      var regObj=/^[a-zA-Z\d]{4,16}$/
      if(regObj.test(this.UserName)){
        var uname=this.UserName
        this.exUserName=uname
          //进行校验
          var ajax = {
            Action:"CheckUser",
            UserName: uname
          }
          _fetch(ajax).then((json)=>{
            if (json.Code!==-1) {
              this.existed=json.Exist
              this.UserName=this.existed?"":uname
            }
          })
        }
    },
    setEyes(){
      this.Eyes=this.Eyes=='open'?'close':'open'
    }
  }
}
</script>


<style lang = "scss" scoped>
  @import '../scss/login.scss';
  .main{
    background: #fafafa;
    height: 100%;
    padding-top: 3em;
  }
  .tologin{
    font-size:.7em;
    color:#dc2e2e;
    margin: 1em 1rem;
  }
</style>
