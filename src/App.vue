<template>
  <div id="app">
    <div>
      PC端
      <!--<fsy_Picker
        format="YYYY-MM-dd HH:mm"
        theme="#000000"></fsy_Picker>-->
      <F_DatePicker
        format="YYYY-MM-dd HH:mm"
        theme="#000000">
      </F_DatePicker>
    </div>




  </div>
</template>

<script>
  import fsy_Picker from './lib/vueTimePicker.vue'
  export default {
    name: 'app',
    data () {
      return {
        dateTime:'',
        dataList:[]
      }
    },
    components:{
      fsy_Picker,
    },
    mounted() {
     //this.getRegion();
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
