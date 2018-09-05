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

.child-view{
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: rgb(47,50,59);
}

</style>
