<script setup>
import { computed, ref } from 'vue'

const props = defineProps(['name'])
const emit = defineEmits(['color-changed'])

const colors = ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6']
const index = ref(0)

const initials = computed(() =>
  props.name.split(' ').map(w => w[0]).join('').toUpperCase()
)

function changeColor() {
  index.value = (index.value + 1) % colors.length
  emit('color-changed', colors[index.value])
}
</script>

<template>
  <div>
    <div class="circle" :style="{ backgroundColor: colors[index] }">
      {{ initials }}
    </div>
    <button @click="changeColor">Сменить цвет</button>
  </div>
</template>

<style scoped>
.circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>