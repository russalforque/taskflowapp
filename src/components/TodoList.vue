<template>
    <div class="bg-[#181A1E] min-h-screen">
      <div class="p-6 mx-auto max-w-4xl rounded-xl shadow-md space-y-4">
        <!-- Add Task Section -->
        <div class="bg-[#1F2127] p-4 rounded-lg">
          <div class="space-y-2">
            <input 
              v-model="newTask.name" 
              type="text" 
              placeholder="What needs to be done?"
              class="w-full h-12 border rounded p-2 text-[#000]" 
              @keyup.enter="addTask"
            />
            <div class="flex space-x-4">
              <select v-model="newTask.priority" class="rounded p-2">
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input 
                type="date" 
                v-model="newTask.dueDate"
                class="rounded p-2"
              />
            </div>
          </div>
        </div>
  
        <div class="flex items-end justify-end space-x-2">
          <button class="bg-[#76ABAE] text-white px-4 py-2 rounded hover:bg-[#5a8d90]" @click="addTask">
            Add task
          </button>
          <button class="px-4 py-2 border rounded hover:bg-gray-700" @click="cancelTask">
            Cancel
          </button>
        </div>
  
        <!-- Sections -->
        <div class="bg-[#1F2127] p-4 rounded-lg">
          <div class="space-y-6">
            <div 
              v-for="(section, index) in sections" 
              :key="section.id" 
              class="space-y-3"
            >
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold">{{ section.title }}</h2>
                <button 
                  class="text-sm text-[#76ABAE]"
                  @click="addTaskToSection(index)"
                >
                  + Add Task
                </button>
              </div>
              
              <div class="space-y-2">
                <div 
                  v-for="task in section.tasks" 
                  :key="task.id" 
                  class="flex items-center justify-between bg-[#252830] p-3 rounded"
                >
                  <div class="flex items-center space-x-3">
                    <input type="checkbox" v-model="task.completed" />
                    <span 
                      :class="{ 'line-through text-gray-500': task.completed }"
                      @dblclick="editTask(task)"
                    >
                      {{ task.name }}
                    </span>
                  </div>
                  
                  <div class="flex items-center space-x-3">
                    <span 
                      :class="{
                        'text-red-500': task.priority === 'high',
                        'text-yellow-500': task.priority === 'medium',
                        'text-green-500': task.priority === 'low'
                      }"
                      class="text-sm"
                    >
                      {{ task.priority }}
                    </span>
                    <span class="text-sm text-gray-400">
                      {{ formatDate(task.dueDate) }}
                    </span>
                    <button 
                      @click="deleteTask(section, task)"
                      class="text-red-400 hover:text-red-600"
                    >
                      ×
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
      // Load from localStorage
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
          this.sections[0].tasks.push({
            id: uuidv4(),
            name: this.newTask.name,
            completed: false,
            priority: this.newTask.priority,
            dueDate: this.newTask.dueDate
          });
          
          this.newTask = {
            name: '',
            priority: 'medium',
            dueDate: new Date().toISOString().split('T')[0]
          };
        }
      },
  
      cancelTask() {
        this.newTask = {
          name: '',
          priority: 'medium',
          dueDate: new Date().toISOString().split('T')[0]
        };
      },
  
      deleteTask(section, task) {
        const taskIndex = section.tasks.indexOf(task);
        if (taskIndex > -1) {
          section.tasks.splice(taskIndex, 1);
        }
      },
  
      editTask(task) {
        const newName = prompt('Edit task:', task.name);
        if (newName !== null) {
          task.name = newName;
        }
      },
  
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      },
  
      addTaskToSection(index) {
        const taskName = prompt('Enter task name');
        if (taskName) {
          this.sections[index].tasks.push({
            id: uuidv4(),
            name: taskName,
            completed: false,
            priority: 'medium',
            dueDate: new Date().toISOString().split('T')[0]
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  input[type="checkbox"]:checked+span {
      text-decoration: line-through;
      color: gray;
  }
  </style>