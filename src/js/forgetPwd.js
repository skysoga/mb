const {interviewApp}=require("../main.js");
export default {
  data:()=>{
    return{
      UserName:'',
      ImgCode:'',
      imgSrc:''
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    to.meta.link='/login'
    next()
  },
  created(){
    this.imgUrl()
  },
  methods:{
    postBtn(){
      var vm=this
      var _FomatC=this.$store.state._FomatConfig
      var ArrData={
        UserName:this.UserName,
        ImgCode:this.ImgCode
      }
      var err=this.$root.format(ArrData,['UserName','ImgCode'],_FomatC)
      if(err){
        layer.msgWarn(err[1]);
        return;
      }
      ArrData.Action='SetSessionUser'
      _fetch(ArrData).then(data=>{
          var Data=data
          if(Data.Code==1){
            vm.$root.SaveInitData(data.BackData)
            sessionStorage.setItem('isFind',true)
            // vm.$root.$router.push({path:'resetWay',query:{Q:'ResetPwd'}})
            vm.$root.$router.push('/resetWay?Q=ResetPwd')
          }
          this.imgUrl()
      })
    },
    imgUrl(){
      var ArrD={Action:'GetImageCode'}
      var vm=this
      _fetch(ArrD).then(data=>{
          vm.imgSrc="data:image/png;base64,R0lGODlhPAAWAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAAA8ABYAAAj" + data;
      })
    }
  }
}
