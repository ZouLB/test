<template>
  <div id="app">
  	<transition name='fade' mode="out-in">
    	<router-view class="child-view"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">

@import "src/assets/scss/style.scss";

#app{
	background-color: rgb(47,50,59);
}
.child-view{
	min-width: 780px;
	background-color: rgb(47,50,59);
}

</style>
