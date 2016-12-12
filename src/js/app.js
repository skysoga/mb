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
      RootApp.beforEnter(to)
    }
  }
}
