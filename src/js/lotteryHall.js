import navslider from '../components/nav-slider'
export default {
  props:["s"],
  data() {
    return {
      LList:["1401","1402","1407","1406","1405","1000","1001","1008","1003","1403","1410","1408","1411","1409","1404"],
      initData: []
    }
  },
  components: {
    'nav-slider': navslider
  }
}
