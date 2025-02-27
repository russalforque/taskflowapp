<template>
    <div class="min-h-screen bg-[#181A1E] py-5 px-4 sm:px-6 lg:px-8">
      <div class="container mx-auto max-w-7xl">
        <!-- Header - More responsive -->
        <header class="mb-4 text-center sm:text-left">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Task Management</h1>
          <p class="text-gray-400 text-sm sm:text-base">Organize your tasks efficiently</p>
        </header>
  
        <!-- Add Task Section - Improved responsiveness -->
        <div class="bg-[#2a2d35] rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <div class="space-y-6">
            <!-- Task Name Input -->
            <div class="space-y-2">
              <label class="block text-gray-300 text-sm font-medium">Task Name</label>
              <div class="relative">
                <input 
                  v-model="newTask.name" 
                  type="text" 
                  placeholder="Enter your task here..."
                  class="w-full h-12 bg-[#1f2127] border-2 border-[#3a3f4b] rounded-lg 
                         px-4 text-white placeholder-gray-500 text-base
                         focus:border-[#76ABAE] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/20
                         transition-all duration-300" 
                  @keyup.enter="addTask"
                />
                <span class="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm
                             bg-[#1f2127] px-2 py-1 rounded-md border border-[#3a3f4b]">
                  Press Enter ↵
                </span>
              </div>
            </div>
            
            <!-- Task Details Grid -->
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <!-- Priority Section -->
              <div class="space-y-2">
                <label class="block text-gray-300 text-sm font-medium">Priority Level</label>
                <div class="relative">
                  <select 
                    v-model="newTask.priority" 
                    class="w-full h-12 bg-[#1f2127] border-2 border-[#3a3f4b] rounded-lg 
                           px-4 pr-10 text-gray-200 text-base appearance-none cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/20 focus:border-[#76ABAE]
                           transition-all duration-200"
                  >
                    <option value="low" class="bg-[#1f2127]">Low Priority</option>
                    <option value="medium" class="bg-[#1f2127]">Medium Priority</option>
                    <option value="high" class="bg-[#1f2127]">High Priority</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <!-- Priority Indicators -->
                <div class="flex gap-2">
                  <div class="flex items-center gap-2 bg-[#1f2127] px-2 py-1 rounded-md">
                    <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    <span class="text-xs text-gray-300">Low</span>
                  </div>
                  <div class="flex items-center gap-2 bg-[#1f2127] px-2 py-1 rounded-md">
                    <div class="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <span class="text-xs text-gray-300">Medium</span>
                  </div>
                  <div class="flex items-center gap-2 bg-[#1f2127] px-2 py-1 rounded-md">
                    <div class="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <span class="text-xs text-gray-300">High</span>
                  </div>
                </div>
              </div>
              
              <!-- Due Date Section -->
              <div class="space-y-2">
                <label class="block text-gray-300 text-sm font-medium">Due Date</label>
                <input 
                  type="date" 
                  v-model="newTask.dueDate"
                  class="w-full h-12 bg-[#1f2127] border-2 border-[#3a3f4b] rounded-lg 
                         px-4 text-white text-base cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/20 focus:border-[#76ABAE]
                         transition-all duration-200 [color-scheme:dark]"
                />
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3 items-end justify-end sm:mt-7">
                <button 
                  class="group relative w-full sm:w-auto px-4 py-2 bg-[#76ABAE] text-white rounded-lg 
                         hover:bg-[#5a8d90] text-base font-medium flex items-center justify-center gap-2
                         transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                         focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/20
                         transform hover:translate-y-[-1px] active:translate-y-[1px]"
                  @click="addTask"
                  :disabled="!newTask.name.trim()"
                >
                  <span class="relative flex items-center gap-2">
                    <span>Add Task</span>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                         class="h-5 w-5 transform group-hover:rotate-90 transition-transform duration-200" 
                         fill="none" 
                         viewBox="0 0 24 24" 
                         stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                  <span class="absolute bottom-0 left-0 right-0 h-1 bg-black/10 transform origin-left"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Task Columns - Responsive Grid -->
        <div class="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          <div 
            v-for="section in sections" 
            :key="section.id" 
            class="bg-[#2a2d35] rounded-xl shadow-lg flex flex-col"
          >
            <!-- Section Header -->
            <div class="p-3 sm:p-4 border-b border-[#3a3f4b] sticky top-0 bg-[#2a2d35] z-10">
              <div class="flex justify-between items-center">
                <h2 class="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                  <span>{{ section.title }}</span>
                  <span class="text-xs sm:text-sm bg-[#1f2127] px-2 py-1 rounded-full text-gray-400">
                    {{ section.tasks.length }}
                  </span>
                </h2>
              </div>
            </div>
  
            <!-- Tasks List with improved scrolling -->
            <div 
              v-if="section.tasks.length > 0"
              class="p-3 sm:p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3a3f4b] scrollbar-track-[#1f2127]"
            >
              <div 
                v-for="task in section.tasks" 
                :key="task.id" 
                class="bg-[#1f2127] rounded-lg p-4 group hover:shadow-md transition-all duration-300
                       border-2 border-transparent hover:border-[#3a3f4b]"
              >
                <!-- Task Content -->
                <div class="flex items-start justify-between gap-4">
                  <div class="flex items-start space-x-3 flex-grow min-w-0">
                    <!-- Checkbox - Only show in Done section -->
                    <div 
                      v-if="section.title === 'Done'"
                      class="flex-shrink-0 w-5 h-5 rounded border-2 border-gray-500 cursor-pointer
                             hover:border-[#76ABAE] transition-colors duration-300 mt-1"
                      :class="{ 'bg-[#76ABAE] border-[#76ABAE]': task.completed }"
                      @click="toggleTaskStatus(task, section)"
                    >
                      <svg 
                        v-if="task.completed"
                        xmlns="http://www.w3.org/2000/svg" 
                        class="h-4 w-4 text-white" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    
                    <!-- Task Details - Adjust padding based on section -->
                    <div class="flex-grow min-w-0" :class="{ 'pl-0': section.title !== 'Done' }">
                      <div 
                        class="text-white mb-2 cursor-pointer truncate"
                        :class="{ 'line-through text-gray-500': task.completed }"
                        @dblclick="editTask(task)"
                        :title="task.name"
                      >
                        {{ task.name }}
                      </div>
                      
                      <!-- Task Metadata -->
                      <div class="flex flex-wrap items-center gap-2 text-sm">
                        <span 
                          class="px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                          :class="{
                            'bg-red-900/30 text-red-400': task.priority === 'high',
                            'bg-yellow-900/30 text-yellow-400': task.priority === 'medium',
                            'bg-green-900/30 text-green-400': task.priority === 'low'
                          }"
                        >
                          {{ task.priority }}
                        </span>
                        <span class="text-gray-500 whitespace-nowrap">
                          {{ formatDate(task.dueDate) }}
                        </span>
                        <span v-if="task.status" class="text-[#76ABAE] whitespace-nowrap">
                          {{ task.status }}
                        </span>
                        <span v-if="task.timeSpent" class="text-gray-400 whitespace-nowrap">
                          {{ task.timeSpent }}
                        </span>
                      </div>
                    </div>
                  </div>
  
                  <!-- Task Actions -->
                  <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                    <button 
                      v-if="section.title === 'To Do'"
                      @click="moveToProgress(task, section)"
                      class="text-gray-500 hover:text-[#76ABAE] transition-colors px-2 py-1 rounded whitespace-nowrap"
                      title="Move to In Progress"
                    >
                      Start
                    </button>
  
                    <button 
                      v-if="section.title === 'In Progress'"
                      @click="moveToCompleted(task, section)"
                      class="text-gray-500 hover:text-[#76ABAE] transition-colors px-2 py-1 rounded whitespace-nowrap"
                      title="Mark as Complete"
                    >
                      Complete
                    </button>
  
                    <button 
                      @click="deleteTask(section, task)"
                      class="text-gray-500 hover:text-red-400 transition-colors ml-2 flex-shrink-0"
                      title="Delete Task"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { v4 as uuidv4 } from 'uuid';

  export default {
    components: {

    },
    data() {
      return {
        newTask: {
          name: '',
          priority: 'medium',
          dueDate: new Date().toISOString().split('T')[0]
        },
        sections: []
      };
    },
  
    created() {
      const savedSections = localStorage.getItem('todo-sections');
      this.sections = savedSections ? JSON.parse(savedSections) : [
        {
          id: uuidv4(),
          title: 'To Do',
          tasks: []
        },
        {
          id: uuidv4(),
          title: 'In Progress',
          tasks: []
        },
        {
          id: uuidv4(),
          title: 'Done',
          tasks: []
        }
      ];
    },
  
    watch: {
      sections: {
        handler(newSections) {
          localStorage.setItem('todo-sections', JSON.stringify(newSections));
        },
        deep: true
      }
    },
  
    methods: {
      addTask() {
        if (this.newTask.name.trim() !== '') {
          this.sections[0].tasks.unshift({
            id: uuidv4(),
            name: this.newTask.name,
            completed: false,
            priority: this.newTask.priority,
            dueDate: this.newTask.dueDate
          });
          
          this.cancelTask();
        }
      },
  
      cancelTask() {
        this.newTask = {
          name: '',
          priority: 'medium',
          dueDate: new Date().toISOString().split('T')[0]
        };
      },
  
      toggleTask(task) {
        task.completed = !task.completed;
      },
  
      deleteTask(section, task) {
        const taskIndex = section.tasks.indexOf(task);
        if (taskIndex > -1) {
          section.tasks.splice(taskIndex, 1);
        }
      },
  
      editTask(task) {
        const newName = prompt('Edit task:', task.name);
        if (newName !== null && newName.trim() !== '') {
          task.name = newName.trim();
        }
      },
  
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        });
      },
  
      addTaskToSection(index) {
        const taskName = prompt('Enter task name');
        if (taskName && taskName.trim() !== '') {
          this.sections[index].tasks.unshift({
            id: uuidv4(),
            name: taskName.trim(),
            completed: false,
            priority: 'medium',
            dueDate: new Date().toISOString().split('T')[0]
          });
        }
      },
      moveToProgress(task, fromSection) {
      // Remove from current section
      const taskIndex = fromSection.tasks.indexOf(task);
      if (taskIndex > -1) {
        fromSection.tasks.splice(taskIndex, 1);
        
        // Add to In Progress section
        this.sections[1].tasks.unshift({
          ...task,
          status: 'In Progress',
          startTime: new Date().toISOString()
        });
      }
    },

    moveToCompleted(task, fromSection) {
      // Remove from current section
      const taskIndex = fromSection.tasks.indexOf(task);
      if (taskIndex > -1) {
        fromSection.tasks.splice(taskIndex, 1);
        
        // Calculate time spent in progress
        const timeSpent = task.startTime ? 
          this.calculateTimeSpent(new Date(task.startTime)) : 
          'N/A';

        // Add to Done section
        this.sections[2].tasks.unshift({
          ...task,
          completed: true,
          status: 'Completed',
          completedAt: new Date().toISOString(),
          timeSpent: timeSpent
        });
      }
    },

    toggleTaskStatus(task, section) {
      if (section.title === 'Done') {
        // If unchecking in Done section, move back to In Progress
        const taskIndex = section.tasks.indexOf(task);
        if (taskIndex > -1) {
          section.tasks.splice(taskIndex, 1);
          this.sections[1].tasks.unshift({
            ...task,
            completed: false,
            status: 'In Progress',
            startTime: new Date().toISOString()
          });
        }
      } else if (section.title === 'In Progress') {
        // If checking in In Progress, move to Done
        this.moveToCompleted(task, section);
      } else {
        // If in To Do, move to In Progress
        this.moveToProgress(task, section);
      }
    },

    calculateTimeSpent(startTime) {
      const endTime = new Date();
      const diff = endTime - startTime;
      
      // Convert to hours and minutes
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    },

    // Optional: Add method to revert task to previous state
    revertTask(task, section) {
      const taskIndex = section.tasks.indexOf(task);
      if (taskIndex > -1) {
        section.tasks.splice(taskIndex, 1);
        
        if (section.title === 'Done') {
          // Revert to In Progress
          this.sections[1].tasks.unshift({
            ...task,
            completed: false,
            status: 'In Progress'
          });
        } else if (section.title === 'In Progress') {
          // Revert to To Do
          this.sections[0].tasks.unshift({
            ...task,
            status: null,
            startTime: null
          });
        }
      }
    }
  }
};
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  
  :root {
    font-family: 'Inter', sans-serif;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #1f2127;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #3a3f4b;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #4a4f5b;
  }
  
  /* Smooth transitions */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease;
  }
  
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  
  /* Add custom scrollbar styles */
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: #1f2127;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #3a3f4b;
    border-radius: 3px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #4a4f5b;
  }
  
  /* Add responsive font sizes */
  @media (max-width: 640px) {
    :root {
      font-size: 14px;
    }
  }
  
  /* Add smooth transitions for all interactive elements */
  button, input, select {
    transition: all 0.2s ease-in-out;
  }
  
  /* Add focus styles for better accessibility */
  button:focus, input:focus, select:focus {
    outline: 2px solid #76ABAE;
    outline-offset: 2px;
  }
  
  /* Add touch-friendly tap targets for mobile */
  @media (max-width: 640px) {
    button, input, select {
      min-height: 44px;
    }
  }
  </style>