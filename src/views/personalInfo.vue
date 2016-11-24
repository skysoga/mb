<template>
	<div class="main personalInfo">
    <ul>
        <li class="headImg" @click="HeadImgBoxShow=true">
          <div>
            <span>头像</span>
            <i class="iconfont right"></i>
            <em><img :src="$store.getters.PhotoPath+$store.state.UserPhoto" alt="" width="50" height="50"></em>
          </div>
        </li>
        <li>
          <div>
            <span>昵称</span>
            <i class="iconfont right"></i>
            <em v-if="!$store.state.NickName">
              <input  va-para="NickName"
                      v-va:NickName.vanow.canNull="[{reg:/^[\u4e00-\u9fa5]{0,5}$/}]"
                      tag="昵称"
                      :value="$store.state.NickName"
                      type="text"
                      placeholder="请设置昵称">
            </em>
            <em v-else>{{$store.state.NickName}}</em>
          </div>
        </li>
        <li><div><span>账号</span><em>{{$store.state.UserName}}</em></div></li>
    </ul>
    <ul>
        <li><div><span>手机</span><i class="iconfont right"></i><em>{{$store.state.UserMobile||'未绑定'}}</em></div></li>
        <li><div><span>邮箱</span><i class="iconfont right"></i><em>{{$store.state.UserMail||'未绑定'}}</em></div></li>
        <li><div><span>Q Q</span><i class="iconfont right"></i><em><input v-va:QQ.vanow.canNull="[{reg:/^\d{5,12}$/}]" va-para="QQ" :value="$store.state.UserQQ" tag="QQ号码" type="tel" maxlength="12"></em></div></li>
        <li><div><span>性别</span><i class="iconfont right"></i><em>
            <select name="Sex" tag="性别">
                <option value="2">保密</option>
                <option value="0">男</option>
                <option value="1">女</option>
            </select>
        </em></div></li>
        <li><div><span>生日</span><i class="iconfont right"></i><em><input value="1992-01-01" tag="生日" type="date" name="Birthday"></em></div></li>
        <li><div class="BTN"><a v-va-check>提交</a></div></li>
    </ul>
    <HeadImg-box v-show="HeadImgBoxShow"
                 :list = "HeadImgBoxList"
                 ></HeadImg-box>
</div>
</template>
<script src="../js/personalInfo.js"></script>
<style lang="scss" scoped>
@import '../scss/personalinfo.scss'
</style>
