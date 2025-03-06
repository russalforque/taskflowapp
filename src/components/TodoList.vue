<template>
  <transition name="page" appear>
    <div class="min-h-screen bg-[#181A1E] py-5 px-4 sm:px-6 lg:px-8">
      <div class="container mx-auto max-w-full">
        <header class="mb-4 text-center sm:text-left">

          <div className="grid grid-cols-2 gap-4">
            <div className="row-span-2">
              <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Task Management</h1>
              <p class="text-gray-400 text-sm sm:text-base">Organize your tasks efficiently</p>
            </div>
            <div className="col-start-2 row-start-2">
              <div class="flex justify-end">
                <button @click="showModal = true" class="group relative px-5 py-3 bg-[#76ABAE] text-white rounded-xl 
                   hover:bg-[#5a8d90] text-sm font-medium flex items-center gap-2 mx-auto sm:mx-0
                   transition-all duration-300 shadow-lg hover:shadow-xl
                   focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/20
                   transform hover:translate-y-[-2px] active:translate-y-[1px]">
                  <span>Add New Task</span>
                  <PlusIcon></PlusIcon>
                </button>
              </div>
            </div>
          </div>


        </header>

        <!-- Task Columns - Responsive Grid -->
        <div class="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          <div v-for="section in sections" :key="section.id" class="bg-[#2a2d35] rounded shadow-lg flex flex-col">
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
            <div v-if="section.tasks.length > 0"
              class="p-3 sm:p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3a3f4b] scrollbar-track-[#1f2127]">
              <div v-for="task in section.tasks" :key="task.id" class="bg-[#1f2127] rounded-lg p-4 group hover:shadow-md transition-all duration-300
                       border-2 border-transparent hover:border-[#3a3f4b]">
                <!-- Task Content -->
                <div class="flex items-start justify-between gap-4">
                  <div class="flex items-start space-x-3 flex-grow min-w-0">
                    <!-- Checkbox - Only show in Done section -->
                    <div v-if="section.title === 'Done'" class="flex-shrink-0 w-5 h-5 rounded border-2 border-gray-500 cursor-pointer
                             hover:border-[#76ABAE] transition-colors duration-300 mt-1"
                      :class="{ 'bg-[#76ABAE] border-[#76ABAE]': task.completed }"
                      @click="toggleTaskStatus(task, section)">
                      <CheckIcon v-if="task.completed"></CheckIcon>
                    </div>

                    <!-- Task Details - Adjust padding based on section -->
                    <div class="flex-grow min-w-0" :class="{ 'pl-0': section.title !== 'Done' }">
                      <div class="text-white mb-2 cursor-pointer truncate"
                        :class="{ 'line-through text-gray-500': task.completed }" @dblclick="editTask(task)"
                        :title="task.name">
                        {{ task.name }}
                      </div>

                      <!-- Task Metadata -->
                      <div class="flex flex-wrap items-center gap-2 text-sm">
                        <span class="px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap" :class="{
                          'bg-red-900/30 text-[#D84040]': task.priority === 'high',
                          'bg-yellow-900/30 text-[#D98324]': task.priority === 'medium',
                          'bg-green-900/30 text-[#4E9F3D]': task.priority === 'low'
                        }">
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
                  <div
                    class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                    <button v-if="section.title === 'To Do'" @click="moveToProgress(task, section)"
                      class="text-gray-500 hover:text-[#76ABAE] transition-colors px-2 py-1 rounded whitespace-nowrap"
                      title="Move to In Progress">
                      Start
                    </button>

                    <button v-if="section.title === 'In Progress'" @click="moveToCompleted(task, section)"
                      class="text-gray-500 hover:text-[#76ABAE] transition-colors px-2 py-1 rounded whitespace-nowrap"
                      title="Mark as Complete">
                      Complete
                    </button>

                    <button @click="deleteTask(section, task)"
                      class="text-gray-500 hover:text-red-400 transition-colors ml-2 flex-shrink-0" title="Delete Task">
                     <BinIcon></BinIcon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- Modal -->
        <transition name="modal">
          <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
            aria-modal="true">

            <div class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" @click="showModal = false"></div>

            <!-- Modal panel -->
            <div class="flex min-h-screen items-center justify-center p-4">
              <div
                class="relative transform overflow-hidden bg-gradient-to-b from-[#2a2d35] to-[#1f2127] rounded-2xl shadow-2xl transition-all max-w-lg w-full border border-[#3a3f4b]/30">
                <!-- Modal header -->
                <div class="border-b border-[#3a3f4b] px-8 py-6">
                  <div class="flex items-center justify-between">
                    <h3
                      class="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Create New Task</h3>
                    <button @click="showModal = false"
                      class="text-gray-400 hover:text-white transition-colors duration-300 hover:rotate-90 transform">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p class="mt-2 text-gray-400 text-sm">Fill in the details below to create a new task</p>
                </div>

                <!-- Modal body with enhanced spacing and animations -->
                <div class="p-8">
                  <div class="space-y-8">
                    <!-- Task Name Input with floating label -->
                    <div class="relative">
                      <input v-model="newTask.name" type="text" id="taskName" placeholder=" " class="peer w-full h-14 bg-[#1F2127] border-2 border-[#3a3f4b] rounded-xl 
                               px-4 pt-4 text-white text-lg placeholder-transparent
                               focus:border-[#76ABAE] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/20
                               transition-all duration-300" @keyup.enter="addTaskAndClose" />
                      <label for="taskName" class="absolute left-4 top-1 text-xs font-medium text-gray-400
                               transition-all duration-200 peer-placeholder-shown:top-4 
                               peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs">
                        Task Name
                      </label>
                    </div>

                    <!-- Task Details Grid with -->
                    <div class="grid gap-8 sm:grid-cols-2">
                      <!-- Priority Section with -->
                      <div class="space-y-3">
                        <label class="block text-gray-300 text-sm font-medium">Priority Level</label>
                        <div class="relative">
                          <select v-model="newTask.priority" class="w-full h-14 bg-[#1f2127] border-2 border-[#3a3f4b] rounded-xl 
                                   px-4 text-gray-200 text-base appearance-none cursor-pointer
                                   focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/20 focus:border-[#76ABAE]
                                   transition-all duration-300">
                            <option value="low" class="bg-[#1f2127]">Low Priority</option>
                            <option value="medium" class="bg-[#1f2127]">Medium Priority</option>
                            <option value="high" class="bg-[#1f2127]">High Priority</option>
                          </select>
                          <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <!-- Priority Indicators -->
                        <div class="flex gap-2">
                          <div
                            class="flex items-center gap-2 bg-[#1f2127]/50 px-3 py-2 rounded-lg border border-[#3a3f4b]/30">
                            <div class="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/20"></div>
                            <span class="text-sm text-gray-300">Low</span>
                          </div>
                          <div
                            class="flex items-center gap-2 bg-[#1f2127]/50 px-3 py-2 rounded-lg border border-[#3a3f4b]/30">
                            <div class="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/20"></div>
                            <span class="text-sm text-gray-300">Medium</span>
                          </div>
                          <div
                            class="flex items-center gap-2 bg-[#1f2127]/50 px-3 py-2 rounded-lg border border-[#3a3f4b]/30">
                            <div class="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/20"></div>
                            <span class="text-sm text-gray-300">High</span>
                          </div>
                        </div>
                      </div>

                      <!-- Due Date Section -->
                      <div class="space-y-3">
                        <label class="block text-gray-300 text-sm font-medium">Due Date</label>
                        <input type="date" v-model="newTask.dueDate" class="w-full h-14 bg-[#1f2127] border-2 border-[#3a3f4b] rounded-xl 
                                 px-4 text-white text-base cursor-pointer
                                 focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/20 focus:border-[#76ABAE]
                                 transition-all duration-300 [color-scheme:dark]" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Modal footer -->
                <div class="border-t border-[#3a3f4b] px-8 py-6 flex justify-end gap-4">
                  <button @click="showModal = false" class="px-6 py-3 text-gray-300 text-sm hover:text-white transition-colors duration-300
                           hover:bg-[#3a3f4b]/30 rounded-xl">
                    Cancel
                  </button>
                  <button class="group relative px-6 py-3 bg-[#76ABAE] text-white rounded-xl
                           hover:bg-[#5a8d90] text-sm font-medium flex items-center justify-center gap-2
                           transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                           focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/20 shadow-lg
                           hover:shadow-xl hover:shadow-[#76ABAE]/10
                           transform hover:translate-y-[-2px] active:translate-y-[1px]" @click="addTaskAndClose"
                    :disabled="!newTask.name.trim()">
                    <span>Create Task</span>
                    <ArrowRightIcon></ArrowRightIcon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import CheckIcon from './svg/CheckIcon.vue';
import PlusIcon from './svg/PlusIcon.vue';
import BinIcon from './svg/BinIcon.vue';
import ArrowRightIcon from './svg/ArrowRightIcon.vue';

export default {
  components: {
    CheckIcon,
    PlusIcon,
    BinIcon,
    ArrowRightIcon,

  },
  data() {
    return {
      newTask: {
        name: '',
        priority: 'medium',
        dueDate: new Date().toISOString().split('T')[0]
      },
      sections: [],
      showModal: false
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
    },

    addTaskAndClose() {
      this.addTask();
      this.showModal = false;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

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

:root {
  font-family: 'Inter', sans-serif;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #1f2127;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #3a3f4b;
  border-radius: 3px;
  transition: background-color 0.2s ease;
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
  height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #1f2127;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #3a3f4b;
  border-radius: 3px;
  transition: background-color 0.2s ease;
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

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .fixed.inset-0.flex,
.modal-leave-active .fixed.inset-0.flex {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .fixed.inset-0.flex,
.modal-leave-to .fixed.inset-0.flex {
  opacity: 0;
  transform: scale(0.95);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

.modal-enter-to .fixed.inset-0.flex,
.modal-leave-from .fixed.inset-0.flex {
  opacity: 1;
  transform: scale(1);
}

/* Add smooth transitions for all interactive elements */
button,
input,
select {
  transition: all 0.2s ease-in-out;
}

/* Add focus styles for better accessibility */
button:focus,
input:focus,
select:focus {
  outline: 2px solid #76ABAE;
  outline-offset: 2px;
}

/* Add touch-friendly tap targets for mobile */
@media (max-width: 640px) {

  button,
  input,
  select {
    min-height: 44px;
  }
}
</style>