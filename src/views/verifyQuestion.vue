<template>
	<div class="main">
    <table>
      <tbody>
        <tr>
          <td>问题一</td>
          <td>
            <!-- <input class="input" placeholder="点击选择密保问题" /> -->
            <select v-model="question1">
                <option :value="n.Id" v-for="n in Questions">{{n.Question}}</option>
            </select>
            <i class="iconfont">&#xe601;</i>
          </td>
        </tr>
        <tr>
          <td>答案</td>
          <td><input class="input" type="text" v-model="answer1" placeholder="请输入答案" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <table>
      <tbody>
        <tr>
          <td>问题二</td>
          <td>
            <!-- <input class="input" placeholder="点击选择密保问题" /> -->
            <select v-model="question2">
               <option :value="x.Id" v-for="x in Questions">{{x.Question}}</option>
            </select>
            <i class="iconfont">&#xe601;</i>
          </td>
        </tr>
        <tr>
          <td>答案</td>
          <td><input class="input" type="text" v-model="answer2" placeholder="请输入答案" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN"><a @click="postBtn">确定</a></div>
  </div>
</template>
<script src="../js/verifyQuestion.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>
