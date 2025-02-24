<template>
  <div>
    <SideBarPage></SideBarPage>
  </div>
  <router-view />
</template>

<script>
import SideBarPage from './components/SideBarPage.vue';


export default {
  components: {
    SideBarPage
  },
};
</script>

<style scoped>

</style>
