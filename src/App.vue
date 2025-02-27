<template>
  <TheLoader v-if="showLoading"></TheLoader>
  <router-view />
</template>

<script>
import { mapState } from 'vuex';
import TheLoader from './components/TheLoader.vue';

export default {
  name: 'App',
  computed: {
    ...mapState({
      showLoading: (state) => state.showLoading,
    }),
  },
  components: {
    TheLoader,
  },
};
</script>

<style scoped>

</style>
