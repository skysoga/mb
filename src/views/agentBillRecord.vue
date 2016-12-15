<template>
<div class="main">
    <div class="textMore dataType" @click="BottomBoxShow=!BottomBoxShow"><em>{{top_text}}</em> <i class="iconfont"></i></div>
  <div class="searchBtn">
    <div class="searchCon">
      <input class="proxySearch" type="text" placeholder="下级交易查询" v-model.lazy="temp_name">
    </div>
    <a id="submitBtn">
      <div class="submitTouch" @click="search(li_state)"><i class="iconfont"></i></div>
    </a>
  </div>
  <div class="" id="leftTabBox">
    <div class="hd">
      <ul>
        <li v-for="(x,index) in (isAgentBetRecord?li_arr_obj1:li_arr_obj2)" :class="li_state==index?'on':null" @click="search(index)">{{x}}</li>
      </ul>
    </div>
    <div class="bd dontSelect">
      <div class="scrollBox" v-for="x in 3">
        <div class="touchScroll" @touchend="scroll(x-1)" v-if="li_state==x-1" ref="div">
          <template v-if="temp_ajax[newName+'%'+newDay][x-1].DataCount===0">
          <div class='fullPageMsg'>
            <div class='fullPageIcon iconfont'>&#xe63c;</div>
            <p>暂无记录</p>
          </div>
          </template>
              <template v-else>
                  <template v-if="x==1">
                  <div class="" v-for="item in temp_ajax[newName+'%'+newDay][x-1].res_data">
                    <a class="active">
                      <div><p>{{item.UserName}}</p><span>{{item.AddTime}}</span> </div>
                      <div class="fr">
                        <strong :class="check_money(item.InMoney,item.OutMoney)>0?'InMoney':'OutMoney'">{{check_money(item.InMoney,item.OutMoney)}}</strong>
                        <span class="fr">{{item.TypeName}}</span>
                      </div>
                    </a>
                    <div class="hr1px"></div>
                  </div>
                </template>
                <template v-if="x==2">
                <div class="" v-for="item in temp_ajax[newName+'%'+newDay][x-1].res_data">
                  <a class="active">
                    <div>
                      <p>{{item.UserName}}<span>￥{{item.BetMoney}}</span></p><span>{{item.AddTime}}</span></div>
                    <div class="fr" v-if="Number(item.State)"><strong class="InMoney fr">+{{item.State}}</strong><span class="InMoney fr">已中奖</span></div>
                    <strong class="" v-else>{{item.State}}</strong>
                  </a>
                  <div class="hr1px"></div>
                </div>
                </template>
                <template v-if="x==3">
                <div class="" v-for="item in temp_ajax[newName+'%'+newDay][x-1].res_data">
                  <a class="active">
                    <div><p>{{item.UserName}}</p><span>{{item.AddTime}}</span> </div>
                    <div class="fr"><div class="fr"><strong class="InMoney" v-if="Number(item.InMoney)">+{{item.InMoney}}</strong>
                      <strong class="InMoney" v-else>+{{item.ApplyMoney}}</strong>
                      <span class="fr">{{item.State}}</span></div> </div>
                  </a>
                  <div class="hr1px"></div>
                </div>
                </template>
                <div class="msg noMore" v-html="msg[temp_ajax[newName+'%'+newDay][x-1].cant_scroll]" v-if="temp_ajax[newName+'%'+newDay][x-1].cant_scroll<2"></div>
                  <div class="msg noMore" v-else v-html="msg[temp_ajax[newName+'%'+newDay][x-1].cant_scroll][newDay]"></div>
              </template>
            </div>
          </div>
        </div>
    </div>
    <bottom-box v-show = "BottomBoxShow" :list = "BottomBoxList"></bottom-box>
  </div>
</template>

<script src="../js/detailCenter.js"></script>

<style lang="scss" scoped>@import '../scss/detailList.scss';</style>
