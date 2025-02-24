<template>
  <div class="bg-[#181A1E]">
    <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div class="max-w-md w-full">
        <a href="#"><img src="images/TaskFlows.png" alt="logo" class='h-40 mx-auto object-contain'
            style="margin-top: -140px;" />
        </a>
        <p class="text-white text-[16px] text-center mb-5" style="margin-top: -35px;">Organize & Schedule with Ease</p>
        <div class="p-8 rounded-2xl bg-white shadow">
          <h2 class="text-gray-800 text-center text-2xl font-bold">Create Your Account</h2>
          <div class="" v-if="error">{{ error }}</div>
          <form class="mt-8 space-y-4">
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Email</label>
              <div class="relative flex items-center">
                <input name="username" type="text" v-model="email" required
                  class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-gray-800"
                  placeholder="email@email.com" />
              </div>
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block">Password</label>
              <div class="relative flex items-center">
                <input name="password" type="password" v-model="password" required
                  class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-gray-800"
                  placeholder="•••••••••••" />
              </div>
            </div>


            <div class="!mt-8">
              <button type="button" @click="onSignUp"
                class="w-full py-3 px-4 text-sm tracking-wide rounded-full text-white bg-[#24292f] hover:bg-[#31353b] focus:outline-none">
                Sign Up
              </button>
            </div>
          </form>
          <p class="text-gray-800 text-sm !mt-8 text-center">Already hava account?
            <router-link to="/" class="font-semibold">Sign In</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignupValidations from '@/services/SignupValidations';
import { SIGNUP_ACTION } from '@/store/storeconstants';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      email: '',
      password: '',
      errors: [],
      error: '',
    };
  },
  methods: {
    ...mapActions('auth', {
      signup: SIGNUP_ACTION
    }),
    onSignUp() {
      let Validations = new SignupValidations(
        this.email,
        this.password,
      );

      this.errors = Validations.checkValidations();
      if ('email' in this.errors || 'password' in this.errors) {
        return false;
      }

      this.signup({ email: this.email.trim(), password: this.password, 
      }).catch((error) => {
        this.error = error;
      });
    },
  },
};
</script>


<style scoped></style>