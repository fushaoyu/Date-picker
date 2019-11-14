<template>
  <div id="app">
    小哥哥
    <F_DatePicker
      format="YYYY-MM-dd HH:mm"
      theme="#000000"></F_DatePicker>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        dateTime:''
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
#app{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
}

</style>
