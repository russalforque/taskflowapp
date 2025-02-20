<template>
  <div class="bg-[#181A1E]">
      <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
       <div class="max-w-md w-full">
         <a href="#"><img
           src="images/TaskFlows.png" alt="logo" class='h-40 mx-auto object-contain'  style="margin-top: -140px;"/>
         </a>
         <p class="text-white text-[16px] text-center mb-5" style="margin-top: -35px;">Organize & Schedule with Ease</p>
         <div class="p-8 rounded-2xl bg-white shadow">
           <h2 class="text-gray-800 text-center text-2xl font-bold">Sign Up</h2>
           <form @submit.prevent="handleSubmit" class="mt-8 space-y-4">
             <div>
               <label class="text-gray-800 text-sm mb-2 block">Email</label>
               <div class="relative flex items-center">
                 <input name="username" type="text" v-model="Email" required class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-gray-800" placeholder="email@email.com" />
               </div>
             </div>

             <div>
               <label class="text-gray-800 text-sm mb-2 block">Password</label>
               <div class="relative flex items-center">
                 <input name="password" type="password" v-model="Password" required class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-gray-800" placeholder="•••••••••••" />
               </div>
             </div>

             <div>
               <label class="text-gray-800 text-sm mb-2 block">Confirm Password</label>
               <div class="relative flex items-center">
                 <input name="password" type="password" v-model="Password_confirm" required class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-gray-800" placeholder="•••••••••••" />
               </div>
             </div>


             <div class="!mt-8">
               <button type="button" @click="handleSubmit" class="w-full py-3 px-4 text-sm tracking-wide rounded-full text-white bg-[#24292f] hover:bg-[#31353b] focus:outline-none">
                 Sign Up
               </button>
             </div>
           </form>
           <p class="text-gray-800 text-sm !mt-8 text-center">Already hava account?
               <router-link to="/login" class="font-semibold">Sign In</router-link>
             </p>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      Email: '',
      Password: '',
      Password_confirm: ''
    };
  },
  methods: {
    async handleSubmit() {
        await axios.post('SignUp', {
        Email: this.Email,
        Password: this.Password,
        Password_confirm: this.Password_confirm
      });

      this.$router.push('/');
    }
  }
};
</script>


<style scoped>

</style>