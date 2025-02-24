<template>
  <div class="bg-[#181A1E]">
    <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div class="max-w-md w-full">
        <a href="#">
          <img src="images/TaskFlows.png" alt="logo" class="h-40 mx-auto object-contain" style="margin-top: -150px;" />
        </a>
        <p class="text-[#f7f7f7] text-[16px] text-center mb-9" style="margin-top: -35px;">Organize & Schedule with Ease
        </p>

        <div class="p-8 rounded-2xl bg-white shadow">
          <h2 class="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
          <div class="text-red-500" v-if="error">{{ error }}</div>
          <form @submit.prevent="onLogin" class="mt-8 space-y-4">
            <!-- Email Input -->
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Email</label>
              <div class="relative flex items-center">
                <input name="email" type="email" v-model="email" required
                  class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-gray-800"
                  placeholder="email@email.com" />
                <PersonIcon class="w-4 h-4 absolute right-4 text-[#000]" />
              </div>
              <div class="text-red-500 text-sm mt-1" v-if="errors.email">{{ errors.email }}</div>
            </div>

            <!-- Password Input -->
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Password</label>
              <div class="relative flex items-center">
                <input name="password" type="password" v-model="password" required
                  class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-gray-800"
                  placeholder="•••••••••••" />
                <EyeIcon class="w-4 h-4 absolute right-4 text-[#000]" />
              </div>
              <div class="text-red-500 text-sm mt-1" v-if="errors.password">{{ errors.password }}</div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox"
                  class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label for="remember-me" class="ml-3 block text-sm text-gray-800">
                  Remember me
                </label>
              </div>
              <div class="text-sm">
                <a href="jajvascript:void(0);" class="text-gray-800 hover:underline font-semibold">
                  Forgot your password?
                </a>
              </div>
            </div>

            <!-- Sign In Button -->
            <div class="!mt-8">
              <button type="submit"
                class="w-full py-3 px-4 text-sm tracking-wide rounded-full text-white bg-[#24292f] hover:bg-[#31353b] focus:outline-none">
                Sign in
              </button>
            </div>

            <!-- Register Link -->
            <p class="text-gray-800 text-sm !mt-8 text-center">
              Don't have an account?
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
import SignupValidations from '@/services/SignupValidations';
import { mapActions } from 'vuex';
import { LOGIN_ACTION } from '@/store/storeconstants';

export default {
  name: 'LoginPage',
  components: {
    PersonIcon,
    EyeIcon
  },
  data() {
    return {
      email: '',
      password: '',
      errors: {},
      error: ''
    };
  },
  methods: {
    ...mapActions('auth', {
      login: LOGIN_ACTION,
    }),
    async onLogin() {
      const Validations = new SignupValidations(this.email, this.password);
      this.errors = Validations.checkValidations();

      if (Object.keys(this.errors).length) {
        return false;
      }

      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push({ name: 'Home' });
      } catch (e) {
        console.log(e);
        this.error = e.message || 'Invalid email or password';
      }
    }
  }
};
</script>

<style scoped>
.text-red-500 {
  color: #f87171;
}
</style>
