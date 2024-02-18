<script setup lang="ts">
defineProps({ movie: Object })
</script>

<template>
  <div class="z-40 text-white pt-20 w-[53%]">
    <div class="text-[55px] font-semibold font-serif">{{ movie!.name }}</div>
    <div class="flex items-center text-lg pt-4">
      <div>
        {{ movie!.year }}
      </div>
      <div v-for="(genreCount, index) in movie!.genre" :key="index" class="relative">
        <span class="absolute left-[2px] -top-[12px] text-[40px]"> .</span>
        <span class="pl-4">{{ genreCount }}</span>
      </div>
    </div>
    <div class="pt-6 text-2xl">{{ movie!.description }}</div>
  </div>
</template>
