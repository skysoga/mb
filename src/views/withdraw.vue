<template>
  <div class="main">
    <table>
      <tbody>
        <tr>
          <td>账户余额</td>
          <td><input class="cGold" type="text" readonly="readonly" :value="UserBalance"></td>
        </tr>
        <tr>
          <td>可提金额</td>
          <td><input class="cGold" type="text" readonly="readonly" :value="UserAvail"></td>
        </tr>
        <tr class="bankTr">
          <td>提现账户<input type="hidden" name="BankCardID"></td>
          <td>
            <div :class="{bankCardBox:true,unfold:isShow}" @click.stop="toggle">
              <template v-for="(n,index) in UserBankList">
                <div class="hr1px"></div>
                <div class="bankCard" @click="setCard(UserBankList[index],n.BankCardID)">
                  <img :src="$store.state.constant.ImgHost+'/system/common/bank/'+bankArr[n.BankName]+'.png'">
                  <p>{{n.BankName}}</p>
                  <span>{{n.CardNum}}</span>
                </div>
              </template>
              <p>请选择您要提现的银行卡</p>
            </div>
            <i class="iconfont unfold"></i>
          </td>
        </tr>
        <tr>
          <td>提现金额</td>
          <td>
            <input type="tel" v-va:Money tag="提现金额" v-model="ArrData.Money" placeholder="请输入您要提现的金额">
          </td>
        </tr>
        <tr>
          <td>安全密码</td>
          <td>
            <input type="password" v-va:SafePassword.Password tag="安全密码" v-model="ArrData.SafePassword" placeholder="请输入您的安全密码">
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN"><a v-if="ReGetTime>0" v-va-check>提交</a><span>提交</span></div>
    <div class="tips">
      今天还可以提现<ins>{{ReGetTime}}</ins>次<br/>
      可提现金额=有效投注×3(此项需达到充值金额的30%才计入)+奖金+活动礼金<br/>
      单笔提现最低<ins>{{MinMoney}}</ins>元，最高<ins>{{MaxMoney}}</ins>元
    </div>
  </div>
</template>
<script src="../js/withdraw.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss'
</style>
