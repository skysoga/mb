<template>
  <div class="main main-security main-form">
    <table class="table-form table-security">
      <tbody>
        <tr>
          <td>问题一</td>
          <td>
            <!-- <input class="input" placeholder="点击选择密保问题" /> -->
            <select v-model="question1" v-va:question1 = "[{unique:true}]" tag="问题一">
              <option value="">点击选择密保问题</option>
              <option :value="n.Question_Id" v-for="n in Questions">{{n.Question}}</option>
            </select>
            <i class="iconfont">&#xe601;</i>
          </td>
        </tr>
        <tr>
          <td>答案</td>
          <td><input class="input" type="text" v-va:answer1 tag="答案"  v-model.trim="answer1" placeholder="请输入答案" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <table class="table-form table-security">
      <tbody>
        <tr>
          <td>问题二</td>
          <td>
            <!-- <input class="input" placeholder="点击选择密保问题" /> -->
            <select v-model="question2" v-va:question2= "[{unique:true}]" tag = "问题二">
              <option value="">点击选择密保问题</option>
              <option :value="n.Question_Id" v-for="n in Questions">{{n.Question}}</option>
            </select>
            <i class="iconfont">&#xe601;</i>
          </td>
        </tr>
        <tr>
          <td>答案</td>
          <td><input class="input" type="text" v-va:answer2 tag="答案" v-model.trim="answer2" placeholder="请输入答案" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <table class="table-form table-security">
      <tbody>
        <tr>
          <td>问题三</td>
          <td>
            <!-- <input class="input" placeholder="点击选择密保问题" /> -->
            <select v-model="question3" v-va:question3 = "[{unique:true}]" tag = "问题三">
              <option value="">点击选择密保问题</option>
              <option :value="n.Question_Id" v-for="n in Questions">{{n.Question}}</option>
            </select>
            <i class="iconfont">&#xe601;</i>
          </td>
        </tr>
        <tr>
          <td>答案</td>
          <td><input class="input" type="text" v-va:answer3 tag="答案"  v-model.trim="answer3" placeholder="请输入答案" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <table class="table-form table-security">
      <tbody>
      <tr>
        <td>安全密码</td>
        <td>
          <form action="" autocomplete="off">
            <input type="password" v-va:SafePassword.Password tag="安全密码" v-model="SafePassword" placeholder="请输入您的安全密码">
          </form>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="loginBtn BTN BTN-form"><a v-va-check>确定</a></div>
  </div>
</template>
<script src="../js/setQuestion.js"></script>