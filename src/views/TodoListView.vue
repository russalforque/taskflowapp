<template>
    <div>
        <TodoList></TodoList>
    </div>
  </template>
  
<script>
import TodoList from '@/components/TodoList.vue';
  
export default {
    name: 'TodoListView',
    components: {
        TodoList
    }
}
</script>
  