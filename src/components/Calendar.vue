<template>
  <div class="calendar-container min-h-screen bg-[#181A1E] p-6">
    <!-- Main Content -->
    <div class="max-w-screen-full mx-auto space-y-6">
      <!-- Header Section -->
      <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-2xl font-bold text-white">Calendar</h2>
          <p class="text-gray-400 text-sm mt-1">Manage your schedule and events</p>
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
              <span v-if="isLargeScreen">{{ columns === 1 ? 'Month View' : 'Double Month' }}</span>
              <span v-else>Month View</span>
            </button>
            <button 
              @click="goToToday"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-[#76ABAE] rounded-md hover:bg-[#374151] transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Today
            </button>
          </div>
          <button 
            @click="createNewEvent"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#76ABAE] rounded-md hover:bg-[#5a8d90] transition-colors duration-200 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Event
          </button>
          <button 
            @click="exportToGoogleSheets"
            :disabled="isExporting"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors duration-200 shadow-sm disabled:opacity-50"
          >
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {{ isExporting ? 'Exporting...' : 'Export to Sheets' }}
          </button>
        </div>
      </header>

      <!-- Calendar Grid -->
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Calendar Section -->
        <div class="lg:col-span-2">
          <div class="bg-[#1f2937] rounded-xl shadow-xl border border-gray-700 overflow-hidden">
            <div class="p-6">
              <Transition name="fade" mode="out-in">
                <v-calendar
                  ref="calendar"
                  v-model="selectedDate"
                  :masks="masks"
                  :attributes="attributes"
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

        <!-- Events Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-[#1f2937] rounded-xl shadow-xl border border-gray-700 p-6 sticky top-6">
            <h3 class="text-lg font-semibold text-[#76ABAE] mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(selectedDate) }}
            </h3>
            
            <div v-if="selectedDateEvents.length > 0" class="space-y-3">
              <div 
                v-for="event in selectedDateEvents" 
                :key="event.id"
                class="flex items-start justify-between p-4 rounded-lg border border-gray-700 hover:border-[#76ABAE] transition-colors duration-200 bg-[#374151] group"
              >
                <div class="flex-1 min-w-0">
                  <h4 class="font-medium text-gray-200 truncate">{{ event.title }}</h4>
                  <p class="text-sm text-gray-400 mt-1 line-clamp-2">{{ event.description }}</p>
                </div>
                <div class="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button 
                    @click="editEvent(event)"
                    class="text-gray-400 hover:text-[#76ABAE] transition-colors duration-200 p-1"
                    title="Edit Event"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    @click="deleteEvent(event)"
                    class="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                    title="Delete Event"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-gray-500">No events scheduled for this day</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Modal -->
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
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-xl bg-[#1f2937] p-6 shadow-xl transition-all border border-gray-700">
                <DialogTitle as="h3" class="text-lg font-semibold text-[#76ABAE] mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ editingEvent ? 'Edit Event' : 'Add Event' }}
                </DialogTitle>

                <form @submit.prevent="saveEvent" class="space-y-4">
                  <div>
                    <label for="eventTitle" class="block text-sm font-medium text-gray-300">Title</label>
                    <input 
                      id="eventTitle"
                      v-model="newEvent.title" 
                      type="text"
                      autocomplete="off"
                      class="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#76ABAE] focus:ring focus:ring-[#76ABAE] focus:ring-opacity-50 transition-shadow duration-200"
                      :class="{ 'border-red-500': formErrors.title }"
                      required
                    >
                    <p v-if="formErrors.title" class="mt-1 text-sm text-red-500">{{ formErrors.title }}</p>
                  </div>

                  <div>
                    <label for="eventDescription" class="block text-sm font-medium text-gray-300">Description</label>
                    <textarea 
                      id="eventDescription"
                      v-model="newEvent.description" 
                      class="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#76ABAE] focus:ring focus:ring-[#76ABAE] focus:ring-opacity-50 transition-shadow duration-200"
                      :class="{ 'border-red-500': formErrors.description }"
                      rows="3"
                    ></textarea>
                    <p v-if="formErrors.description" class="mt-1 text-sm text-red-500">{{ formErrors.description }}</p>
                  </div>

                  <div>
                    <label for="eventDate" class="block text-sm font-medium text-gray-300">Date</label>
                    <input 
                      id="eventDate"
                      v-model="newEvent.date" 
                      type="date"
                      class="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#76ABAE] focus:ring focus:ring-[#76ABAE] focus:ring-opacity-50 transition-shadow duration-200"
                      :class="{ 'border-red-500': formErrors.date }"
                      required
                    >
                    <p v-if="formErrors.date" class="mt-1 text-sm text-red-500">{{ formErrors.date }}</p>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label for="eventStartTime" class="block text-sm font-medium text-gray-300">Start Time</label>
                      <input 
                        id="eventStartTime"
                        v-model="newEvent.startTime"
                        type="time"
                        class="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-white"
                        :class="{ 'border-red-500': formErrors.startTime }"
                        required
                      >
                    </div>
                    <div>
                      <label for="eventEndTime" class="block text-sm font-medium text-gray-300">End Time</label>
                      <input 
                        id="eventEndTime"
                        v-model="newEvent.endTime"
                        type="time"
                        class="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-white"
                        :class="{ 'border-red-500': formErrors.endTime }"
                        required
                      >
                    </div>
                  </div>

                  <div>
                    <label for="eventType" class="block text-sm font-medium text-gray-300">Schedule Type</label>
                    <select
                      id="eventType"
                      v-model="newEvent.type"
                      class="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-white"
                      required
                    >
                      <option value="work">Work</option>
                      <option value="meeting">Meeting</option>
                      <option value="personal">Personal</option>
                      <option value="break">Break</option>
                    </select>
                  </div>

                  <div>
                    <label for="eventStatus" class="block text-sm font-medium text-gray-300">Status</label>
                    <select
                      id="eventStatus"
                      v-model="newEvent.status"
                      class="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-white"
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div class="flex justify-end gap-3 mt-6">
                    <button 
                      type="button" 
                      @click="closeModal"
                      class="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      :disabled="isSubmitting"
                      class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#76ABAE] rounded-lg hover:bg-[#5a8d90] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#76ABAE] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg 
                        v-if="isSubmitting"
                        class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ isSubmitting ? 'Saving...' : (editingEvent ? 'Update' : 'Save') }}
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

export default {
  name: 'TaskCalendar',
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

    const newEvent = ref({
      title: '',
      description: '',
      date: null,
      type: 'work',
      startTime: '',
      endTime: '',
      status: 'pending',
      googleSheetSync: false
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

    const createNewEvent = () => {
      editingEvent.value = null
      newEvent.value = {
        title: '',
        description: '',
        date: format(selectedDate.value, 'yyyy-MM-dd')
      }
      showEventModal.value = true
    }

    const editEvent = (event) => {
      editingEvent.value = event
      newEvent.value = {
        title: event.title,
        description: event.description,
        date: format(new Date(event.date), 'yyyy-MM-dd')
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
      if (!newEvent.value.title?.trim()) {
        errors.title = 'Title is required'
      }
      if (!newEvent.value.date) {
        errors.date = 'Date is required'
      }
      if (!newEvent.value.startTime) {
        errors.startTime = 'Start time is required'
      }
      if (!newEvent.value.endTime) {
        errors.endTime = 'End time is required'
      }
      if (newEvent.value.startTime && newEvent.value.endTime && !validateTimeSlot()) {
        errors.timeSlot = 'End time must be after start time'
      }
      formErrors.value = errors
      return Object.keys(errors).length === 0
    }

    const saveEvent = async () => {
      if (!validateForm()) return

      isSubmitting.value = true
      try {
        if (editingEvent.value) {
          const index = events.value.findIndex(e => e.id === editingEvent.value.id)
          if (index !== -1) {
            events.value[index] = {
              ...editingEvent.value,
              ...newEvent.value,
              date: new Date(newEvent.value.date)
            }
          }
          showNotification('Event updated successfully', 'success')
        } else {
          events.value.push({
            id: Date.now(),
            ...newEvent.value,
            date: new Date(newEvent.value.date)
          })
          showNotification('Event created successfully', 'success')
        }
        closeModal()
      } catch (error) {
        showNotification('Failed to save event', 'error')
      } finally {
        isSubmitting.value = false
      }
    }

    const closeModal = () => {
      showEventModal.value = false
      editingEvent.value = null
      formErrors.value = {}
      newEvent.value = {
        title: '',
        description: '',
        date: null
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
      createNewEvent,
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
      exportToGoogleSheets
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
  color: #ffffff;
}

.custom-calendar.dark .vc-day-content {
  color: #ffffff !important;
  font-weight: 500;
}

/* Style for days not in current month */
.custom-calendar.dark .vc-day.is-not-in-month .vc-day-content {
  color: #4b5563 !important;
}

/* Style for today */
.custom-calendar.dark .vc-day.is-today .vc-day-content {
  color: #ffffff !important;
  font-weight: 700;
  background-color: #76ABAE;
}

/* Style for selected day */
.custom-calendar.dark .vc-day.is-selected .vc-day-content {
  color: #ffffff !important;
  font-weight: 700;
  background-color: #76ABAE;
}

/* Hover styles */
.custom-calendar.dark .vc-day:hover .vc-day-content {
  background-color: #374151;
  color: #ffffff !important;
}

.custom-calendar.dark .vc-header {
  padding: 16px;
  font-weight: 600;
  background-color: #1f2937;
  border-bottom: 1px solid #374151;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
}

.custom-calendar.dark .vc-header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 8px;
  position: relative;
  z-index: 1;
}

.custom-calendar.dark .vc-title {
  color: #76ABAE;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.75rem;
  padding: 0 8px;
  white-space: nowrap;
  text-align: center;
  position: relative;
  z-index: 1;
  pointer-events: auto;
  opacity: 1 !important;
  visibility: visible !important;
  transform: none !important;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-calendar.dark .vc-arrows-container {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  pointer-events: none;
  z-index: 2;
}

.custom-calendar.dark .vc-arrow {
  width: 32px;
  height: 32px;
  background-color: #374151;
  border-radius: 8px;
  color: #76ABAE;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
  pointer-events: auto;
  z-index: 2;
  position: relative;
}

.custom-calendar.dark .vc-arrow:hover {
  background-color: #4b5563;
}

.custom-calendar.dark .vc-title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  z-index: 1;
  position: relative;
  padding: 0 40px;
}

.custom-calendar.dark .vc-nav-container {
  z-index: 100;
  position: absolute;
  background-color: #1f2937;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Make sure arrows are clickable */
.custom-calendar.dark .vc-arrow svg {
  width: 20px;
  height: 20px;
  pointer-events: none;
}

/* Ensure the header elements don't block arrow clicks */
.custom-calendar.dark .vc-header * {
  pointer-events: auto;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
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