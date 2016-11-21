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
    BottomBoxfun(key,value){
      console.log(key,value)
      this.dataName=value
      this.BottomBoxShow=false
    }
  },
  //子组件
  components:{
    'bottom-box': BottomBox
  }
}
