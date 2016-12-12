<template>
  <div class="main rebateDes" style="padding-bottom:0">
    <div class="testShow" v-show="ArrObj&&BetweenType=='SSC'"><i class="iconfont">&#xe624;</i>时时彩是基数2元一注的奖金模式，奖金÷2换算成赔率。</div>
    <div class="rebateContent fix">
      <template v-if="ArrObj">
        <ul class="rebateTitle">
          <li><i>玩法</i><span></span><em>返点</em></li>
          <li v-for="n in ArrObj.Mode">{{n}}</li>
        </ul>
        <div class="rebateTableCon">
          <div class="rebateTable fix" :style="theWidth">
            <ul v-for="n in ArrObj.Data">
              <li v-for="(x,index) in n">{{setMsg(BetweenType,index)+x}}</li>
            </ul>
          </div>
        </div>
      </template>
      <div v-else>
        <div class='fullPageMsg'>
            <div class='fullPageIcon iconfont'>&#xe63c;</div>
            <p>功能完善中，将于近期添加完成！</p>
          </div>
      </div>
    </div>
    <div class='textMore dataType' @click="BottomBoxShow=true"><em>{{BottomBoxList[BetweenType]}}</em>
    <i class='iconfont'>&#xe601;</i></div>
    <bottom-box v-show = "BottomBoxShow"
                 :list = "BottomBoxList"
                 ></bottom-box>
  </div>
</template>
<script src="../js/rebateDes.js"></script>
<style lang='scss' scoped>
@import '../scss/rebateDes.scss';
  .rebateDes{
    background: white;
    height: 100%
  }
  .testShow{
    color:#999;
    font-size: .6em;
    padding: 0 .6em;
  }
</style>
