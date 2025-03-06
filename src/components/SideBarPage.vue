<template>
  <div class="flex min-h-screen bg-[#181A1E] text-white">
    <!-- Sticky Sidebar -->
    <div class="fixed left-0 h-screen bg-[#1F2127] flex flex-col py-6 px-2 justify-between w-[80px]">
      <!-- Logo and Navigation -->
      <div>
        <img src="images/TaskflowLogo.png" class="w-[30px] h-[30px] mx-auto mb-10">
        <nav class="flex flex-col space-y-4">
          <router-link 
            to="/home" 
            class="hover:bg-[#2A2D34] py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center"
            :class="{ 'bg-[#2A2D34]': $route.path === '/home' }"
          >
            <HomeIcon class="text-[#76ABAE] w-[25px]" />
          </router-link>
          <router-link  
            to="/todolist" 
            class="hover:bg-[#2A2D34] py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center"
            :class="{ 'bg-[#2A2D34]': $route.path === '/todo' }"
          >
            <TaskIcon class="text-[#76ABAE] w-[25px]" />
          </router-link>
          <router-link 
            to="/calendar" 
            class="hover:bg-[#2A2D34] py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center"
            :class="{ 'bg-[#2A2D34]': $route.path === '/calendar' }"
          >
            <CalendarIcon class="text-[#76ABAE] w-[25px]" />
          </router-link>
        </nav>
      </div>

      <!-- User Icon and Modal at the Bottom -->
      <div class="mb-10 space-y-4">
        <button 
          @click="toggleModal"
          class="hover:bg-[#2A2D34] py-2 px-4 rounded block transition-colors duration-200 items-center justify-center w-full"
        >
          <UserIcon class="text-[#76ABAE] w-[25px]" />
        </button>

        <!-- User Modal -->
        <div v-if="showModal" class="absolute bottom-20 left-20 w-60 bg-[#1F2127] rounded-lg shadow-lg border border-[#2A2D34]">
          <div class="py-2">
            <router-link 
              to="/profile" 
              class="block px-6 py-2 text-sm text-white hover:bg-[#2A2D34] transition-colors duration-200"
              @click="toggleModal"
            >
              Profile
            </router-link>
            <button 
              @click="handleLogout"
              class="w-full text-left px-6 py-2 text-sm text-white hover:bg-[#2A2D34] transition-colors duration-200"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content - Add margin to prevent overlap with fixed sidebar -->
    <div class="ml-[80px] flex-1">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import HomeIcon from './svg/HomeIcon.vue';
import TaskIcon from './svg/TaskIcon.vue';
import CalendarIcon from './svg/CalendarIcon.vue';
import UserIcon from './svg/UserIcon.vue';
import { mapActions } from 'vuex';
import { LOGOUT_ACTION } from '@/store/storeconstants';

export default {
  name: 'SideBar',
  components: {
    HomeIcon,
    TaskIcon,
    CalendarIcon,
    UserIcon,
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    ...mapActions('auth', {
      logout: LOGOUT_ACTION
    }),
    toggleModal() {
      this.showModal = !this.showModal;
    },
    async handleLogout() {
      try {
        await this.logout();
        this.showModal = false;
      } catch (error) {
        console.error('Logout failed:', error);
        window.location.href = '/login';
      }
    }
  },
  mounted() {
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.showModal = false;
      }
    });
  },
  beforeUnmount() {
    // Clean up event listener
    document.removeEventListener('click', this.closeModal);
  }
}
</script>

<style scoped>
/* Add smooth transitions */
.router-link-active {
  background-color: #2A2D34;
}

/* Optional: Add hover effect for icons */
.router-link-active svg {
  transform: scale(1.1);
}

/* Transition effects */
.router-link-active,
.hover\:bg-\[\#2A2D34\]:hover {
  transition: all 0.3s ease;
}

/* Ensure sidebar stays above content */
.fixed {
  z-index: 50;
}

/* Modal animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>