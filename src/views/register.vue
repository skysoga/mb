<template>
<div class="main">
  <table>
    <tbody>
      <tr>
        <td>邀请码</td>
        <td colspan="2">
          <input class="input fl mL15"
    						 type="url"
    						 placeholder="请输入邀请码"
    						 :readonly  = "YqmReadOnly"
    						 v-model.lazy = "InvitationCode"/>
        </td>
      </tr>

      <tr>
        <td>账号</td>
        <td  colspan="2"><input class="input fl mL15" type="url" v-model.lazy="UserName " placeholder="请输入账号" /></td>
      </tr>

      <tr>
        <td>设置密码</td>
        <td colspan="2"><input class="input fl mL15" type="password" v-model.lazy="Password" placeholder="请输入密码" /></td>
      </tr>

      <tr>
        <td>确认密码</td>
        <td colspan="2"><input class="input fl mL15" type="password" v-model.lazy="checkPassword" placeholder="请再次输入密码" /></td>
      </tr>

      <tr>
        <td>验证码</td>
        <td ><input class="input" type="email" v-model.lazy="ImgCode" placeholder="请输入验证码" autocomplete="off"></td>
        <td @click = 'refreshYzm'>
          <img class="yzm" :src="YzmSrc">
        </td>
      </tr>


      <tr>
      </tr>
    </tbody>
  </table>

  <router-link class='forget fr' to = "/login">已有账号? 立即登录</router-link>
  <div class="loginBtn BTN mt30" @click = "register">
    <a>立即注册</a>
  </div>
</div>
</template>

<script>

export default {
	data () {
		return {
			InvitationCode: '',
			UserName: '',
			Password: '',
			checkPassword: '',
			ImgCode: '',

			YzmSrc: '', 				//邀请码图片地址
			YqmReadOnly: false	//邀请码框是否只读
		}
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
		this.refreshYzm()			//获取验证码
	},
	methods:{
		//刷新验证码
		refreshYzm () {
			_fetch({Action:'GetImageCode'}).then((res)=>{
				res.text().then((text)=>{
					this.YzmSrc = 'data:image/png;base64,R0lGODlhPAAWAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAAA8ABYAAAj' + text;
				})
			})
		},
		register () {
			var ajax = {
				InvitationCode: this.InvitationCode,
				UserName: this.UserName,
				Password: this.Password,
				checkPassword: this.checkPassword,
				ImgCode: this.ImgCode,
			}

			var selfCheck = {
				InvitationCode:{
					Name: '邀请码',
					Reg: /^[a-zA-Z0-9]{8}$/,
					ErrMsg:"您输入的邀请码错误或者已过期！",
				},
			}

			var err = this.$root.format(ajax, ['InvitationCode', 'UserName', 'Password', 'checkPassword', 'ImgCode'], selfCheck);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      delete ajax.checkPassword;
      ajax.Action="Register";

      var that = this      
      _fetch(ajax).then((res)=>{
        res.json().then((json) => {
        	console.log(json)
          if(json.Code===1) {
           layer.open({
              shadeClose: false,
              className: "layerConfirm",
              content: json.StrCode + '，是否立即登录?',
              title: "温馨提示",
              btn: ["登录", '取消'],
              yes: function yes(index) {
                layer.close(index);
                var ajax1 = ajax;
                ajax1.Action="Login";
                _fetch(ajax1).then((res)=>{
                	res.json().then((json) => {
                		if(json.Code === 1){

                			//此处放置清空缓存的东东
                      // lStorage.clearlocalStorage(lStorage.Arr.UserCache);
                      // lStorage.clearlocalStorage(lStorage.Arr.VerifyUser);

                      sessionStorage.clear();
                      console.log(that)
                      this.$router.push('/index')
                		}else{
                			layer.msgWarn(json.StrCode);
                		}
                	})
                })
              },
              no: function no() {
								this.UserName= ''
								this.Password= ''
								this.checkPassword= ''
								this.ImgCode= ''
              }
            });
          }else{
            if(json.Code === 2){
              localStorage.removeItem('InvitationCode');
              this.YqmReadOnly = false;
            }
            layer.msgWarn(json.StrCode);
            this.refreshYzm()
          }
        })
      })
		}
	},
}
</script>


<style lang = "scss" scoped>
  @import '../scss/login.scss';
</style>
