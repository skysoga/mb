import HeadImgbox from '../components/HeadImg-box'
export default {
  data:()=>{
    return{
      HeadImgBoxShow:false,
      DefaultPhoto:'',
      DefaultID:'',
      DefaultName:'',
      UserNickName:'',
      // UserQQ:'',
      UserBirthDay:'',
      UserSex:'',
      HeadImgBoxList:''//以上头像组件关联
    }
  },
  beforeRouteEnter(to,from,next){
    var arr=['UserName','UserNickName','UserMobile','UserMail','UserPhoto','UserSex','UserBirthDay','DefaultPhotoList']
    RootApp.GetInitData(arr,state=>{
      next()
    })
  },
  created(){
        this.DefaultPhoto=state.UserPhoto
        this.UserNickName=state.UserNickName
        // this.UserQQ=state.UserQQ  'UserQQ',
        this.UserSex=state.UserSex
        this.UserBirthDay=state.UserBirthDay
        this.HeadImgBoxList=state.DefaultPhotoList.shuffle()
  },
  methods:{
    upHeadImg(){
      var arr={Action:'UpdateUserPhoto',UserPhoto:this.DefaultPhoto}
      layer.msgWait("正在提交")
      _fetch(arr).then(data=>{
          if(data.Code==1){
            RootApp.SaveInitData({'UserPhoto':arr.UserPhoto})
            layer.alert(data.StrCode)
            this.HeadImgBoxShow=false
          }else{
            layer.msgWarn(data.StrCode)
          }
      })
    },
    $vanow(name){
      var val=this.vaVal[name]
      var key=name
      var vm=this
      if(name=='NickName'){
       layer.open({
          shadeClose: false,
          className: "layerConfirm",
          content: '注意：昵称一经保存后将无法再修改！是否设置昵称?',
          title: "温馨提示",
          btn: ["保存", '取消'],
          yes: function(index){
            layer.close(index)
            vm.setAjax(key,val)
          },
          no: function(index){
            layer.close(index)
          }
        })
      }else{
        this.setAjax(key,val)
      }
    },
    setAjax(key,value){
      var vm=this
      var ajaxData = {Action: 'UpdatePersonInfo'}
      ajaxData[key]=value
      layer.msgWait("正在提交")
      _fetch(ajaxData).then(data=>{
          if(data.Code===1){
            if(key=='NickName'){
              this.UserNickName=value
            }
            var obj={}
            obj['User'+key]=value
            RootApp.SaveInitData(obj)
            layer.alert(data.StrCode)
          }else{
            var skey="User"+key
            layer.msgWarn(data.StrCode)
            vm[skey]=state[skey]
          }
      })
    },
    setDefImg(){
      var arr=state.DefaultPhotoList
      var key=this.DefaultPhoto
      for(var n in arr){
        if(arr[n].ImageUrl==key){
          this.DefaultID=arr[n].ID
          this.DefaultName=arr[n].ImageName
          return
        }
      }
    },
    getUrl(str){
      var obj=(str=='Mobile')
      var route=obj?'/setMobile':'/setMail'
      router.push(route)
    }
  },
  components:{
    'HeadImg-box':HeadImgbox
  }
}
