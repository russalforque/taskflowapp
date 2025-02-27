<template>
  <SideBarPage></SideBarPage>
  <div class="flex min-h-screen bg-[#181A1E] text-white fixed">
    <div class="w-full h-screen bg-[#1F2127] flex flex-col py-6 px-2 justify-between">
      <h1 class="text-red-500 ml-10">RHAZEL</h1>
    </div>
  </div>
</template>

<script>
import SideBarPage from './SideBarPage.vue';


export default {
  name: 'HomePage',
  components: {
    SideBarPage
  }
}
</script>

<style scoped></style>