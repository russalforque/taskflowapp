<template>
    <div class="min-h-screen bg-gradient-to-br from-[#1a1c23] to-[#23272e] py-8">
      <div class="container mx-auto px-4 max-w-4xl">
        <!-- Header -->
        <header class="mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">Task Management</h1>
          <p class="text-gray-400">Organize your tasks efficiently</p>
        </header>
  
        <!-- Add Task Section -->
        <div class="bg-[#2a2d35] rounded-xl shadow-lg p-6 mb-8 transform transition-all duration-300 hover:shadow-2xl">
          <div class="space-y-4">
            <div class="relative">
              <input 
                v-model="newTask.name" 
                type="text" 
                placeholder="What needs to be done?"
                class="w-full h-12 bg-[#1f2127] border-2 border-[#3a3f4b] rounded-lg px-4 text-white placeholder-gray-500 
                       focus:border-[#76ABAE] focus:outline-none transition-colors duration-300" 
                @keyup.enter="addTask"
              />
              <span class="absolute right-4 top-3 text-gray-500 text-sm">Press Enter to add</span>
            </div>
            
            <div class="flex flex-wrap gap-4">
              <div class="flex-1 min-w-[200px]">
                <label class="block text-gray-400 text-sm mb-2">Priority</label>
                <select 
                  v-model="newTask.priority" 
                  class="w-full bg-[#1f2127] border-2 border-[#3a3f4b] rounded-lg p-2 text-white cursor-pointer
                         focus:border-[#76ABAE] focus:outline-none transition-colors duration-300"
                >
                  <option value="low">🟢 Low Priority</option>
                  <option value="medium">🟡 Medium Priority</option>
                  <option value="high">🔴 High Priority</option>
                </select>
              </div>
              
              <div class="flex-1 min-w-[200px]">
                <label class="block text-gray-400 text-sm mb-2">Due Date</label>
                <input 
                  type="date" 
                  v-model="newTask.dueDate"
                  class="w-full bg-[#1f2127] border-2 border-[#3a3f4b] rounded-lg p-2 text-white
                         focus:border-[#76ABAE] focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>
  
            <div class="flex justify-end space-x-3 pt-2">
              <button 
                class="px-4 py-2 rounded-lg border-2 border-[#3a3f4b] text-gray-400 hover:bg-[#1f2127] 
                       transition-colors duration-300"
                @click="cancelTask"
              >
                Cancel
              </button>
              <button 
                class="px-6 py-2 bg-[#76ABAE] text-white rounded-lg hover:bg-[#5a8d90] 
                       transition-colors duration-300 flex items-center space-x-2"
                @click="addTask"
                :disabled="!newTask.name.trim()"
              >
                <span>Add Task</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
  
        <!-- Task Sections -->
        <div class="grid gap-6 md:grid-cols-3">
    <div 
      v-for="section in sections" 
      :key="section.id" 
      class="bg-[#2a2d35] rounded-xl p-6 shadow-lg"
    >
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-white flex items-center space-x-2">
          <span>{{ section.title }}</span>
          <span class="text-sm bg-[#1f2127] px-2 py-1 rounded-full text-gray-400">
            {{ section.tasks.length }}
          </span>
        </h2>
      </div>
      
      <div class="space-y-3">
        <div 
          v-for="task in section.tasks" 
          :key="task.id" 
          class="bg-[#1f2127] rounded-lg p-4 group hover:shadow-md transition-all duration-300
                 border-2 border-transparent hover:border-[#3a3f4b]"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-3 flex-grow">
              <div 
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
              
              <div class="flex-grow">
                <div 
                  class="text-white mb-2 cursor-pointer"
                  :class="{ 'line-through text-gray-500': task.completed }"
                  @dblclick="editTask(task)"
                >
                  {{ task.name }}
                </div>
                
                <div class="flex items-center space-x-3 text-sm">
                  <span 
                    class="px-2 py-1 rounded-full text-xs font-medium"
                    :class="{
                      'bg-red-900/30 text-red-400': task.priority === 'high',
                      'bg-yellow-900/30 text-yellow-400': task.priority === 'medium',
                      'bg-green-900/30 text-green-400': task.priority === 'low'
                    }"
                  >
                    {{ task.priority }}
                  </span>
                  <span class="text-gray-500">
                    {{ formatDate(task.dueDate) }}
                  </span>
                  <span 
                    v-if="task.status" 
                    class="text-[#76ABAE]"
                  >
                    {{ task.status }}
                  </span>
                  <span 
                    v-if="task.timeSpent" 
                    class="text-gray-400"
                  >
                    {{ task.timeSpent }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <!-- Action Buttons -->
              <button 
                v-if="section.title === 'To Do'"
                @click="moveToProgress(task, section)"
                class="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-[#76ABAE] 
                       transition-all duration-300 px-2 py-1 rounded"
                title="Move to In Progress"
              >
                Start
              </button>

              <button 
                v-if="section.title === 'In Progress'"
                @click="moveToCompleted(task, section)"
                class="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-[#76ABAE] 
                       transition-all duration-300 px-2 py-1 rounded"
                title="Mark as Complete"
              >
                Complete
              </button>

              <button 
                @click="deleteTask(section, task)"
                class="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 
                       transition-all duration-300 ml-2"
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
  </style>