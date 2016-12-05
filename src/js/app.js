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
      // console.log("路由监听");
      var meta = to.matched[0].meta
      var state = this.$store.state
      if(meta.user){
        // console.log("需要登录")
        if (!state.UserName) {
          this.$router.push("/login")
        }else if(state.agent){
          // console.log("需要代理")
          state.AgentRebate||this.$router.push("/notfount")
        }
      }
    }
  }
}