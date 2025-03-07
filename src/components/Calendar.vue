<template>
  <div class="calendar-container min-h-screen bg-[#181A1E] p-6">
    <!-- Main Content -->
    <div class="max-w-screen-full mx-auto space-y-6">
      <!-- Header Section -->
      <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-2xl font-bold text-white">Schedule Manager</h2>
          <p class="text-gray-400 text-sm mt-1">Manage your work schedules and shifts</p>
        </div>
        <div class="flex items-center gap-3 self-end sm:self-auto">
          <div class="flex items-center bg-[#1f2937] rounded-lg p-1">
            <button 
              @click="toggleView"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-[#76ABAE] rounded-md hover:bg-[#374151] transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span>{{ viewMode }}</span>
            </button>
            <button 
              @click="goToToday"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-[#76ABAE] rounded-md hover:bg-[#374151] transition-colors duration-200"
            >
              Today
            </button>
          </div>
          <button 
            @click="createNewSchedule"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#76ABAE] rounded-md hover:bg-[#5a8d90] transition-colors duration-200 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Schedule
          </button>
        </div>
      </header>

      <!-- Calendar Grid -->
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Calendar Section -->
        <div class="lg:col-span-2">
          <div class="bg-[#1f2937] rounded-xl shadow-xl border border-gray-700 overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="flex space-x-4">
                  <button 
                    v-for="view in viewOptions" 
                    :key="view.value"
                    @click="currentView = view.value"
                    :class="[
                      'px-3 py-1 text-sm rounded-md transition-colors duration-200',
                      currentView === view.value 
                        ? 'bg-[#76ABAE] text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    ]"
                  >
                    {{ view.label }}
                  </button>
                </div>
                <div class="flex items-center space-x-2 text-gray-400">
                  <span class="text-sm">Quick filters:</span>
                  <select 
                    v-model="scheduleFilter"
                    class="bg-gray-700 border-gray-600 text-white rounded-md text-sm"
                  >
                    <option value="all">All Schedules</option>
                    <option value="regular">Regular</option>
                    <option value="overtime">Overtime</option>
                    <option value="leave">Leave</option>
                  </select>
                </div>
              </div>
              <Transition name="fade" mode="out-in">
                <v-calendar
                  ref="calendar"
                  v-model="selectedDate"
                  :masks="masks"
                  :attributes="filteredAttributes"
                  :is-expanded="true"
                  :columns="columns"
                  :first-day-of-week="1"
                  class="custom-calendar dark"
                  @dayclick="onDayClick"
                  @update:from-page="updatePage">
                </v-calendar>
              </Transition>
            </div>
          </div>
        </div>

        <!-- Schedule Details Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-[#1f2937] rounded-xl shadow-xl border border-gray-700 p-6 sticky top-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-[#76ABAE] flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ formatDate(selectedDate) }}
              </h3>
              <span class="text-sm text-gray-400">
                {{ getWorkingHours(selectedDateEvents) }} hrs
              </span>
            </div>
            
            <div v-if="selectedDateEvents.length > 0" class="space-y-3">
              <div 
                v-for="event in selectedDateEvents" 
                :key="event.id"
                class="flex flex-col p-4 rounded-lg border border-gray-700 hover:border-[#76ABAE] transition-colors duration-200 bg-[#374151] group"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center space-x-2">
                      <span 
                        class="w-2 h-2 rounded-full"
                        :class="{
                          'bg-blue-500': event.type === 'regular',
                          'bg-yellow-500': event.type === 'overtime',
                          'bg-green-500': event.type === 'leave'
                        }"
                      ></span>
                      <h4 class="font-medium text-gray-200 truncate">{{ event.name }}</h4>
                    </div>
                    <div class="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                      <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ formatTime(event.startTime) }} - {{ formatTime(event.endTime) }}
                      </span>
                      <span 
                        class="px-2 py-1 text-xs rounded-full"
                        :class="{
                          'bg-yellow-500/20 text-yellow-300': event.status === 'pending',
                          'bg-green-500/20 text-green-300': event.status === 'approved',
                          'bg-red-500/20 text-red-300': event.status === 'denied'
                        }"
                      >
                        {{ event.status }}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                      @click="editEvent(event)"
                      class="text-gray-400 hover:text-[#76ABAE] transition-colors duration-200 p-1"
                      title="Edit Schedule"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      @click="deleteEvent(event)"
                      class="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                      title="Delete Schedule"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="mt-2 text-sm text-gray-400">
                  {{ event.description }}
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-gray-500">No schedules for this day</p>
              <button 
                @click="createNewSchedule"
                class="mt-4 text-sm text-[#76ABAE] hover:text-[#5a8d90] transition-colors duration-200"
              >
                Create a new schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Schedule Modal -->
    <TransitionRoot appear :show="showEventModal" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/70" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-xl bg-[#1f2937] p-8 shadow-xl transition-all border border-gray-700">
                <DialogTitle as="h3" class="text-xl font-semibold text-[#76ABAE] mb-8 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ editingEvent ? 'Edit Schedule' : 'New Schedule' }}
                </DialogTitle>

                <form @submit.prevent="saveEvent" class="space-y-6">
                  <!-- Schedule Type Selection with Icons -->
                  <div class="grid grid-cols-4 gap-4">
                    <button
                      type="button"
                      v-for="type in scheduleTypes"
                      :key="type.value"
                      @click="selectScheduleType(type)"
                      :class="[
                        'p-4 rounded-lg border text-center transition-all duration-200',
                        newEvent.type === type.value
                          ? 'border-[#76ABAE] bg-[#76ABAE]/10 text-[#76ABAE]'
                          : 'border-gray-600 hover:border-gray-500 text-gray-400'
                      ]"
                    >
                      <component :is="type.icon" class="h-6 w-6 mx-auto mb-2" />
                      <span class="text-sm font-medium">{{ type.label }}</span>
                    </button>
                  </div>

                  <!-- Schedule Details -->
                  <div>
                    <label class="block text-base font-medium text-gray-300 mb-2">Schedule Name</label>
                    <input 
                      v-model="newEvent.name"
                      type="text"
                      class="block w-full px-4 py-3 rounded-lg border-gray-600 bg-gray-700 text-white text-base shadow-sm focus:border-[#76ABAE] focus:ring focus:ring-[#76ABAE] focus:ring-opacity-50"
                      :placeholder="getSchedulePlaceholder(newEvent.type)"
                      required
                    >
                  </div>

                  <!-- Date Range with Calendar Popup -->
                  <div class="space-y-4">
                    <div class="flex items-center justify-between mb-2">
                      <label class="text-base font-medium text-gray-300">Date Range</label>
                      <div class="flex items-center gap-3">
                        <button
                          type="button"
                          v-for="preset in datePresets"
                          :key="preset.label"
                          @click="applyDatePreset(preset)"
                          class="px-3 py-2 text-sm font-medium rounded-md border border-gray-600 hover:border-[#76ABAE] text-gray-400 hover:text-[#76ABAE] transition-all duration-200"
                        >
                          {{ preset.label }}
                        </button>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                      <!-- Start Date Input -->
                      <div class="relative">
                        <label class="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                        <div class="relative">
                          <input 
                            v-model="newEvent.startDate"
                            type="date"
                            class="block w-full px-4 py-3 pl-12 rounded-lg border-gray-600 bg-gray-700 text-white text-base shadow-sm focus:border-[#76ABAE] focus:ring focus:ring-[#76ABAE] focus:ring-opacity-50"
                            required
                            :min="getMonday(new Date())"
                            :max="getFriday(new Date())"
                          >
                          <div class="absolute left-3 top-1/2 -translate-y-1/2">
                            <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <!-- End Date Input -->
                      <div class="relative">
                        <label class="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                        <div class="relative">
                          <input 
                            v-model="newEvent.endDate"
                            type="date"
                            class="block w-full px-4 py-3 pl-12 rounded-lg border-gray-600 bg-gray-700 text-white text-base shadow-sm focus:border-[#76ABAE] focus:ring focus:ring-[#76ABAE] focus:ring-opacity-50"
                            required
                            :min="newEvent.startDate"
                            :max="getFriday(new Date(newEvent.startDate))"
                          >
                          <div class="absolute left-3 top-1/2 -translate-y-1/2">
                            <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Time Selection -->
                  <div class="space-y-4">
                    <div class="flex items-center justify-between mb-2">
                      <label class="text-base font-medium text-gray-300">Schedule Time</label>
                      <div class="flex items-center gap-3">
                        <button
                          type="button"
                          v-for="preset in timePresets"
                          :key="preset.label"
                          @click="applyTimePreset(preset)"
                          class="px-3 py-2 text-sm font-medium rounded-md border transition-all duration-200"
                          :class="[
                            isSelectedTimePreset(preset)
                              ? 'border-[#76ABAE] bg-[#76ABAE]/10 text-[#76ABAE]'
                              : 'border-gray-600 hover:border-[#76ABAE] text-gray-400 hover:text-[#76ABAE]'
                          ]"
                        >
                          {{ preset.label }}
                        </button>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                      <!-- Time In Picker -->
                      <div class="relative">
                        <label class="block text-sm font-medium text-gray-300 mb-2">Time In</label>
                        <div class="relative">
                          <div class="flex">
                            <!-- Hours -->
                            <select
                              v-model="timeIn.hours"
                              @change="updateStartTime"
                              class="w-20 px-2 py-3 rounded-l-lg border-r-0 border-gray-600 bg-gray-700 text-white text-base shadow-sm focus:border-[#76ABAE] focus:ring focus:ring-[#76ABAE] focus:ring-opacity-50"
                            >
                              <option v-for="hour in 24" :key="hour" :value="(hour - 1).toString().padStart(2, '0')">
                                {{ (hour - 1).toString().padStart(2, '0') }}
                              </option>
                            </select>
                            <span class="inline-flex items-center px-2 text-gray-400 bg-gray-700 border-t border-b border-gray-600">:</span>
                            <!-- Minutes -->
                            <select
                              v-model="timeIn.minutes"
                              @change="updateStartTime"
                              class="w-20 px-2 py-3 rounded-r-lg border-l-0 border-gray-600 bg-gray-700 text-white text-base shadow-sm focus:border-[#76ABAE] focus:ring focus:ring-[#76ABAE] focus:ring-opacity-50"
                            >
                              <option v-for="minute in ['00', '15', '30', '45']" :key="minute" :value="minute">
                                {{ minute }}
                              </option>
                            </select>
                          </div>
                          <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <span v-if="formErrors.startTime" class="text-xs text-red-500 mt-1">{{ formErrors.startTime }}</span>
                      </div>

                      <!-- Time Out Picker -->
                      <div class="relative">
                        <label class="block text-sm font-medium text-gray-300 mb-2">Time Out</label>
                        <div class="relative">
                          <div class="flex">
                            <!-- Hours -->
                            <select
                              v-model="timeOut.hours"
                              @change="updateEndTime"
                              class="w-20 px-2 py-3 rounded-l-lg border-r-0 border-gray-600 bg-gray-700 text-white text-base shadow-sm focus:border-[#76ABAE] focus:ring focus:ring-[#76ABAE] focus:ring-opacity-50"
                            >
                              <option v-for="hour in 24" :key="hour" :value="(hour - 1).toString().padStart(2, '0')">
                                {{ (hour - 1).toString().padStart(2, '0') }}
                              </option>
                            </select>
                            <span class="inline-flex items-center px-2 text-gray-400 bg-gray-700 border-t border-b border-gray-600">:</span>
                            <!-- Minutes -->
                            <select
                              v-model="timeOut.minutes"
                              @change="updateEndTime"
                              class="w-20 px-2 py-3 rounded-r-lg border-l-0 border-gray-600 bg-gray-700 text-white text-base shadow-sm focus:border-[#76ABAE] focus:ring focus:ring-[#76ABAE] focus:ring-opacity-50"
                            >
                              <option v-for="minute in ['00', '15', '30', '45']" :key="minute" :value="minute">
                                {{ minute }}
                              </option>
                            </select>
                          </div>
                          <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <span v-if="formErrors.endTime" class="text-xs text-red-500 mt-1">{{ formErrors.endTime }}</span>
                      </div>
                    </div>
                    
                    <!-- Time Display -->
                    <div class="text-sm text-gray-400 flex items-center justify-center bg-gray-800 rounded-lg p-3">
                      <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Selected time: {{ formatTime(newEvent.startTime) }} - {{ formatTime(newEvent.endTime) }}
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex justify-end gap-4 mt-8">
                    <button 
                      type="button"
                      @click="closeModal"
                      class="px-6 py-3 text-base font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      :disabled="isSubmitting"
                      class="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-[#76ABAE] rounded-lg hover:bg-[#5a8d90] transition-colors duration-200 disabled:opacity-50"
                    >
                      <svg 
                        v-if="isSubmitting"
                        class="animate-spin -ml-1 mr-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ isSubmitting ? 'Saving...' : (editingEvent ? 'Update Schedule' : 'Create Schedule') }}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Toast Notifications -->
    <div class="fixed bottom-4 right-4 z-50">
      <TransitionGroup 
        name="notification"
        tag="div"
        class="space-y-2"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="flex items-center p-4 rounded-lg shadow-lg"
          :class="{
            'bg-green-500': notification.type === 'success',
            'bg-red-500': notification.type === 'error'
          }"
        >
          <span class="text-white text-sm font-medium">{{ notification.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import format from 'date-fns/format'
import { sendToGoogleSheets } from '@/services/googleSheets'
import axios from 'axios'
export default {
  name: 'ScheduleCalendar',
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionRoot,
    TransitionChild
  },

  setup() {
    const calendar = ref(null)
    const selectedDate = ref(new Date())
    const showEventModal = ref(false)
    const events = ref([])
    const isLargeScreen = ref(window.innerWidth >= 1024)
    const columns = ref(isLargeScreen.value ? 2 : 1)
    const editingEvent = ref(null)
    const isSubmitting = ref(false)
    const notifications = ref([])
    const formErrors = ref({})
    const isExporting = ref(false)
    const scheduleType = ref('work')
    const timeSlot = ref({
      startTime: '',
      endTime: ''
    })

    const weekDays = [
      { label: 'Mon', value: 1 },
      { label: 'Tue', value: 2 },
      { label: 'Wed', value: 3 },
      { label: 'Thu', value: 4 },
      { label: 'Fri', value: 5 }
    ]

    const newEvent = ref({
      name: '',
      startDate: null,
      endDate: null,
      startTime: '',
      endTime: '',
      type: 'regular',
      status: 'pending',
      description: '',
      isRecurring: false,
      recurringDays: []
    })

    const timeIn = ref({
      hours: '09',
      minutes: '00'
    })

    const timeOut = ref({
      hours: '17',
      minutes: '00'
    })

    const handleResize = () => {
      isLargeScreen.value = window.innerWidth >= 1024
      if (!isLargeScreen.value) {
        columns.value = 1
      }
    }

    onMounted(() => {
      window.addEventListener('resize', handleResize)
      console.log('Google Script URL from component:', process.env.VUE_APP_GOOGLE_SCRIPT_URL);
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    const masks = {
      weekdays: 'WWW',
      title: 'MMMM YYYY',
      nav: { 
        start: 'MMMM YYYY',
        prev: 'MMM',
        next: 'MMM'
      },
      dayPopover: 'WWW, MMM D, YYYY'
    }

    const attributes = computed(() => [
      // Today's date
      {
        key: 'today',
        highlight: {
          color: '#76ABAE',
          fillMode: 'solid',
          class: 'today-highlight'
        },
        dates: new Date(),
      },
      // Events
      ...events.value.map(event => ({
        key: event.id,
        dates: new Date(event.date),
        dot: {
          color: '#76ABAE',
          class: 'event-dot'
        },
        popover: {
          label: event.title,
          visibility: 'hover',
          transition: 'fade',
        },
      })),
    ])

    const selectedDateEvents = computed(() => {
      if (!selectedDate.value) return []
      const dateStr = format(selectedDate.value, 'yyyy-MM-dd')
      return events.value.filter(event => format(new Date(event.date), 'yyyy-MM-dd') === dateStr)
    })

    const toggleView = () => {
      if (isLargeScreen.value) {
        columns.value = columns.value === 1 ? 2 : 1
      }
    }

    const goToToday = () => {
      selectedDate.value = new Date()
      calendar.value?.move(selectedDate.value)
    }

    const createNewSchedule = () => {
      editingEvent.value = null
      newEvent.value = {
        name: '',
        startDate: null,
        endDate: null,
        startTime: '',
        endTime: '',
        type: 'regular',
        status: 'pending',
        description: '',
        isRecurring: false,
        recurringDays: []
      }
      showEventModal.value = true
    }

    const editEvent = (event) => {
      editingEvent.value = event
      newEvent.value = {
        name: event.title,
        startDate: format(new Date(event.date), 'yyyy-MM-dd'),
        endDate: format(new Date(event.date), 'yyyy-MM-dd'),
        startTime: event.startTime,
        endTime: event.endTime,
        type: event.type,
        status: event.status,
        description: event.description,
        isRecurring: event.isRecurring,
        recurringDays: event.recurringDays
      }
      showEventModal.value = true
    }

    const deleteEvent = async (event) => {
      try {
        events.value = events.value.filter(e => e.id !== event.id)
        showNotification('Event deleted successfully', 'success')
      } catch (error) {
        showNotification('Failed to delete event', 'error')
      }
    }

    const validateForm = () => {
      const errors = {}
      if (!newEvent.value.name?.trim()) {
        errors.name = 'Name is required'
      }
      if (!newEvent.value.startDate) {
        errors.startDate = 'Start date is required'
      }
      if (!newEvent.value.endDate) {
        errors.endDate = 'End date is required'
      }
      if (!newEvent.value.startTime) {
        errors.startTime = 'Time in is required'
      }
      if (!newEvent.value.endTime) {
        errors.endTime = 'Time out is required'
      }
      if (newEvent.value.startTime && newEvent.value.endTime && !validateTimeSlot()) {
        errors.timeSlot = 'Time out must be after time in'
      }
      if (newEvent.value.isRecurring && newEvent.value.recurringDays.length === 0) {
        errors.recurringDays = 'Select at least one day for recurring schedule'
      }
      formErrors.value = errors
      return Object.keys(errors).length === 0
    }

    const saveEvent = async () => {
      if (!validateForm()) return

      isSubmitting.value = true
      try {
        const eventData = [
          newEvent.value.name,
          newEvent.value.startDate,
          newEvent.value.endDate,
          newEvent.value.startTime,
          newEvent.value.endTime,
          newEvent.value.type,
          newEvent.value.status,
          newEvent.value.description
        ];

        await axios.post(
          `https://sheets.googleapis.com/v4/spreadsheets/14Kz0E-fZkz6fEpJfnygZTNF8KI6l6nyiINkQM1dtpSw/values/A1:G1:append`,
          { values: [eventData] },
          {
            headers: { 
              Authorization: ` Bearer ya29.a0AeXRPp6NyrDNwswEg47NHmUvV8A_xqK881TwxjyGKJWyV9ayaNoRCUT4w930HvV-xO1UzYiBjcqTGLWPUF9Yh1YHgW5RBSvGMqDpSH6R1zGA5NmsqD2dG5X8vrRbL9duYKmdr4Bw5BQLQNweHlPDn8Q4lbeCySuvgx-UYxw7aCgYKAecSARESFQHGX2MiqUPzsSV3TPcERQQD90AP0w0175`,
              'Content-Type': 'application/json'
            },
            params: { valueInputOption: 'RAW' }
          }
        );

        // Update local state
        if (editingEvent.value) {
          const index = events.value.findIndex(e => e.id === editingEvent.value.id)
          if (index !== -1) {
            events.value[index] = {
              ...editingEvent.value,
              ...newEvent.value,
              date: new Date(newEvent.value.startDate)
            }
          }
          showNotification('Event updated successfully', 'success')
        } else {
          events.value.push({
            id: Date.now(),
            ...newEvent.value,
            date: new Date(newEvent.value.startDate)
          })
          showNotification('Event created successfully', 'success')
        }
        closeModal()
      } catch (error) {
        console.error('Failed to save event:', error.response?.data || error)
        showNotification('Failed to save event to Google Sheets', 'error')
      } finally {
        isSubmitting.value = false
      }
    }

    const closeModal = () => {
      showEventModal.value = false
      editingEvent.value = null
      formErrors.value = {}
      newEvent.value = {
        name: '',
        startDate: null,
        endDate: null,
        startTime: '',
        endTime: '',
        type: 'regular',
        status: 'pending',
        description: '',
        isRecurring: false,
        recurringDays: []
      }
    }

    const showNotification = (message, type = 'success') => {
      const notification = {
        id: Date.now(),
        message,
        type
      }
      notifications.value.push(notification)
      setTimeout(() => {
        notifications.value = notifications.value.filter(n => n.id !== notification.id)
      }, 3000)
    }

    const formatDate = (date) => {
      return format(new Date(date), 'MMMM d, yyyy')
    }

    const onDayClick = (day) => {
      selectedDate.value = day.date
    }

    const updatePage = (page) => {
      console.log('Calendar page changed:', page)
    }

    const exportToGoogleSheets = async () => {
      try {
        // Log the raw URL to verify it's correct
        console.log('Raw URL:', process.env.VUE_APP_GOOGLE_SCRIPT_URL);
        
        const events = selectedDateEvents.value.map(event => ({
          date: event.date,
          startTime: event.startTime,
          endTime: event.endTime,
          title: event.title,
          type: event.type,
          status: event.status,
          description: event.description
        }));

        await sendToGoogleSheets(events);
        console.log('Export successful');
      } catch (error) {
        console.error('Export failed:', error);
      }
    }

    const validateTimeSlot = () => {
      if (!newEvent.value.startTime || !newEvent.value.endTime) {
        return false
      }
      const start = new Date(`2000-01-01T${newEvent.value.startTime}`)
      const end = new Date(`2000-01-01T${newEvent.value.endTime}`)
      return start < end
    }

    const getMonday = (date) => {
      const d = new Date(date)
      const day = d.getDay()
      const diff = d.getDate() - day + (day === 0 ? -6 : 1)
      return new Date(d.setDate(diff)).toISOString().split('T')[0]
    }

    const getFriday = (date) => {
      const d = new Date(date)
      const day = d.getDay()
      const diff = d.getDate() + (5 - day)
      return new Date(d.setDate(diff)).toISOString().split('T')[0]
    }

    const toggleDay = (day) => {
      const index = newEvent.value.recurringDays.indexOf(day)
      if (index === -1) {
        newEvent.value.recurringDays.push(day)
      } else {
        newEvent.value.recurringDays.splice(index, 1)
      }
    }

    const viewOptions = [
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
      { label: 'Schedule', value: 'schedule' }
    ]

    const scheduleTypes = [
      { 
        label: 'Regular', 
        value: 'regular',
        icon: 'ClockIcon'
      },
      { 
        label: 'Overtime', 
        value: 'overtime',
        icon: 'ClockIcon'
      },
      { 
        label: 'Leave', 
        value: 'leave',
        icon: 'CalendarIcon'
      },
      { 
        label: 'Holiday', 
        value: 'holiday',
        icon: 'StarIcon'
      }
    ]

    const timePresets = [
      { label: 'Morning (9-5)', startTime: '09:00', endTime: '17:00' },
      { label: 'Night (10-6)', startTime: '22:00', endTime: '06:00' },
      { label: 'Custom', startTime: '', endTime: '' }
    ]

    const scheduleFilter = ref('all')
    const currentView = ref('month')

    const filteredAttributes = computed(() => {
      if (scheduleFilter.value === 'all') return attributes.value
      return attributes.value.filter(attr => {
        const event = events.value.find(e => e.id === attr.key)
        return event && event.type === scheduleFilter.value
      })
    })

    const getSchedulePlaceholder = (type) => {
      switch (type) {
        case 'regular': return 'Regular Work Schedule'
        case 'overtime': return 'Overtime Hours'
        case 'leave': return 'Leave Request'
        case 'holiday': return 'Holiday Schedule'
        default: return 'Enter schedule name'
      }
    }

    const applyTimePreset = (preset) => {
      if (preset.label === 'Custom') return
      
      const [startHours, startMinutes] = preset.startTime.split(':')
      const [endHours, endMinutes] = preset.endTime.split(':')
      
      timeIn.value = {
        hours: startHours,
        minutes: startMinutes
      }
      timeOut.value = {
        hours: endHours,
        minutes: endMinutes
      }
      
      newEvent.value.startTime = preset.startTime
      newEvent.value.endTime = preset.endTime
    }

    const getWorkingHours = (events) => {
      return events.reduce((total, event) => {
        const start = new Date(`2000-01-01T${event.startTime}`)
        const end = new Date(`2000-01-01T${event.endTime}`)
        const hours = (end - start) / (1000 * 60 * 60)
        return total + hours
      }, 0).toFixed(1)
    }

    const formatTime = (time) => {
      return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    }

    const datePresets = [
      { label: 'Today', value: 'today' },
      { label: 'Tomorrow', value: 'tomorrow' },
      { label: 'This Week', value: 'week' }
    ]

    const applyDatePreset = (preset) => {
      const today = new Date()
      switch (preset.value) {
        case 'today': {
          newEvent.value.startDate = format(today, 'yyyy-MM-dd')
          newEvent.value.endDate = format(today, 'yyyy-MM-dd')
          break
        }
        case 'tomorrow': {
          const tomorrow = new Date(today)
          tomorrow.setDate(tomorrow.getDate() + 1)
          newEvent.value.startDate = format(tomorrow, 'yyyy-MM-dd')
          newEvent.value.endDate = format(tomorrow, 'yyyy-MM-dd')
          break
        }
        case 'week': {
          newEvent.value.startDate = getMonday(today)
          newEvent.value.endDate = getFriday(today)
          break
        }
      }
    }

    const currentStep = ref(1)
    const stepTitles = [
      'Basic Details',
      'Date & Time',
      'Additional Options'
    ]

    const nextStep = () => {
      if (validateCurrentStep()) {
        currentStep.value++
      }
    }

    const validateCurrentStep = () => {
      formErrors.value = {}
      
      if (currentStep.value === 1) {
        if (!newEvent.value.name?.trim()) {
          formErrors.value.name = 'Schedule name is required'
          return false
        }
      }
      
      if (currentStep.value === 2) {
        if (!newEvent.value.startDate || !newEvent.value.endDate) {
          formErrors.value.dates = 'Please select valid dates'
          return false
        }
        if (!newEvent.value.startTime || !newEvent.value.endTime) {
          formErrors.value.times = 'Please select valid times'
          return false
        }
      }
      
      return true
    }

    const selectScheduleType = (type) => {
      newEvent.value.type = type.value
      newEvent.value.name = '' // Reset name when type changes
    }

    const isSelectedTimePreset = (preset) => {
      return newEvent.value.startTime === preset.startTime && 
             newEvent.value.endTime === preset.endTime
    }

    const formatTimeRange = (preset) => {
      if (preset.label === 'Custom') return 'Select custom times'
      return `${formatTime(preset.startTime)} - ${formatTime(preset.endTime)}`
    }

    const updateStartTime = () => {
      newEvent.value.startTime = `${timeIn.value.hours}:${timeIn.value.minutes}`
    }

    const updateEndTime = () => {
      newEvent.value.endTime = `${timeOut.value.hours}:${timeOut.value.minutes}`
    }

    return {
      calendar,
      masks,
      attributes,
      showEventModal,
      newEvent,
      isLargeScreen,
      columns,
      selectedDate,
      selectedDateEvents,
      editingEvent,
      isSubmitting,
      notifications,
      formErrors,
      toggleView,
      goToToday,
      createNewSchedule,
      editEvent,
      deleteEvent,
      saveEvent,
      closeModal,
      onDayClick,
      updatePage,
      formatDate,
      isExporting,
      scheduleType,
      timeSlot,
      exportToGoogleSheets,
      weekDays,
      getMonday,
      getFriday,
      viewOptions,
      scheduleTypes,
      timePresets,
      scheduleFilter,
      currentView,
      filteredAttributes,
      getSchedulePlaceholder,
      applyTimePreset,
      getWorkingHours,
      formatTime,
      toggleDay,
      datePresets,
      applyDatePreset,
      currentStep,
      stepTitles,
      nextStep,
      validateCurrentStep,
      selectScheduleType,
      isSelectedTimePreset,
      formatTimeRange,
      timeIn,
      timeOut,
      updateStartTime,
      updateEndTime
    }
  }
}
</script>

<style>
.calendar-container {
  min-height: 600px;
}

/* Import v-calendar base styles */
@import '~v-calendar/dist/style.css';

/* Custom styles for v-calendar */
:root {
  --vc-font-family: inherit;
  --vc-rounded-lg: 0.5rem;
  --vc-header-padding: 10px 10px;
  --vc-highlight-default-color: #76ABAE;
  --vc-highlight-default-content-color: #ffffff;
  --vc-border-color: #374151;
}

.custom-calendar.dark {
  --vc-bg: #1f2937;
  --vc-border-color: #374151;
  --vc-header-title-color: #76ABAE;
  --vc-weekday-color: #9ca3af;
  --vc-day-content-color: #ffffff;
  --vc-day-content-disabled-color: #6b7280;
  --vc-day-content-hover-background-color: #374151;
  --vc-day-content-hover-color: #ffffff;
  --vc-today-content-color: #ffffff;
  --vc-highlight-content-color: #ffffff;
  --vc-highlight-outline-background-color: #374151;
  --vc-popover-content-color: #e5e7eb;
  --vc-popover-content-background-color: #1f2937;
  --vc-popover-border-color: #374151;
  --vc-nav-hover-background-color: #374151;
  --vc-nav-active-color: #ffffff;
  --vc-nav-active-background-color: #76ABAE;
}

/* Day number styles */
.custom-calendar.dark .vc-day {
  position: relative;
  min-height: 40px;
  color: white;
}

.custom-calendar.dark .vc-day-content {
  position: relative;
  z-index: 1;
  color: white;
}

.custom-calendar.dark .vc-day.is-today::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  border: 2px solid #76ABAE;
  border-radius: 50%;
  z-index: 0;
}

.custom-calendar.dark .vc-day.is-selected .vc-day-content {
  background-color: #76ABAE !important;
  color: white !important;
  font-weight: 600;
  transform: scale(1.1);
  transition: all 0.2s ease;
}

.custom-calendar.dark .vc-day:hover .vc-day-content {
  background-color: #374151;
  transform: scale(1.1);
  transition: all 0.2s ease;
}

/* Improve date input appearance */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: 0.5;
  cursor: pointer;
}

input[type="time"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: 0.5;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive Design */
@media (max-width: 640px) {
  .calendar-container {
    padding: 1rem;
  }
  
  .custom-calendar.dark .vc-header {
    padding: 8px 12px;
  }
  
  .custom-calendar.dark .vc-weeks {
    padding: 0 8px;
  }
}

/* Add these styles to fix month name visibility */
.custom-calendar.dark .vc-nav-title,
.custom-calendar.dark .vc-header-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #76ABAE;
  text-transform: capitalize;
}

.custom-calendar.dark .vc-nav-arrow {
  color: #76ABAE;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background-color: #374151;
}

.custom-calendar.dark .vc-nav-arrow:hover {
  background-color: #4b5563;
}

.custom-calendar.dark .vc-nav-item {
  color: #e5e7eb;
}

.custom-calendar.dark .vc-nav-item:hover {
  background-color: #374151;
  color: #ffffff;
}

.custom-calendar.dark .vc-nav-item.is-active {
  background-color: #76ABAE;
  color: #ffffff;
}

.custom-calendar.dark .vc-nav-item.is-disabled {
  color: #6b7280;
}
</style> 