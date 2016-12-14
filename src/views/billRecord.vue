<template>
  <div class="main">
    <div class="textMore dataType" @click="BottomBoxShow=!BottomBoxShow"><em>{{top_text}}</em> <i class="iconfont"></i></div>
    <div class="" id="leftTabBox">
      <div class="hd">
          <ul>
            <li v-for="(x,index) in (isBetRecord?li_arr_obj1:li_arr_obj2)" :class="li_state==index?'on':null" @click="search(index)">{{x}}</li>
          </ul>
      </div>
      <div class="bd dontSelect">
        <div class="scrollBox" v-for="x in 3">
          <div class="touchScroll" @touchend="scroll(x-1)" v-if="li_state==x-1" ref="div">
            <template v-if="temp_ajax[newDay][x-1].DataCount===0">
              <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无记录</p></div>
            </template>
            <template v-else>
              <template v-if="x==1">
                <div class="" v-for="item in temp_ajax[newDay][x-1].res_data" :key="item">
                  <a class="active">
                    <div><p>{{item.TypeName}}</p><span>{{item.AddTime}}</span> </div>
                    <strong :class="check_money(item.InMoney,item.OutMoney)>0?'InMoney':'OutMoney'">{{check_money(item.InMoney,item.OutMoney)}}</strong>
                  </a>
                  <div class="hr1px"></div>
                </div>
              </template>
              <template v-if="x==2">
                <div class="" v-for="item in temp_ajax[newDay][x-1].res_data">
                  <a class="active">
                    <div><p>提现扣款</p><span>{{item.AddTime}}</span> </div>
                    <div class="fr">
                      <strong class="OutMoney">-{{item.OutMoney}}</strong>
                      <span class="fr">{{item.State}}</span>
                    </div>
                  </a>
                  <div class="hr1px"></div>
                </div>
              </template>
              <template v-if="x==3">
              <div class="" v-for="item in temp_ajax[newDay][x-1].res_data">
                <a class="active">
                  <div><p>{{item.TypeName}}</p><span>{{item.AddTime}}</span> </div>
                  <div class="fr"><strong class="InMoney">{{"+"+item.ApplyMoney}}</strong><span class="fr">{{item.State}}</span></div>
                </a>
                <div class="hr1px"></div>
              </div>
              </template>
              <div class="msg noMore" v-html="msg[temp_ajax[newDay][x-1].cant_scroll]" v-if="temp_ajax[newDay][x-1].cant_scroll<2"></div>
                <div class="msg noMore" v-else v-html="msg[temp_ajax[newDay][x-1].cant_scroll][newDay]"></div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <bottom-box v-show = "BottomBoxShow" :list = "BottomBoxList"></bottom-box>
  </div>
</template>
<script src="../js/recordCenter.js"></script>

<style lang="scss" scoped>
  @import '../scss/detailList.scss';
</style>
