<template>
  <div v-if="!editing">
    <h2>{{ name }}</h2>
    <button @click="startEdit">Редактировать</button>
  </div>
  <div v-else>
    <input v-model="inputName" />
    <button @click="save">Сохранить</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ name: String })
const emit = defineEmits(['name-changed'])

const editing = ref(false)
const inputName = ref('')

function startEdit() {
  inputName.value = props.name
  editing.value = true
}

function save() {
  emit('name-changed', inputName.value)
  editing.value = false
}
</script>

<style scoped>
h2 {
  color: #a707ec;
  font-size: 20px;
  margin-bottom: 10px;
}

input {
  background: #88dcf0;
  border: 2px solid #5f39d1;
  color: #b436ca;
  padding: 8px;
  font-family: monospace;
  margin-right: 10px;
}

button {
  background: #88dcf0;
  border: 2px solid #4743bb;
  color: #9308f0;
  padding: 6px 12px;
  font-family: monospace;
  cursor: pointer;
}

button:hover {
  background: #88dcf0;
  color: #ab07f1;
}
</style>