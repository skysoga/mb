<template>
  <div class="main main-security">
    <table class="table-security">
      <tbody>
        <tr>
          <td>账户余额</td>
          <td><input class="cGold" type="text" readonly="readonly" :value="$store.state.UserBalance"></td>
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
            <input type="tel" v-va:Money tag="提现金额" v-model.trim="ArrData.Money" placeholder="请输入您要提现的金额">
          </td>
        </tr>
        <tr>
          <td>安全密码</td>
          <td>
            <form action="" autocomplete="off">
              <input type="password" v-va:SafePassword.Password tag="安全密码" v-model="ArrData.SafePassword" placeholder="请输入您的安全密码">
            </form>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN"><a v-if="ReGetTime>0" v-va-check>确定</a><span v-else>确定</span></div>
    <div class="tips-security">
      今天还可以提现<ins>{{ReGetTime}}</ins>次<br/>
      可提现金额={{WithdrawText}}<br/>
      单笔提现最低<ins>{{MinMoney}}</ins>元，最高<ins>{{MaxMoney}}</ins>元<br/>
      大发云保障玩家资金绝对安全，监管举报：dafatousu@gmail.com
    </div>
  </div>
</template>
<script src="../js/withdraw.js"></script>
<style lang="scss" scoped>
@import '../scss/FromTable.scss';
.bankTr{
  height:3.2em
}

/* 提现银行卡选择 */

.bankCardBox{
  height:3.2em;
  width:99%;
  padding:0 5%;
  padding-left:3%;
  overflow: hidden;
  position: absolute;
  top:0;
  left:-5%;
  z-index:9;
  .bankCard{
    // height:3.1em;
    line-height:1.5em;
    padding:.2em 0;
    img{
      float:left;
      margin:.1em .2em;
      margin-left:0;
      width:2.6em;
      height:2.6em;
    }
  }
  >p{
    text-align: center;
  }
  .hr1px:first-child{
    background-image:none;
  }
}
.bankCardBox.unfold{
  height:auto;
  // width:99%;
  background:#fff;
  box-shadow: 0px 0px 5px #888;
}
.bankCardBox+.unfold{
  top:1.1em;
}

</style>
