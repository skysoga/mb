<template>
	<div class="main">
    <table>
      <tbody>
        <tr>
          <td>选择银行</td>
          <td>
            <select v-va:BankID tag="银行" v-model="BankID">
              <option value="" >请选择银行</option>
              <option value="1">工商银行</option>
              <option value="2">建设银行</option>
              <option value="3">农业银行</option>
              <option value="4">民生银行</option>
              <option value="5">招商银行</option>
              <option value="6">交通银行</option>
              <option value="7">中国银行</option>
              <option value="8">邮政储蓄</option>
              <option value="9">中信银行</option>
              <option value="10">兴业银行</option>
              <option value="11">华夏银行</option>
              <option value="12">浦发银行</option>
              <option value="13">广发银行</option>
              <option value="14">平安银行</option>
              <option value="15">光大银行</option>
              <option value="17">农商银行</option>
            </select>
            <i class="iconfont unfold"></i>
          </td>
        </tr>
        <tr>
          <td>开户省</td>
          <td>
            <select v-va:Address_P tag="开户省" v-model="Address_P">
              <option value="" >请选择开户省份</option>
              <option :value="n.name" v-for="n in CityJson">{{n.name}}</option>
            </select>
            <i class="iconfont unfold"></i>
          </td>
        </tr>
        <tr>
          <td>开户市</td>
          <td>
            <select v-va:Address_C tag="开户市" v-model="Address_C">
              <option value="" >请选择开户城市</option>
              <option :value="x.name" v-for="x in CityFun" :selected="$index == 0 ? true : false">{{x.name}}</option>
            </select>
            <i class="iconfont unfold"></i>
          </td>
        </tr>
        <tr>
          <td>开户人姓名</td>
          <td>
            <input type="text" v-va:RealName tag="开户人姓名" v-model.trim="RealName" value="" placeholder="请输入银行卡的姓名">
          </td>
        </tr>
        <tr>
          <td>银行卡号</td>
          <td>
            <input type="tel" v-va:BankNum tag="银行卡号" v-model.trim="BankNum" value="" placeholder="请输入银行卡的卡号">
          </td>
        </tr>
        <tr>
          <td>确认卡号</td>
          <td>
            <input type="tel" v-va:checkBankNum.BankNum = "[{'equal':'BankNum'}]" tag="确认卡号" value=""  placeholder="请再次输入银行卡号">
          </td>
        </tr>
        <tr>
          <td>安全密码</td>
          <td>
            <input type="password" v-va:SafePassword="[{reg:/^\d{6}$/}]" v-model.trim="SafePassword" tag="安全密码"  placeholder="请输入您的安全密码">
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN"><a v-va-check>提交</a></div>
  </div>
</template>
<script src="../js/setBankcard.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>

