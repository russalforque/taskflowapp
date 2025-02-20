<template>
  <div class="flex min-h-screen bg-[#181A1E] text-white">
    <!-- Sidebar -->
    <div class="w-30 h-screen bg-[#1F2127] flex flex-col py-6 px-2 justify-between">
      <!-- Logo and Navigation -->
      <div>
        <img src="images/TaskflowLogo.png" class="w-[50px] h-[40px] mx-auto mb-10">
        <nav class="flex flex-col space-y-4">
          <router-link to="/" class="hover:bg-[#2A2D34] py-2 px-4 rounded">
            <HomeIcon class="text-[#FEC260] w-[25px]" />
          </router-link>
          <router-link to="/todolist" class="hover:bg-[#2A2D34] py-2 px-4 rounded">
            <TaskIcon class="text-[#FEC260] w-[25px]" />
          </router-link>
          <router-link to="/" class="hover:bg-[#2A2D34] py-2 px-4 rounded">
            <CalendarIcon class="text-[#FEC260] w-[25px]" />
          </router-link>
        </nav>
      </div>

      <!-- User Icon at the Bottom -->
      <div class="mb-7">
        <router-link to="/login" class="hover:bg-[#2A2D34] py-2 px-4 rounded block">
          <UserIcon class="text-[#FEC260] w-[25px]" />
        </router-link>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-8">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HomeIcon from './svg/HomeIcon.vue';
import TaskIcon from './svg/TaskIcon.vue';
import CalendarIcon from './svg/CalendarIcon.vue';
import UserIcon from './svg/UserIcon.vue';

export default {
    name: 'HomePage',
    components:{
        HomeIcon,
        TaskIcon,
        CalendarIcon,
        UserIcon
    }
}
</script>

<style scoped>

</style>