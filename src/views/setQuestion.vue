<template>
	<div class="main">
    <table>
      <tbody>
        <tr>
          <td>问题一</td>
          <td>
            <!-- <input class="input" placeholder="点击选择密保问题" /> -->
            <select name="question1">
              <option value="">点击选择密保问题</option>
            </select>
            <i class="iconfont">&#xe601;</i>
          </td>
        </tr>
        <tr>
          <td>答案</td>
          <td><input class="input" type="text" name="answer1" placeholder="请输入答案" /></td>
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
            <select name="question2">
              <option value="">点击选择密保问题</option>
            </select>
            <i class="iconfont">&#xe601;</i>
          </td>
        </tr>
        <tr>
          <td>答案</td>
          <td><input class="input" type="text" name="answer2" placeholder="请输入答案" /></td>
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
            <select name="question3">
              <option value="">点击选择密保问题</option>
            </select>
            <i class="iconfont">&#xe601;</i>
          </td>
        </tr>
        <tr>
          <td>答案</td>
          <td><input class="input" type="text" name="answer3" placeholder="请输入答案" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN"><a>确定</a></div>
  </div>
</template>
<script src="../js/setQuestion.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>
