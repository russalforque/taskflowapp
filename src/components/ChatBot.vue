<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Chat Button -->
    <button 
      @click="toggleChat" 
      class="bg-[#76ABAE] p-3 rounded-full shadow-lg hover:bg-[#5a8d90] transition-all duration-300"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6 text-white" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
        />
      </svg>
    </button>

    <!-- Chat Window -->
    <div 
      v-if="isOpen" 
      class="absolute bottom-16 right-0 w-80 bg-[#1F2127] rounded-lg shadow-xl border border-gray-800"
    >
      <!-- Chat Header -->
      <div class="p-4 border-b border-gray-800 flex justify-between items-center">
        <h3 class="text-white font-medium">AI Assistant</h3>
        <button 
          @click="toggleChat"
          class="text-gray-400 hover:text-white transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fill-rule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clip-rule="evenodd" 
            />
          </svg>
        </button>
      </div>

      <!-- Chat Messages -->
      <div class="h-80 overflow-y-auto p-4 space-y-4">
        <div v-for="(message, index) in messages" :key="index" class="flex flex-col">
          <div 
            :class="[
              'max-w-[80%] rounded-lg p-3 mb-2',
              message.isUser ? 'bg-[#76ABAE] text-white ml-auto' : 'bg-[#2a2d35] text-white'
            ]"
          >
            {{ message.text }}
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-4 border-t border-gray-800">
        <form @submit.prevent="sendMessage" class="flex gap-2">
          <input 
            v-model="userInput" 
            type="text" 
            placeholder="Type your message..." 
            class="flex-1 bg-[#2a2d35] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
          >
          <button 
            type="submit"
            class="bg-[#76ABAE] px-4 py-2 rounded-lg text-white hover:bg-[#5a8d90] transition-all duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBot',
  data() {
    return {
      isOpen: false,
      userInput: '',
      messages: [
        {
          text: "Hello! How can I help you today?",
          isUser: false
        }
      ]
    }
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen
    },
    async sendMessage() {
      if (!this.userInput.trim()) return

      // Add user message
      this.messages.push({
        text: this.userInput,
        isUser: true
      })

      // Store input and clear it
      this.userInput = ''

      // Simple response logic
      let response = "sorry i can accept message right now, plss watch our demo for this app for more info!"
      
      // Add AI response with a small delay to simulate processing
      setTimeout(() => {
        this.messages.push({
          text: response,
          isUser: false
        })
      }, 1000)
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar for chat messages */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #1F2127;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #76ABAE;
  border-radius: 3px;
}
</style> 