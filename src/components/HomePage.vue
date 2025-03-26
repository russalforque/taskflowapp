<template>
  <transition name="page" appear>
    <div class="min-h-screen bg-[#181A1E]">
      <!-- Hero Section -->
      <div class="relative overflow-hidden bg-gradient-to-b from-[#1F2127] to-[#181A1E] py-16 sm:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Welcome {{ firstName || 'Guest' }}
            </h1>
            <p class="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Your all-in-one productivity suite designed to streamline your workflow and boost efficiency
            </p>
            <div class="mt-8 flex justify-center gap-4">
              <router-link to="/todolist" class="inline-flex items-center px-6 py-3 rounded-lg bg-[#76ABAE] text-white hover:bg-[#5a8d90] transition-all duration-300">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </router-link>
              <button class="inline-flex items-center px-6 py-3 rounded-lg border border-[#76ABAE] text-[#76ABAE] hover:bg-[#76ABAE]/10 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="py-12 bg-[#1F2127]/50">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-[#76ABAE]">2.5k+</div>
              <div class="text-sm text-gray-400 mt-1">Active Users</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-[#76ABAE]">15k+</div>
              <div class="text-sm text-gray-400 mt-1">Tasks Completed</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-[#76ABAE]">98%</div>
              <div class="text-sm text-gray-400 mt-1">Satisfaction Rate</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-[#76ABAE]">24/7</div>
              <div class="text-sm text-gray-400 mt-1">Support</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="py-16 sm:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-white mb-4">Powerful Features</h2>
            <p class="text-gray-400 max-w-2xl mx-auto">Everything you need to manage your tasks and schedule effectively</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Calendar Feature Card -->
            <div class="bg-[#1F2127] rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-800 group hover:border-[#76ABAE]/50">
              <div class="flex items-center mb-4">
                <div class="p-3 bg-[#76ABAE]/10 rounded-lg group-hover:bg-[#76ABAE]/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#76ABAE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 class="text-2xl font-semibold text-white ml-4">Calendar</h2>
              </div>
              <p class="text-gray-400 mb-6 text-lg">Plan your schedule efficiently with our intuitive calendar interface. Set appointments, reminders, and never miss important dates.</p>
              <router-link to="/calendar" class="inline-flex items-center text-[#76ABAE] hover:text-[#5a8d90] transition-colors text-lg">
                Open Calendar
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>

            <!-- Task Management Feature Card -->
            <div class="bg-[#1F2127] rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-800 group hover:border-[#76ABAE]/50">
              <div class="flex items-center mb-4">
                <div class="p-3 bg-[#76ABAE]/10 rounded-lg group-hover:bg-[#76ABAE]/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#76ABAE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 class="text-2xl font-semibold text-white ml-4">Task Management</h2>
              </div>
              <p class="text-gray-400 mb-6 text-lg">Organize your tasks with our powerful todo list. Track progress, set priorities, and boost your productivity.</p>
              <router-link to="/todolist" class="inline-flex items-center text-[#76ABAE] hover:text-[#5a8d90] transition-colors text-lg">
                View Tasks
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Section -->
      <div class="pb-16 sm:pb-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="bg-[#1F2127] rounded-xl p-8 border border-gray-800">
            <h3 class="text-2xl font-semibold text-white mb-6">Quick Actions</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <router-link to="/todolist" class="group p-4 bg-[#2a2d35] rounded-lg text-white hover:bg-[#76ABAE] transition-all duration-300 text-left flex flex-col">
                <span class="block font-medium text-lg group-hover:text-white">New Task</span>
                <span class="text-sm text-gray-400 group-hover:text-white/90 mt-1">Add a todo item</span>
              </router-link>
              
              <router-link to="/calendar" class="group p-4 bg-[#2a2d35] rounded-lg text-white hover:bg-[#76ABAE] transition-all duration-300 text-left flex flex-col">
                <span class="block font-medium text-lg group-hover:text-white">Schedule Event</span>
                <span class="text-sm text-gray-400 group-hover:text-white/90 mt-1">Add to calendar</span>
              </router-link>
              
              <router-link to="/calendar" class="group p-4 bg-[#2a2d35] rounded-lg text-white hover:bg-[#76ABAE] transition-all duration-300 text-left flex flex-col">
                <span class="block font-medium text-lg group-hover:text-white">View Timeline</span>
                <span class="text-sm text-gray-400 group-hover:text-white/90 mt-1">See your schedule</span>
              </router-link>
              
              <router-link to="/" class="group p-4 bg-[#2a2d35] rounded-lg text-white hover:bg-[#76ABAE] transition-all duration-300 text-left flex flex-col">
                <span class="block font-medium text-lg group-hover:text-white">Statistics</span>
                <span class="text-sm text-gray-400 group-hover:text-white/90 mt-1">Track Progress</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <ChatBot />
</template>

<script>
import { mapState } from 'vuex';
import ChatBot from './ChatBot.vue';

export default {
  name: 'HomePage',
  components: {
    ChatBot
  },
  computed: {
    ...mapState('auth', ['firstName'])
  }
}
</script>

<style scoped>
/* Page Transition */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 640px) {
  .loading-container {
    padding: 1rem;
  }
}

/* Add smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Add touch handling for mobile */
@media (hover: none) {
  .hover\:bg-\[\#76ABAE\]:hover {
    background-color: transparent;
  }
  
  .group:active {
    background-color: #76ABAE;
  }
  
  .group:active * {
    color: white;
  }
}
</style>