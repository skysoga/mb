const {interviewApp,state}=require("../main.js");
export default{
  data(){
    return{
      arr:{
        Action:"GetInviteUrl",
        UserType:1,
        Index:0,
        DataNum:15
      },
      data_count:null,
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
      this.cant_scroll = 1
      var vm=this
      _fetch(this.arr).then(json=>{
          if(json.Code==1){
            if(json.BackData.length){
              vm.cant_scroll=0
              if (vm.arr.Index === 0) {
                this.data_count = json.DataCount
              }
              vm.ArrList=vm.ArrList.concat(json.BackData)
              vm.data_length += json.BackData.length
              if(vm.data_length >= vm.data_count){
                  vm.cant_scroll = 2
                }
              vm.arr.Index++
            }
          }else{
            layer.msgWarn(json.StrCode)
          }
      })
    },
    scroll(){
      if (this.cant_scroll) {
        return
      }else if (this.scroollDom.scrollTop > (this.ArrList.length-50)*(3*em+1)-this.doc_height) {
        this.getAjaxData()
      }
    }
  },
  mounted(){
    this.getAjaxData()
    this.scroollDom = this.$refs.main
    this.doc_height = this.scroollDom.clientHeight
  }

}
