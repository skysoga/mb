<template>
	<div class="main">
    <table>
      <tbody>
        <tr>
          <td>问题一</td>
          <td>
            <!-- <input class="input" placeholder="点击选择密保问题" /> -->
            <select v-model="question1" v-va:question1.unique tag="问题一">
              <option value="">点击选择密保问题</option>
              <option :value="n.Question_Id" v-for="n in Questions">{{n.Question}}</option>
            </select>
            <i class="iconfont">&#xe601;</i>
          </td>
        </tr>
        <tr>
          <td>答案</td>
          <td><input class="input" type="text" v-model.trim="answer1" placeholder="请输入答案" /></td>
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
            <select v-model="question2" v-va:question2.unique  tag = "问题2">
              <option value="">点击选择密保问题</option>
              <option :value="n.Question_Id" v-for="n in Questions">{{n.Question}}</option>
            </select>
            <i class="iconfont">&#xe601;</i>
          </td>
        </tr>
        <tr>
          <td>答案</td>
          <td><input class="input" type="text" v-model.trim="answer2" placeholder="请输入答案" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <table>
      <tbody>
        <tr>
          <td>问题三</td>
          <td>
            <!-- <input class="input" placeholder="点击选择密保问题" /> -->
            <select v-model="question3">
              <option value="">点击选择密保问题</option>
              <option :value="n.Question_Id" v-for="n in Questions">{{n.Question}}</option>
            </select>
            <i class="iconfont">&#xe601;</i>
          </td>
        </tr>
        <tr>
          <td>答案</td>
          <td><input class="input" type="text" v-model.trim="answer3" placeholder="请输入答案" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN"><a v-va-check>确定</a></div>
  </div>
</template>
<script src="../js/setQuestion.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>
