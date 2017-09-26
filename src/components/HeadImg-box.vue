<!--
组件名称：头像设置组件
使用说明：
引入方式：import HeadImgbox from '../components/HeadImg-box'
组件显示与关闭:HeadImgBoxShow=true|false
列表：list
关闭事件:@click="close"
父组件绑定：
<HeadImg-box v-show="HeadImgBoxShow"
                 :list = "HeadImgBoxList"
                 ></HeadImg-box>
-->
<template>
  <div class="_changeHeadImg" v-show="this.$parent.HeadImgBoxShow">
    <div class="backShaw"></div>
      <div class="changeContent">
      <h3 class="line"><em>修改头像</em><a><i class="iconfont" @click="close">&#xe61d;</i></a></h3>
      <div class="content">
        <em>预览</em>
        <img id="changePhoto"
              :src="$store.getters.PhotoPath+(this.$parent.DefaultPhoto||List[0].ImageUrl)"
              alt=""
              :title="this.$parent.DefaultID||List[0].ID">
        <span>{{this.$parent.DefaultName}}</span>
        <div class="headImgListCon fix">
            <span class="nomore"><i class="iconfont"></i></span>
            <div class="headImgList">
                <div class="fixedHeadImgWidth fix" :style="'width:'+List.length*3+'rem'">
                  <img v-for="n in List"
                      :data-id="n.ID"
                      :title="n.ImageName"
                      :src="$store.getters.PhotoPath+n.ImageUrl"
                      @click="getImg(n.ID,n.ImageUrl,n.ImageName)">
                </div>
            </div>
            <span><i class="iconfont"></i></span>
        </div>
        <div class="changeBtn">
            <a class="subBtn" href="javascript:;" @click="this.$parent.upHeadImg">保存头像</a>
            <a class="subBtn cancel" @click="close">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  props:['List'],
  methods:{
    close(){
      this.$parent.HeadImgBoxShow = false
    },
    getImg(id,url,name){
      this.$parent.DefaultID=id
      this.$parent.DefaultPhoto=url
      this.$parent.DefaultName=name
    }
  },
  mounted(){
    this.$parent.setDefImg()
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/personalinfo.scss'
</style>
