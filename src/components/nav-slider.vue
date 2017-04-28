<template lang="html">
  <div class="nav-slider-wrapper">
    <div class="nav-top-pos">
      <div class="nav-top">
        <ul>
          <li v-for = "(value,index) in list" :class= "li_state == index? 'on':null" @click="search(index)">
            <a href="###">
              <p>{{value}}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: ['全部彩種','快3','時時彩','時時彩','時時彩','時時彩','時時彩'],
        li_state: 0
      }
    },
    methods: {
      search: function(index) {
        this.page_index = this.li_state = index || 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/lotteryHall.scss';
</style>
