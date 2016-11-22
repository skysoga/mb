<template>
	<div class="main personalInfo">
    <ul>
        <li class="headImg"><div><span>头像</span><i class="iconfont right"></i><em><img src="<%imageserver%>/../system/common/headimg/defaultHeadImg.png" alt="" width="50" height="50"></em></div></li>
        <li><div><span>昵称</span><i class="iconfont right"></i><em><input name="NickName" type="text" placeholder="请设置昵称"></em></div></li>
        <li><div><span>账号</span><em></em></div></li>
        <!-- <li><div><span>头衔</span><em></em></div></li> -->
        <!-- <li><div><span>等级</span><em></em></div></li> -->
    </ul>
    <ul>
        <li><div><span>手机</span><i class="iconfont right"></i><em>未绑定</em></div></li>
        <li><div><span>邮箱</span><i class="iconfont right"></i><em>未绑定</em></div></li>
        <li><div><span>Q Q</span><i class="iconfont right"></i><em><input name="QQ" type="tel" maxlength="12"></em></div></li>
        <li><div><span>性别</span><i class="iconfont right"></i><em>
            <select name="Sex">
                <option value="2">保密</option>
                <option value="0">男</option>
                <option value="1">女</option>
            </select>
        </em></div></li>
        <li><div><span>生日</span><i class="iconfont right"></i><em><input value="1992-01-01" type="date" name="Birthday"></em></div></li>
    </ul>
    <div class="changeHeadImg">
        <div class="backShaw"></div>
        <div class="changeContent">
            <h3 class="line"><em>修改头像</em><a><i class="iconfont">&#xe61d;</i></a></h3>
            <div class="content">
                <em>预览</em>
                <img id='changePhoto' src="<%imageserver%>/../system/common/headimg/defaultHeadImg.png" alt="">
                <span></span>
                <div class="headImgListCon fix">
                    <span class="nomore"><i class="iconfont">&#xe60a;</i></span>
                    <div class="headImgList">
                        <div class="fixedHeadImgWidth fix">
                        </div>
                    </div>
                    <span><i class="iconfont">&#xe60e;</i></span>
                </div>
                <div class="changeBtn">
                    <a class="subBtn" href="javascript:;">保存头像</a>
                    <a class="subBtn cancel" href="javascript:;">取消</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script src="../js/personalInfo.js"></script>
<style lang="scss" scoped>
@import '../scss/personalinfo.scss'
</style>
