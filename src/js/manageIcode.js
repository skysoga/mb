const {interviewApp,state}=require("../main.js");
export default {
  data(){
    return{
      UserType:1,
      data_count:null,
      Index:0,
      ArrList:[],
      data_length:0,
      scroollDom:null,
      msg:[null,layer.icon.load + "正在加载...","已显示全部内容"],
      doc_height:0,
      cant_scroll:0
    }
  },
  methods:{
    getAjaxData(){
      console.log("刷新");
      this.cant_scroll = 1
      var vm=this
      var arr={Action:"GetInviteUrl"}
          arr.UserType=1
          arr.Index=vm.Index
          arr.DataNum=15
      _fetch(arr).then(ref=>{
        if (ref.ok) {
        ref.json().then(json=>{
          if(json.Code==1){
            if(json.BackData.length){
              vm.cant_scroll=0
              if (vm.Index === 0) {
                this.data_count = json.DataCount
              }
              vm.ArrList=vm.ArrList.concat(json.BackData)
              vm.data_length += json.BackData.length
              if(vm.data_length >= vm.data_count){
                  vm.cant_scroll = 2
                }
              vm.Index++
            }
          }else{
            layer.msgWarn(json.StrCode)
          }
        })
      }else{
         layer.msgWarn("request error")
      }
      })
    },
    scroll(){
      if (this.cant_scroll) {
        return
      }else if (this.scroollDom.scrollTop > (this.ArrList.length-6)*(3*em+1)-this.doc_height) {
        this.getAjaxData()
      }
    }
  },
  mounted(){
    this.getAjaxData()
    this.scroollDom = this.$refs.TouchScroll
    this.doc_height = this.scroollDom.clientHeight
  }
}
