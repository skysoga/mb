<template>
	<div class="main">
    <div class="innerWrap">
        <div class="surperise active ">
            <a class="wrap line" href="/dailyPrise.html">
                <div class="number"><i>1</i></div>
                <div class="text">
                    <strong>每日加奖</strong>
                    <p>根据会员昨日投注总额进行奖励</p>
                </div>
                <i class="iconfont right fr"></i>
            </a>
        </div>

        <div class="surperise active">
            <a class="wrap line" href="/upgrade.html">
                <div class="number"><i>2</i></div>
                <div class="text">
                    <strong>晋级奖励</strong>
                    <p>会员每晋升一个等级，都能获得奖励</p>
                </div>
                <i class="iconfont right fr"></i>
            </a>
        </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../scss/activity.scss';
  .active .number{
        width: 2em;
        height: 2em;
        border-radius: 50%;
        background: #fe8580;
        float: left;
        margin-left: .8rem;
        margin-right: .5rem;
        text-align: center;
    }
    .active .number i{
        font-style: inherit;
        color: white;
        text-align: center;
        display: inline-block;
        line-height: 1.3em;
        width: 1.5em;
        height: 1.5em;
        border: 1px solid;
        border-radius: 50%;
        font-size: 0.8em;
        margin-top: 0.5em;
        padding: 0.1em;
    }
    .innerWrap .surperise:nth-child(6n+3) .number{
        background: #2ed57b;
    }
</style>