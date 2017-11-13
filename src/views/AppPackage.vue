<template></template>
<script>
  export default {
    data(){
      return{}
    },
    beforeRouteEnter(to,from,next){
      var id = to.query.id
      localStorage.setItem('isSelfApp','1')
      if (/^\d{8}$/.test(id)) {
        var head = document.getElementsByTagName('head')[0]
        var styleTag = document.createElement('style')
        styleTag.textContent='#index .textMore{display: none; }'
        head.appendChild(styleTag)
        if (!localStorage.getItem('InvitationCode')) {
          localStorage.setItem('InvitationCode',id)
        }
      }
      next()
    },
    created(){
      router.replace('/index')
    }
  }
</script>
