<template>
  <div></div>
</template>
<script>
  export default {
    data:()=>{
      return{
      }
    },
    created(){
      this.$nextTick(() => (router.go(-1)))
    }
  }
</script>