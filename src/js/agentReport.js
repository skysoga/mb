import BottomBox from '../components/bottom-box';
export default {
  data:()=>{
    return{
      dataName:"今天",
      BottomBoxShow: false,
      BottomBoxList:{
        'tfun': '今天',
        'zfun': '昨天',
        'bfun': '本月',
        'sfun': '上月'
      }
    }
  },
  methods:{
    dataBtn(){
      if(this.dataShow!=true){
        this.dataShow=true
      }
    },
    tfun(value){
      this.dataName=value
      this.BottomBoxShow=false
    },
    zfun(value){
       this.dataName=value
       this.BottomBoxShow=false
    },
    bfun(value){
       this.dataName=value
       this.BottomBoxShow=false
    },
    sfun(value){
       this.dataName=value
       this.BottomBoxShow=false
    },
  },
  //子组件
  components:{
    'bottom-box': BottomBox
  }
}
