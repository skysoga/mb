<template>
  <div class="user-main personalInfo">
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
            <em v-if="!UserNickName">
              <input class="user-input" va-para="NickName"
                      v-va:NickName.vanow.canNull="[{reg:/^[\u4e00-\u9fa5]{1,5}$/}]"
                      regMsg="请使用五位以内的汉字"
                      tag="昵称"
                      type="text"
                      placeholder="请设置昵称">
            </em>
            <em v-else>{{UserNickName}}</em>
          </div>
        </li>
        <li><div><span>账号</span><em>{{$store.state.UserName}}</em></div></li>
    </ul>
    <ul>
        <li><div @click="!$store.state.UserMobile&&getUrl('Mobile')"><span>手机</span><i class="iconfont right"></i><em>{{$store.state.UserMobile||'未绑定'}}</em></div></li>
        <li><div @click="!$store.state.UserMail&&getUrl('Mail')"><span>邮箱</span><i class="iconfont right"></i><em>{{$store.state.UserMail||'未绑定'}}</em></div></li>
        <!-- <li>
        <div>
          <span>Q Q</span>
          <i class="iconfont right"></i>
          <em>
            <input class="user-input" v-va:QQ.vanow.canNull="[{reg:/^\d{5,12}$/}]"
                  regMsg="QQ号为5-12位数字"
                  va-para="QQ"
                  v-model="UserQQ"
                  tag="QQ号码" type="tel"
                  maxlength="12">
          </em>
        </div>
        </li> -->
        <li><div><span>性别</span><i class="iconfont right"></i><em>
            <select tag="性别" va-para="Sex" v-model="UserSex" v-va:Sex.vanow>
                <option value="2">保密</option>
                <option value="1">男</option>
                <option value="0">女</option>
            </select>
        </em></div></li>
        <li>
          <div>
            <span>生日</span>
            <i class="iconfont right"></i>
            <em>
            <input class="user-input" v-model="UserBirthDay"
                  tag="生日"
                  va-para="BirthDay"
                  type="date"
                  v-va:BirthDay.vanow>
            </em>
          </div>
        </li>
    </ul>
    <HeadImg-box v-show="HeadImgBoxShow"
                  :List="HeadImgBoxList"></HeadImg-box>
</div>
</template>
<script src="../js/personalInfo.js"></script>
