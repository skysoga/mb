<!-- <template>
  <div class="main">
    <ul class="pingContent">
      <li v-for="n in LineList" :class="{noActive:n[2]==1}"><input type="text" :value="n[2]==0?n[1]+'ms':'连接超时'"><i class="cssico-2right"></i><input type="text" :value="n[0]"><a v-if="n[2]==0" :href="'//'+n[0]">切换</a><a v-else>切换</a></li>
    </ul>
    <div class="refresh">
      <div :class="{BTN:true,noActive:btnIf==false}" @click="upList">{{btnMsg}}</div>
    </div>
  </div>
</template>
<script>
export default{
    data(){
      return{
        btnMsg:"重新检测",
        btnIf:true,
        islang:"",
        LineList:""
      }
    },
    beforeRouteEnter:(to, from, next) => {
      if (_App) {
        router.replace("/notfount")
      }
      next()
    },
    created(){
      this.getData()
    },
    methods:{
      finder(i,obj){
        var vm=this
        if(obj.length<vm.islang){
          vm.btnIf=false
          vm.btnMsg="正在检测"
        }else{
          vm.btnIf=true
          vm.btnMsg="重新检测"
        }
      },
      ping(data){
        var vm=this
        var timeArr = [0]
        var ObjArr=[]
        var LineList=data
        var len = LineList.length
        window.callback = function(e){
          var t = ObjArr.pop()
              t[2]=0
          ObjArr.unshift(t)
          vm.evenNumbers(ObjArr)
       }
        var i = 0
        var Inter = setInterval(function() {;
           (function(i) {
            var Obj={}
             var img = document.createElement("img");
             img.src = "http://" + LineList[i] + "/jsonp.js?" + Math.random();
             var time = new Date().getTime();
             img.onerror = function(e) {
               time = new Date().getTime() - time;
               ObjArr.push([LineList[i],time,1])
               var script = document.createElement("script");
               script.src=img.src
               document.body.appendChild(script);
               vm.finder(i,ObjArr)
               vm.LineList=ObjArr
             }
           })(i)
           ++i == len && clearInterval(Inter)
         }, 100)
      },
      getData(){
        var arr={Action:"getPingLine"}
        _fetch(arr).then(ref=>{
          if(ref.Code==1){
            this.islang=ref.BackData.length
            this.ping(ref.BackData)
          }
        })
      },
      upList(){
        if(!this.btnIf)return;
        this.islang=""
        this.LineList=""
        this.btnMsg="正在检测"
        this.btnIf=false
        this.getData()
      },
      evenNumbers(ObjArr){
        ObjArr.sort((a,b)=>{
          return a[1]-b[1]
        }).sort((a,b)=>{return a[2]-b[2]})
        this.LineList=ObjArr
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/FromTable','../scss/ping.scss';
</style>
 -->