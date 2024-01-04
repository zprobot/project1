<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
type props = {
  prefix?: string
  name: string
  width?: string
  height?: string
  color?: string
}
withDefaults(defineProps<props>(), {
  prefix: '#icon-',
  width: '16px',
  height: '16px',
  color: '',
})
</script>

<style scoped></style>
