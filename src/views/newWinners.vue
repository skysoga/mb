<template>
  <div class="newWinner user-main" ref="div">
    <loading v-show="isDataNot"></loading>
    <ul ref="ul">
       <transition-group name="list">
         <li :data-thisid="item.UserId" class="active" v-for="item in bonu_list_data2"  @click="jump(item.UserId)" :key='item.Id'>
           <div>
             <a class="headImg" href="#">
               <img :src="$store.getters.PhotoPath+item.UserPhoto" alt="">
             </a>
             <div class="right">
               <a href="#" style="color:#38f">{{item.Nickname?item.Nickname:item.UserName}}</a>
               <span>在{{item.LotteryName}}<br>喜中</span><em>￥{{item.Bonus}}</em>
             </div>
             <i class="iconfont right fr"></i>
           </div>
         </li>
       </transition-group>
        <li :data-thisid="item.UserId" class="active" v-for="item in bonu_list_data"  @click="jump(item.UserId)">
          <div>
            <a class="headImg" href="#">
              <img :src="$store.getters.PhotoPath+item.UserPhoto" alt="">
            </a>
            <div class="right">
              <a href="#" style="color:#38f">{{item.Nickname?item.Nickname:item.UserName}}</a>
              <span>在{{item.LotteryName}}<br>喜中</span><em>￥{{item.Bonus}}</em>
            </div>
            <i class="iconfont right fr"></i>
          </div>
        </li>
    </ul>
</div>
</template>
<script>
  import loading from '../components/loading';
  export default {
    data() {
      return {
        bonu_list_data: [],
        bonu_list_data2:[],
        config: {
          firstPageNum: 10, //首屏渲染的数据量,直接渲染
          firstPageExt: 40, //首屏额外获取的数据量,存入cache
          timeInsert: 2000, //每隔timeInsert（毫秒）向上插入一条数据
          dataNum: 40, //每次拉取数据量
          height: 0, //每个li的高度，第一次渲染后获取
          listMax: 20, //渲染li的最大数量
          cache: [], //整个模块公用
          isFirst:true, //用来控制进入页面首次渲染的速度
          firstSpeed:1500 //进入页面拉取第一条的数据
        },
        li_arr:[],
        timeID:[],
        isDataNot:true  //加载动画，默认显示
      }
    },
    components:{
      'loading': loading
    },
    methods: {
      getData: function(Action, datanum, cb) {
        _fetch({
          Action,
          datanum
        }).then((data) => {
          if (data.Code === 1||data.Code === 0) {
            cb(data);
          } else {
            layer.msgWarn(data.StrCode)
          }
        })
      },
      //每隔time（毫秒），从cache中取第一条数据渲染至页面顶部。fn为渲染函数。
      renderInterval: function(time, fn) {
        this.timeID.push(setInterval(() => {
          //缓存的数据为空，返回
          if (!this.config.cache.length) {
            return;
          }
          let item = this.config.cache.shift() //把数据最前面的一条数据渲染推出来
          fn(item)
        }, time))
      },
       transitionShow : function(){
        let s = 0;                      // 用来记录高度
        return function(h, t, n, item){
          let perT = t/n;
          let perH = h/n;
          setTimeout(() => {
            if (s >= h) {
              this.bonu_list_data2.unshift(item)
              this.$el.childNodes[0].top=0
              s = 0;
              return;
            } else {
              s = s + perH
              //ulBody.css('top', s + 'px')
              this.$el.childNodes[0].top=s+"px"
              this.transitionShow(h, t, n, item)
            }
          }, perT)
        }
      }(),
      //每隔time(毫秒)，获取数据，并通过回调传出
      getCache: function(time, fn) {
        this.timeID.push(setInterval(() => {
          this.getData('GetNewestBonusList', this.config.dataNum, (d) => {
            let list = d.BackData.NewestBonusList;
            if (list) {
              fn(list);
            }
          })
        }, time))
      },
      jump:function(id){
        // let router=this.$router
        router.push({ path: '/playerHome',query:{ID:id}})
      }
    },
    beforeRouteLeave(to,from,next){
      for(var i=0;i<this.timeID.length;i++){
        clearInterval(this.timeID[i])
      }
      next()
    },
    created() {
      this.config.timePull = this.config.dataNum * this.config.timeInsert //每次拉取数据到cache的间隔
      this.config.cacheMax = this.config.dataNum * 2 //缓存容量上限为每次拉取数量 * 2
      //获取第一屏数据，并调用第一屏的渲染程序，以及启动
      this.getData('GetNewestBonusList', this.config.firstPageNum + this.config.firstPageExt, (data) => {
        let list = data.BackData.NewestBonusList
        this.bonu_list_data = list.splice(0, this.config.firstPageNum) //首屏用,将10条数据压入进去,然后渲染
        this.config.cache = list //缓存用
        this.isDataNot=false //关闭动画
        //首屏渲染完毕，开始启动定时渲染函数
        setTimeout(()=>{
          var cache=this.config.cache.shift()
         cache&&this.bonu_list_data2.unshift(cache)
          this.renderInterval(this.config.timeInsert, (item) => {
            this.transitionShow(this.config.height, 200, 60, item)
          })
        },this.config.firstSpeed)

          //启动定时获取数据函数
        this.getCache(this.config.timePull, (list) => {
          if (this.config.cache.length > this.config.cacheMax) {
            return
          }
          this.config.cache = this.config.cache.concat(list)
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
.list-enter-active{
  animation: bounce-in .5s;
}
@keyframes bounce-in {
  0% {
    height: 0px;
  }
}
@-moz-keyframes bounce-in {
  0% {
    height: 0px;
  }
}
@-webkit-keyframes bounce-in {
  0% {
    height: 0px;
  }
}
@-o-keyframes bounce-in {
  0% {
    height: 0px;
  }
}
.newWinner {
  position: relative;
  background: white;
  ul {
    font-size: 0.7em;
    position: absolute;
    width: 100%;
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    ;
    background: white;
    li {
      height: 4em;
      overflow: hidden;
      &>div {
        padding: 0.5em 0.8rem;
        border: none;
        background-image: linear-gradient(90deg, #d0d0d0, #d0d0d0 50%, transparent 50%);
        background-image: -webkit-linear-gradient(90deg, #d0d0d0, #d0d0d0 50%, transparent 50%);
        background-size: 100% 1px;
        background-repeat: no-repeat;
        background-position: top;
        span {
          line-height: 1.5em;
          height: 2.6em;
          overflow: hidden;
        }
      }
      &:last-child {
        margin-bottom: 3.6em;
      }
    }
  }
  img {
    width: 3em;
    height: 3em;
    border-radius: 50%;
  }
  .headImg {
    display: block;
    float: left;
    width: 3em;
  }
  .right {
    float: left;
    width: 10rem;
    padding: 0 1em;
    height: 2.8em;
    line-height: 1.5em;
    overflow: hidden;
    a {
      color: #0079ff;
    }
    em {
      color: #e80d2d;
    }
  }
  .iconfont {
    float: right;
    width: 1em;
    padding: 0;
    font-size: 1.1em;
    color: #ccc;
    text-align: right;
    line-height: 2.5em;
  }
}
.newWinner ul li:last-child{
  margin-bottom: 0px;
}
</style>
