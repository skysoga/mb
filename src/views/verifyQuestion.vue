<template>
  <div class="main main-security">
    <table class="table-security">
      <tbody>
        <tr>
          <td>问题一</td>
          <td>
            <select v-model="question1" v-va:question1 = "[{unique:true}]" tag="问题一">
                <option :value="n.Id" v-for="n in Questions">{{n.Question}}</option>
            </select>
            <i class="iconfont">&#xe601;</i>
          </td>
        </tr>
        <tr>
          <td>答案</td>
          <td><input class="input" type="text" v-va:answer1 tag="答案" v-model.trim="answer1" placeholder="请输入答案" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <table class="table-security">
      <tbody>
        <tr>
          <td>问题二</td>
          <td>
            <select v-model="question2" v-va:question2 = "[{unique:true}]" tag="问题二">
               <option :value="x.Id" v-for="x in Questions">{{x.Question}}</option>
            </select>
            <i class="iconfont">&#xe601;</i>
          </td>
        </tr>
        <tr>
          <td>答案</td>
          <td><input class="input" type="text" v-va:answer1 tag="答案" v-model.trim="answer2" placeholder="请输入答案" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN"><a v-va-check>确定</a></div>
  </div>
</template>
<script src="../js/verifyQuestion.js"></script>
<style lang="scss" scoped>
  @import '../scss/FromTable.scss';
</style>
