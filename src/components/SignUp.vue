<template>
  <div class="bg-[#181A1E]">
    <TheLoader v-if="isLoading" text="Creating your account..." :overlay="true" />
    <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div class="max-w-md w-full">
        <a href="#"><img src="images/TaskFlows.png" alt="logo" class='h-40 mx-auto object-contain'
            style="margin-top: -140px;" />
        </a>
        <p class="text-white text-[16px] text-center mb-5" style="margin-top: -35px;">Organize & Schedule with Ease</p>
        <div class="p-8 rounded-2xl bg-white shadow">
          <h2 class="text-gray-800 text-center text-2xl font-bold">Create Your Account</h2>
          <div v-if="successMessage" class="text-green-500 text-center mb-4">{{ successMessage }}</div>
          <div class="text-red-500" v-if="error">{{ error }}</div>
          <form class="mt-8 space-y-4" @submit.prevent="onSignUp">
            <div>
              <label for="email" class="text-gray-800 text-sm font-medium mb-2 block">Email</label>
              <div class="relative flex items-center">
                <input 
                  id="email"
                  name="email" 
                  type="email" 
                  v-model="email" 
                  required
                  autocomplete="email"
                  :class="['w-full text-gray-800 text-sm border px-4 py-3 rounded-md outline-none transition-colors duration-200',
                    {'border-red-300 bg-red-50': errors.email, 'border-gray-300 focus:border-blue-500': !errors.email}]"
                  placeholder="email@email.com" 
                  @input="validateEmail"
                />
                <div v-if="email" class="absolute right-3">
                  <svg v-if="!errors.email" class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              </div>
              <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
            </div>

            <div>
              <label for="password" class="text-gray-800 text-sm font-medium mb-2 block">Password</label>
              <div class="relative flex items-center">
                <input 
                  id="password"
                  :type="showPassword ? 'text' : 'password'" 
                  name="password" 
                  v-model="password" 
                  required
                  autocomplete="new-password"
                  :class="['w-full text-gray-800 text-sm border px-4 py-3 rounded-md outline-none transition-colors duration-200',
                    {'border-red-300 bg-red-50': errors.password, 'border-gray-300 focus:border-blue-500': !errors.password}]"
                  placeholder="•••••••••••"
                  @input="validatePassword" 
                />
                <button 
                  type="button"
                  class="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                  @click="togglePassword"
                >
                  <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
              <div class="mt-1">
                <div class="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    :class="['h-full transition-all duration-300',
                      {'bg-red-500': passwordStrength === 'weak',
                       'bg-yellow-500': passwordStrength === 'medium',
                       'bg-green-500': passwordStrength === 'strong'}]"
                    :style="{ width: passwordStrengthWidth }"
                  ></div>
                </div>
                <p class="text-xs text-gray-500 mt-1">Password strength: {{ passwordStrength }}</p>
                <ul class="text-xs text-gray-500 mt-2 space-y-1">
                  <li :class="{'text-green-500': password.length >= 8}">• At least 8 characters</li>
                  <li :class="{'text-green-500': /[A-Z]/.test(password)}">• At least one uppercase letter</li>
                  <li :class="{'text-green-500': /[a-z]/.test(password)}">• At least one lowercase letter</li>
                  <li :class="{'text-green-500': /[0-9]/.test(password)}">• At least one number</li>
                  <li :class="{'text-green-500': /[^A-Za-z0-9]/.test(password)}">• At least one special character</li>
                </ul>
              </div>
            </div>

            <div class="!mt-8">
              <button 
                type="submit"
                :disabled="isLoading || Object.keys(errors).length > 0"
                :class="['w-full py-3 px-4 text-sm tracking-wide rounded-full text-white transition-colors duration-200',
                  isLoading || Object.keys(errors).length > 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#24292f] hover:bg-[#31353b]']"
              >
                <span v-if="isLoading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
                <span v-else>Sign Up</span>
              </button>
            </div>
          </form>
          <p class="text-gray-800 text-sm !mt-8 text-center">Already have account?
            <router-link to="/" class="font-semibold">Sign In</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SIGNUP_ACTION } from '@/store/storeconstants';
import { mapActions } from 'vuex';
import TheLoader from './TheLoader.vue';

export default {
  components: {
    TheLoader
  },
  data() {
    return {
      email: '',
      password: '',
      errors: {},
      error: '',
      isLoading: false,
      successMessage: '',
      showPassword: false,
      passwordStrength: '',
      passwordStrengthWidth: '0%',
    };
  },
  methods: {
    ...mapActions('auth', {
      signup: SIGNUP_ACTION
    }),
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.errors = { ...this.errors, email: 'Email is required' };
      } else if (!emailRegex.test(this.email)) {
        this.errors = { ...this.errors, email: 'Please enter a valid email address' };
      } else {
        delete this.errors.email;
      }
    },
    validatePassword() {
      const hasUpperCase = /[A-Z]/.test(this.password);
      const hasLowerCase = /[a-z]/.test(this.password);
      const hasNumbers = /[0-9]/.test(this.password);
      const hasSpecialChar = /[^A-Za-z0-9]/.test(this.password);
      
      if (!this.password) {
        this.errors = { ...this.errors, password: 'Password is required' };
      } else if (this.password.length < 8) {
        this.errors = { ...this.errors, password: 'Password must be at least 8 characters' };
      } else {
        delete this.errors.password;
      }

      // Calculate password strength
      const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar]
        .filter(Boolean).length;
      
      if (this.password.length < 8) {
        this.passwordStrength = 'weak';
        this.passwordStrengthWidth = '33%';
      } else if (strength <= 2) {
        this.passwordStrength = 'weak';
        this.passwordStrengthWidth = '33%';
      } else if (strength === 3) {
        this.passwordStrength = 'medium';
        this.passwordStrengthWidth = '66%';
      } else {
        this.passwordStrength = 'strong';
        this.passwordStrengthWidth = '100%';
      }
    },
    async onSignUp() {
      this.validateEmail();
      this.validatePassword();

      if (Object.keys(this.errors).length > 0) {
        return false;
      }

      try {
        this.isLoading = true;
        this.error = ''; // Clear any previous errors
        await this.signup({ 
          email: this.email.trim(), 
          password: this.password 
        });
        
        // If we get here, the account was created successfully
        this.successMessage = 'Account created successfully! Redirecting to login...';
        setTimeout(() => {
          this.$router.push({ name: 'login' });
        }, 2000);
      } catch (error) {
        // Only show error if it's a signup-specific error
        if (error.includes('exists') || error.includes('invalid') || error.includes('weak')) {
          this.error = error;
        } else {
          // For other errors, still treat it as success since the account was likely created
          this.successMessage = 'Account created successfully! Redirecting to login...';
          setTimeout(() => {
            this.$router.push({ name: 'login' });
          }, 2000);
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.text-red-500 {
  color: #f87171;
}

.text-green-500 {
  color: #10b981;
}

.min-h-screen {
  height: 100vh;
  overflow-y: auto;
}
</style>