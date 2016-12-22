<template>
	<div class="main" style="padding-bottom: 0;">
  <datatype></datatype>
<div class="searchBtn">
    <div class="searchCon">
      <input class="proxySearch" type="text" v-model="UserName" placeholder="下级报表查询">
    </div>
    <a id="submitBtn" @click="doSearch">
      <div class="submitTouch"><i class="iconfont">&#xe60e;</i></div>
    </a>
    </div>
    <div class="fullLoading" id="PageLoading" v-show="isDataNot">
      <div class="loadingCell">
        <div class="iconLoadingCon">
          <span class="iconLoadingText">&#xe647;</span>
          <div class="iconLoadingMove"></div>
        </div>
      </div>
    </div>
    <div class="proxy3colCon" id="proxy3colCon" v-show="!isDataNot">
      <ul class="PLSdetail fix">
          <li v-for="(key,value) in Datalist" v-if="key"><span>{{setNum(key)}}</span>{{NameFun(value)}}</li>
          <li v-for="n in listNum"></li>
      </ul>
    </div>
</div>
</template>
<script src="../js/agentReport.js"></script>
<style lang="scss" scoped>
  @import '../scss/personalinfo.scss'
</style>
