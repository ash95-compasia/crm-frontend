<template>
  <div 
    class="resize-overlay fixed top-0 bottom-0 w-0.5 bg-green-500 pointer-events-none z-20 shadow-lg"
    :style="{ left: left + 'px' }"
  ></div>
</template>

<script setup>
defineProps({
  left: { type: Number, default: 0 }
})
</script>

<style scoped>
.resize-overlay {
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
}
</style>