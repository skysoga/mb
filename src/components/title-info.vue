<template>
	<header class="top">
    <span v-html="title||this.$route.meta.title">
    </span>
    <ul v-show="title||this.$route.meta.titleList">
    <router-link tag="li" v-for="i in this.$route.meta.titleList" :to="i.to"><a>{{i.title}}</a><router-link>
    </ul>
    <router-link v-show="link||this.$route.meta.link" :to="link||this.$route.meta.link||''" class="iconfont back"></router-link>
    <router-link  v-show="this.$route.meta.service" class="right" to="/service">客服{{this.route}}</router-link>
  </header>
</template>
