<template>
  <div class="main">
    <table>
      <tbody>
        <!-- 验证登录密码 -->
        <template v-if="isType=='Login'">
          <tr>
          <td>验证密码</td>
          <td><input class="input" type="password" tag="登录密码" v-va:Password  v-model.trim="Password" placeholder="请输入当前所使用的登录密码" /></td>
          </tr>
        </template>
        <!-- 验证银行卡 -->
        <template v-if="isType=='Bank'&&$store.state.UserFirstCardInfo">
        <tr>
          <td>银行卡号</td>
          <td class = "_bankcardNum">{{$store.state.UserFirstCardInfo[0].CardNum}}</td>
        </tr>
        <tr>
          <td>银行账户</td>
          <td class = "_realname">{{$store.state.UserFirstCardInfo[0].RealName}}</td>
        </tr>
        <tr>
          <td>确认卡号</td>
          <td>
            <input type="tel" v-va:BankNum tag="确认卡号" value="" v-model.trim="BankNum" placeholder="请输入完整卡号">
          </td>
        </tr>        
        <tr>
          <td>确认户名</td>
          <td>
            <input type="RealName" v-va:RealName tag="确认户名" v-model.trim="RealName" placeholder="请输入完整户名">
          </td>
        </tr>
        </template>
        <!-- 图片验证 -->
        <template v-if="isType=='Photo'">
        <tr>
          <td colspan="2"><uploadimg :type="'Image1'" title="图片1"/></td>
        </tr>
        <tr>
          <td colspan="2"><uploadimg :type="'Image2'" title="图片2"/></td>
        </tr>
        </template>
        <!-- 验证结束 -->
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN"><a v-va-check>确定</a></div>
    <div class="tips" v-show="isType=='Bank'">
      为确定是本人操作，人工审诉-找回安全密码时需要验证首张银行卡信息。
    </div>
  </div>
</template>
<script src="../js/ArtificialAppeal.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>