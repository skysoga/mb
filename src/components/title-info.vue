<template>
	<header class="top">
    <span v-html="this.$route&&this.$route.meta.title"></span>
    <router-link v-show="this.$route&&this.$route.meta.link" :to="this.$route&&this.$route.meta.link||''" class="iconfont back"></router-link>
    <router-link  v-show="this.$route&&this.$route.meta.service" class="right" to="/service">客服{{this.route}}</router-link>
  </header>
</template>