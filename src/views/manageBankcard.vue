<template>
  <div class="main manageBankcard" data="">
    <div class="innerWrap">
      <div class="surperise" v-if="$store.state.UserBankCardList">
        <div class="wrap" v-for="n in $store.state.UserBankCardList">
          <img class="fl" :src="$store.state.constant.ImgHost+'/system/common/bank/'+setImg(n.BankName)">
          <div class="text">
            <strong>{{n.BankName}}</strong>
            <p>尾号：*********{{n.CardNum.substr(-4)}}</p>
          </div>
          <div class="fr">
              <a v-if="n.isLock">已锁定</a>
              <router-link v-if="!n.isLock" class="modify" :to="'setBankcard?Q='+n.BankCardID">修改</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="BTN" v-if="!FiveUnlok"><a href="javascript:void(0);" @click="setCard">添加银行卡</a></div>
    <div class="tips" v-html="tipHtml"></div>
  </div>
</template>
<script src="../js/manageBankcard.js"></script>
<style lang="scss" scoped>
  @import '../scss/bindcard.scss';
</style>
