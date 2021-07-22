<template>
  <div id="app">
    <ul>
      <li v-for="(item,index) in classInfo" :class="{activeClass: isActive===index}" @click="isActive=index">
        {{item.value}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data() {
      return {
        classInfo: [
          {key:"1",value:"daFei"},
          {key:"2",value:"foo"},
          {key:"3",value:"bar"},
        ],
        isActive: "",
      }
    }
  }
</script>

<style scoped>
  .activeClass{
    outline: 2px solid #c0c0c0;
    background-color: #c0c0c0;
  }
</style>
