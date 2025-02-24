<template>
    <div class="bg-[#181A1E] h-screen">
        <div class="p-6 mx-auto rounded-xl shadow-md space-y-4">
            <!-- Add Task Section -->
            <div class="bg-[#1F2127] p-4 rounded-lg">
                <div class="space-y-2">
                    <input v-model="newTask" type="text" class="w-full h-20 border rounded p-2 text-[#000]" />
                </div>
            </div>

            <div class="flex items-end justify-end space-x-2">
                <button class="bg-[#76ABAE] text-white px-3 py-1 rounded" @click="addTask">Add task</button>
                <button class="px-3 py-1 border rounded" @click="cancelTask">Cancel</button>
            </div>

            <!-- Sections -->
            <div class="bg-[#1F2127] p-4 rounded-lg">
                <div v-for="(section, index) in sections" :key="index" class="space-y-3">
                <h2 class="text-xl font-semibold">{{ section.title }}</h2>
                <ul class="space-y-2">
                    <li v-for="(task, i) in section.tasks" :key="i" class="flex items-center space-x-2">
                        <input type="checkbox" v-model="task.completed" />
                        <span :class="{ 'line-through text-gray-500': task.completed }">{{ task.name }}</span>
                        <span class="text-sm text-green-500" v-if="task.due === 'Today'">Today</span>
                        <span class="text-sm text-yellow-500" v-else-if="task.due === 'Tomorrow'">Tomorrow</span>
                    </li>
                </ul>
            </div>
            </div>
            
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            newTask: '',
            sections: [
                {
                    title: 'This is a section',
                    tasks: [
                        { name: 'This is a task for me to do', completed: false, due: 'Today' },
                        { name: 'And another task', completed: false, due: 'Tomorrow' }
                    ]
                },
                {
                    title: 'This is another section',
                    tasks: [
                        { name: 'Oh look, more tasks', completed: false, due: '' },
                        { name: 'With sub-tasks!', completed: false, due: '' }
                    ]
                }
            ]
        };
    },
    methods: {
        addTask() {
            if (this.newTask.trim() !== '') {
                this.sections[0].tasks.push({ name: this.newTask, completed: false, due: '' });
                this.newTask = '';
            }
        },
        cancelTask() {
            this.newTask = '';
        },
        addTaskToSection(index) {
            const taskName = prompt('Enter task name');
            if (taskName) {
                this.sections[index].tasks.push({ name: taskName, completed: false, due: '' });
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