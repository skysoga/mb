<template></template>
<script>
  export default {
    data(){
      return{}
    },
    beforeRouteEnter(to,from,next){
      if (!localStorage.getItem('InvitationCode')) {
        var id = to.query.id
        localStorage.setItem('InvitationCode',id)
        // localStorage.setItem('isApp',1)
        // window._App=true
      }
      router.push('/index')
    },
  }
</script>
<style>
  #index .textMore{
    display: none;
  }
</style>