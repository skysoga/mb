const {interviewApp,state}=require("../main.js");
import HeadImgbox from '../components/HeadImg-box'
export default {
  data:()=>{
    return{
      HeadImgBoxShow:false,
      DefaultPhoto:'',
      DefaultID:'',
      DefaultName:'',
      HeadImgBoxList:'',//以上头像组件关联
    }
  },
  created(){
    var arr=['UserName','UserNickName','UserGrade','UserMobile','UserMail','UserPhoto','UserSex','UserQQ','UserBirthDay','UserGradeGrow','GradeList']
    this.$root.GetInitData(arr)
  },
  methods:{
    upHeadImg(){
      var arr={Action:'UpdateUserPhoto',UserPhoto:this.DefaultPhoto}
      layer.msgWait("正在提交")
      _fetch(arr).then(res=>{
        res.json().then(data=>{
          if(data.Code==1){
           this.$root.AjaxGetInitData(['UserPhoto'],()=>{
              layer.msgWarn(data.StrCode)
              this.HeadImgBoxShow=false
            })
          }else{
            layer.msgWarn(data.StrCode)
          }
        })
      })
    },
    $vanow(e){
      console.log(this.vaVal,e)
    }
  },
  components:{
    'HeadImg-box':HeadImgbox
  }
}
