<template>
	<div class="main manageBankcard" data="">
    <div class="innerWrap">
      <div class="surperise">
        <div class="wrap" v-for="n in $store.state.UserBankCardList">
          <img class="fl" :src="$store.state.constant.ImgHost+'/system/common/bank/'+setImg(n.BankName)">
          <div class="text">
            <strong>{{n.BankName}}</strong>
            <p>尾号：*********{{n.CardNum.substr(-4)}}</p>
          </div>
          <div class="fr">
              <a v-if="n.IsUnlok">已锁定</a>
              <router-link v-if="!n.IsUnlok" class="modify" :to="'setBankcard?id='+n.BankCardID">修改</router-link>
              <a v-else>修改</a>
          </div>
        </div>

      </div>
    </div>
    <div class="BTN" v-if="!FiveUnlok"><a href="javascript:void(0);" @click="setCard">添加银行卡</a></div>
    <div class="tips" v-html="tipHtml"></div>
  </div>
  <!-- 以下注释内容是其他状态需要使用的 -->
  <!-- <p>您的银行卡已经锁定，不能进行银行卡信息的增加和删除</p>
  <a class="alink" href="/service">联系客服</a>
  <div class="tips">
    您已绑定张银行卡，一共可以绑定5张银行卡。成功提现的银行卡会被锁定，无法删除和修改。
  </div>
  <div class="tips">
    您尚未绑定银行卡，一共可以绑定5张银行卡。
  </div> -->
</template>
<script src="../js/manageBankcard.js"></script>
<style lang="scss" scoped>
  @import '../scss/bindcard.scss';
</style>
