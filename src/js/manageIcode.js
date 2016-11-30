const {interviewApp,state}=require("../main.js");
export default {
  data:()=>{
    return{
      UserType:1,
      DataNum:15,
      dlIndex:0,
      wjIndex:0,
      dlList:[],
      wjList:[]
    }
  },
  created:function(){
    this.getList(0,1)
  },
  methods:{
    getList(index,Type){
      var vm=this
      var arr={Action:"GetInviteUrl"}
          arr.UserType=Type
          arr.Index=index
          arr.DataNum=this.DataNum
      _fetch(arr).then(ref=>{
        ref.json().then(json=>{
          if(json.Code==1){
            if(Type==1){
              vm.dlList=json.BackData
            }else{
              vm.wjList=json.BackData
            }
            layer.msgWarn(json.StrCode)
          }else{
            layer.msgWarn(json.StrCode)
          }
        })
      })
    }
  }
}
