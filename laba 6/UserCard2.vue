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

<template>
  <div>
    <div v-if="!editing">
      <h2>{{ name }}</h2>
      <button @click="startEdit">Редактировать</button>
    </div>
    <div v-else>
      <input v-model="inputName" />
      <button @click="save">Сохранить</button>
    </div>
  </div>
</template>