<template>
  <div></div>
</template>
<script>
  export default {
    data:()=>{
      return{
      }
    },
    beforeRouteEnter(t,f,n){
      // console.log(router)
      // router.push(t.query.r)
      n(vm=>{
        RootApp.$router.replace(t.query.r)
      })
    }
  }
</script>