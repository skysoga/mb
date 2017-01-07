<template>
	<header class="top" v-show="!m.hide">
    <span v-show="s.turning"  v-html="s.tpl.load+'加载中...'"></span>
    <template v-if="!s.turning">
      <span v-html="m.title">
      </span>
      <ul v-if="m.titleList">
        <li :class="($route.path===i.to||$route.matched[0].path===i.to)?'on':''" v-for="i in m.titleList" v-on:click="$router.push(i.to)"><a>{{i.title}}</a><li>
      </ul>
    </template>
    <div v-show="m.back" class="iconfont back" v-on:click="$router.go(m.back)"></div>
    <router-link v-show="m.link" :to="m.link||''" class="iconfont back"></router-link>
    <router-link  v-show="m.service&&s.SiteConfig" class="right" to="/service">客服</router-link>
  </header>
</template>
<script>
  export default {
    props:["m","s"],
  }
</script>
<style>
  .top svg{
    fill:#fff;
    vertical-align: middle;
    width: 1.3em;
    margin-top: -0.25em;
  }
</style>
