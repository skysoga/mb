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
  }
  methods:{
    dataBtn(){
      if(this.dataShow!=true){
        this.dataShow=true
      }
    },
    tfun(e){
      this.dataName=e.target.innerText
      this.BottomBoxShow=false
    },
    zfun(e){
       this.dataName=e.target.innerText
       this.BottomBoxShow=false
    },
    bfun(e){
       this.dataName=e.target.innerText
       this.BottomBoxShow=false
    },
    sfun(e){
       this.dataName=e.target.innerText
       this.BottomBoxShow=false
    },
  },
  //子组件
  components:{
    'bottom-box': BottomBox
  }
}
