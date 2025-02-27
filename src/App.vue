<template>
  <div class="flex min-h-screen bg-[#181A1E]">
    <TheLoader 
      v-if="showLoading" 
      text="Loading..."
      color="#76ABAE"
      textColor="#ffffff"
    />
    <SideBarPage v-if="!isAuthRoute" />
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import TheLoader from './components/TheLoader.vue';
import SideBarPage from './components/SideBarPage.vue';

export default defineComponent({
  name: 'App',
  components: {
    TheLoader,
    SideBarPage,
  },
  computed: {
    ...mapState({
      showLoading: (state) => state.showLoading,
    }),
    isAuthRoute() {
      const authRoutes = ['login', 'signup'];
      return authRoutes.includes(this.$route.name);
    }
  },
  watch: {
    $route(to) {
      console.log('Route changed:', to.path);
    }
  }
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
