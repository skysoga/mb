<template>
	<header class="top" v-show="!meta.hide">
    <span v-show="$store.state.turning"  v-html="$store.state.tpl.load+'加载中...'"></span>
    <template v-if="!$store.state.turning">
      <span v-html="meta.title">
      </span>
      <ul v-if="meta.titleList">
        <li :class="($route.path===i.to||$route.matched[0].path===i.to)?'on':''" v-for="i in meta.titleList" v-on:click="$router.push(i.to)"><a>{{i.title}}</a><li>
      </ul>
    </template>
    <div v-show="meta.back" class="iconfont back" v-on:click="$router.go(meta.back)"></div>
    <router-link v-show="meta.link" :to="meta.link||''" class="iconfont back"></router-link>
    <router-link  v-show="meta.service" class="right" to="/service">客服</router-link>
  </header>
</template>
<script>
  export default {
    props:["meta"],
  }
</script>
<style>
  .top svg{
    fill:#fff;
    vertical-align: middle;
    width: 1.3em;
    margin-top: -0.1em;
  }
</style>
