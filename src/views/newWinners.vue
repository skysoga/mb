<template>
	<div class="newWinner">
    <ul>
			<transition-group name="list">
    		<li :data-thisid="item.Id" class="active" v-for="item in bonu_list_data" :key="item">
    		<div>
	    		<a class="headImg" href="#">
	    			<img :src="$store.getters.PhotoPath+item.UserPhoto" alt="">
	    		</a>
	    		<div class="right">
	    			<a href="#" style="color:#38f">{{item.UserName?item.UserName:item.Nickname}}</a>
	    		  <span>在{{item.LotteryName}}<br>喜中</span><em>￥{{item.Bonus}}</em>
	    		</div>
	    		<i class="iconfont right fr"></i>
    		</div>
    	</li>
		</transition-group>
		</ul>
</div>
</template>
<script>
	export default {
		data () {
			return {
				bonu_list_data:[],
				config : {
			    firstPageNum: 10, //首屏渲染的数据量,直接渲染
			    firstPageExt: 40,  //首屏额外获取的数据量,存入cache
			    timeInsert:3000,  //每隔timeInsert（毫秒）向上插入一条数据
			    dataNum:40,        //每次拉取数据量
			    height:0,         //每个li的高度，第一次渲染后获取
			    listMax:20,       //渲染li的最大数量
			    cache:[]          //整个模块公用
			  },
			 newOneData:""
			}
		},
		methods:{
			getData:function(action,datanum,cb){
				_fetch({action,datanum}).then((res)=>{
					if(res.ok){
						res.json().then((data)=>{
							if(data.Code===1){
							  cb(data);
							}else{
								console.log("return error");
							}
						})
					}else{
						console.log("request error");
					}
				})
			},
			  //每隔time（毫秒），从cache中取第一条数据渲染至页面顶部。fn为渲染函数。
			renderInterval:function(time,fn){
				setInterval(()=>{
				//缓存的数据为空，返回
					if(!this.config.cache.length){
						return;
					}
					let item = this.config.cache.shift();//把数据最前面的一条数据渲染推出来
					fn(item)
				},time)
			},
			transitionShow:function(h, t, n, item){
		    let s = 0;         // 用来记录高度
				let perT = t/n;
	      let perH = h/n;
	      setTimeout(()=>{
	        if(s >= h){
	          //ulBody.prepend(item).css('top', '0px')
						this.bonu_list_data.unshift(item)
						this.$el.childNodes[0].style.top="0px"
	          s = 0;
	          return;
	        }else{
	          s = s + perH;
	          //ulBody.css('top', s + 'px')
						this.$el.childNodes[0].style.top=$+"px"
	          this.transitionShow(h,t,n,item)
	        }
	      }, perT)
		  },
			//每隔time(毫秒)，获取数据，并通过回调传出
		  getCache:function(time, fn){
		    setInterval(()=>{
		      this.getData('GetNewestBonusList' ,this.config.dataNum ,(d)=>{
		        let list = d.BackData.NewestBonusList;
		        if(list){
		          fn(list);
		        }
		      })
		    }, time)
		  }
		},
	 	created(){
		this.config.timePull =  this.config.dataNum * this.config.timeInsert;  //每次拉取数据到cache的间隔
	  this.config.cacheMax = this.config.dataNum * 2;                   //缓存容量上限为每次拉取数量 * 2
		//获取第一屏数据，并调用第一屏的渲染程序，以及启动
		this.getData('GetNewestBonusList', this.config.firstPageNum + this.config.firstPageExt,(data)=>{
				 let list = data.BackData.NewestBonusList;
				 this.bonu_list_data = list.splice(0,this.config.firstPageNum);    //首屏用,将10条数据压入进去,然后渲染
				 this.config.cache = list;     //缓存用
				 //首屏渲染完毕，开始启动定时渲染函数
				 this.renderInterval(this.config.timeInsert,(item)=>{
				 		this.transitionShow(this.config.height, 200, 60, item)
				 })
				 //启动定时获取数据函数
         this.getCache(this.config.timePull,(list)=>{
            if(this.config.cache.length >this.config.cacheMax){
              return;
            }
            this.config.cache = this.config.cache.concat(list)
         });
		})
	 }
	}
</script>
<style lang="scss" scoped>
  @import '../scss/newwinners.scss';
  @import '../scss/personalinfo.scss';
	/*.list-enter-active, .list-leave-active {
  	transition: all 1s;
		transform: translateY(0px);
	}
	.list-enter, .list-leave-active {
	  opacity: 0;
	  transition:all 1s;
		transform: translateY(30px);
	}*/
</style>
