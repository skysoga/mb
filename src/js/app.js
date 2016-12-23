import Navbar from '../components/navbar';
import TitleInfo from '../components/title-info';
import '../scss/public.scss'

export default {
  components: {
    Navbar,
    TitleInfo
  },
  data:()=>{
    return{
    }
  },
  watch:{
    $route(to,from){
      //RootApp.beforEnter(to)
      if (this.$store.state.needVerify>5) {
        console.log("强制踩点功能");
        RootApp.AjaxGetInitData(["CloudUrl"])
      }
    }
  }
}
