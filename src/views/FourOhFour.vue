<template>
  <div class="fourOhFour">
      <center><h2>Uh oh, looks like you got lost</h2></center>
      <center><h4>Unfortunately, this page does not exist, go back to the previous page.</h4></center>
      <center><button class="uk-button uk-button-primary uk-border-rounded" @click="$router.go(-1)">Go Back</button></center>
  </div>
</template>

<style scoped>
.fourOhFour {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>