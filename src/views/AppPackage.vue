<template></template>
<script>
  export default {
    data(){
      return{}
    },
    beforeRouteEnter(to,from,next){
      var id = to.query.id
      localStorage.setItem('isSelfApp','1')

      if (!localStorage.getItem('InvitationCode')&&/^\d{8}$/.test(id)) {
        localStorage.setItem('InvitationCode',id)
      }
      next(vm=>{
        // var head = document.getElementsByTagName('head')[0]
        // var styleTag = document.createElement('style')
        // styleTag.textContent='#index .textMore{display: none; }'
        router.replace('/index')
      })
    }
  }
</script>
