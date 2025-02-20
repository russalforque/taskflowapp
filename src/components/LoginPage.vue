<template>
   <div class="bg-[#181A1E]">
      <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div class="max-w-md w-full">
          <a href="#"><img
            src="images/TaskFlows.png" alt="logo" class='h-40 mx-auto object-contain'  style="margin-top: -150px;"/>
          </a>
          <p class="text-[#f7f7f7] text-[16px] text-center mb-9" style="margin-top: -35px;">Organize & Schedule with Ease</p>
          <div class="p-8 rounded-2xl bg-white shadow">
            <h2 class="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
            <form class="mt-8 space-y-4">
              <div>
                <label class="text-gray-800 text-sm mb-2 block">Email</label>
                <div class="relative flex items-center">
                  <input name="username" type="text" v-model="email" required class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-gray-800" placeholder="email@email.com" />
                  <PersonIcon class="w-4 h-4 absolute right-4 text-[#000]"></PersonIcon>
                </div>
              </div>

              <div>
                <label class="text-gray-800 text-sm mb-2 block">Password</label>
                <div class="relative flex items-center">
                  <input name="password" type="password" v-model="password" required class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-gray-800" placeholder="•••••••••••" />
                  <EyeIcon class="w-4 h-4 absolute right-4 text-[#000]"></EyeIcon>
                </div>
              </div>

              <div class="!mt-8">
                <button type="button" class="w-full py-3 px-4 text-sm tracking-wide rounded-full text-white bg-[#24292f] hover:bg-[#31353b] focus:outline-none">
                  <router-link to="/">Sign in</router-link>
                </button>
              </div>
              <p class="text-gray-800 text-sm !mt-8 text-center">Don't have an account?
                <router-link to="/signup" class="font-semibold">Register</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import PersonIcon from './svg/PersonIcon.vue'; 
import EyeIcon from './svg/EyeIcon.vue';


export default {
  name: 'LoginPage',
  components: {
    PersonIcon,
    EyeIcon
  },
  data() {
    return {
      email: '',
      password: ''
    }
  }
};
</script>


<style scoped>

</style>