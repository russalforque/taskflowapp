<template>
  <div class="flex min-h-screen bg-[#181A1E]">
    <div class="flex-1 p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <header class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          Welcome {{ firstName || 'Guest' }}
        </h1>
        <p class="text-sm sm:text-base text-gray-400">Your personal productivity companion</p>
      </header>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
        <!-- Calendar Feature Card -->
        <div class="bg-[#1F2127] rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border border-gray-800">
          <div class="flex items-center mb-3 sm:mb-4">
            <div class="p-2 sm:p-3 bg-[#76ABAE]/10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-[#76ABAE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 class="text-xl sm:text-2xl font-semibold text-white ml-3 sm:ml-4">Calendar</h2>
          </div>
          <p class="text-sm sm:text-base text-gray-400 mb-4">Plan your schedule efficiently with our intuitive calendar interface. Set appointments, reminders, and never miss important dates.</p>
          <router-link to="/calendar" class="inline-flex items-center text-sm sm:text-base text-[#76ABAE] hover:text-[#5a8d90] transition-colors">
            Open Calendar
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </router-link>
        </div>

        <!-- Todo List Feature Card -->
        <div class="bg-[#1F2127] rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border border-gray-800">
          <div class="flex items-center mb-3 sm:mb-4">
            <div class="p-2 sm:p-3 bg-[#76ABAE]/10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-[#76ABAE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 class="text-xl sm:text-2xl font-semibold text-white ml-3 sm:ml-4">Task Management</h2>
          </div>
          <p class="text-sm sm:text-base text-gray-400 mb-4">Organize your tasks with our powerful todo list. Track progress, set priorities, and boost your productivity.</p>
          <router-link 
            to="/todolist" 
            class="inline-flex items-center text-sm sm:text-base text-[#76ABAE] hover:text-[#5a8d90] transition-colors"
          >
            View Tasks
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </router-link>
        </div>
      </div>

      <!-- Quick Actions Section -->
      <div class="bg-[#1F2127] rounded-xl p-4 sm:p-6 border border-gray-800">
        <h3 class="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Quick Actions</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <router-link 
            to="/todo"
            class="group p-3 sm:p-4 bg-[#2a2d35] rounded-lg text-white hover:bg-[#76ABAE] transition-all duration-300 text-left flex flex-col"
          >
            <span class="block font-medium text-sm sm:text-base group-hover:text-white">New Task</span>
            <span class="text-xs sm:text-sm text-gray-400 group-hover:text-white/90">Add a todo item</span>
          </router-link>
          
          <button class="group p-3 sm:p-4 bg-[#2a2d35] rounded-lg text-white hover:bg-[#76ABAE] transition-all duration-300 text-left flex flex-col">
            <span class="block font-medium text-sm sm:text-base group-hover:text-white">Schedule Event</span>
            <span class="text-xs sm:text-sm text-gray-400 group-hover:text-white/90">Add to calendar</span>
          </button>
          
          <button class="group p-3 sm:p-4 bg-[#2a2d35] rounded-lg text-white hover:bg-[#76ABAE] transition-all duration-300 text-left flex flex-col">
            <span class="block font-medium text-sm sm:text-base group-hover:text-white">View Timeline</span>
            <span class="text-xs sm:text-sm text-gray-400 group-hover:text-white/90">See your schedule</span>
          </button>
          
          <button class="group p-3 sm:p-4 bg-[#2a2d35] rounded-lg text-white hover:bg-[#76ABAE] transition-all duration-300 text-left flex flex-col">
            <span class="block font-medium text-sm sm:text-base group-hover:text-white">Statistics</span>
            <span class="text-xs sm:text-sm text-gray-400 group-hover:text-white/90">Track progress</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HomePage',
  computed: {
    ...mapState('auth', ['firstName'])
  }
}
</script>

<style scoped>
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