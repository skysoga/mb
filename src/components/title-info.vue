<template>
	<header class="top">
    <span v-html="meta.title">
    </span>
    <ul v-show="meta.titleList">
    <router-link tag="li" v-for="i in meta.titleList" :to="i.to"><a>{{i.title}}</a><router-link>
    </ul>
    <router-link v-show="meta.link" :to="meta.link||''" class="iconfont back"></router-link>
    <router-link  v-show="meta.service" class="right" to="/service">客服</router-link>
  </header>
</template>
<script>
  export default {
    props:["meta"]
  }
</script>