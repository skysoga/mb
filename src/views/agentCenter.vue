<template>
	<div class="main">
  </div>
</template>
<script src="../js/activity.js"></script>
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
