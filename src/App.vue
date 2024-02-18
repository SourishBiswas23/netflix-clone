<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMovieStore } from './stores/movie'
import { storeToRefs } from 'pinia'
import Magnify from 'vue-material-design-icons/Magnify.vue'
import HomeOutline from 'vue-material-design-icons/HomeOutline.vue'
import TrendingUp from 'vue-material-design-icons/TrendingUp.vue'
import Television from 'vue-material-design-icons/Television.vue'
import MovieOutline from 'vue-material-design-icons/MovieOutline.vue'
import Plus from 'vue-material-design-icons/Plus.vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import movies from './movies.json'
import MovieDetails from './components/MovieDetails.vue'
import VideoCarousel from './components/VideoCarousel.vue'

const icons = [Magnify, HomeOutline, TrendingUp, Television, MovieOutline, Plus]
let selectedIndex = ref(1)

function setIndex(index: number) {
  if (index !== selectedIndex.value) {
    selectedIndex.value = index
  }
}

const useMovie = useMovieStore()
const { movie, showFullVideo } = storeToRefs(useMovie)

onMounted(() => {
  setTimeout(() => {
    movie.value = movies[0][0]
  }, 100)
})
</script>

<template>
  <div class="fixed w-full h-screen bg-black">
    <div
      v-if="!showFullVideo"
      id="sideNav"
      class="flex z-40 items-center w-[120px] h-screen bg-black relative"
    >
      <img
        src="/images/netflix-logo.png"
        alt="netflix logo"
        class="absolute top-0 w-[35px] mt-10 ml-10"
      />
      <div>
        <div v-for="(icon, index) in icons" :key="index">
          <div
            class="mx-10 py-2 my-6"
            :class="{ 'border-b-red-500 border-b-4': selectedIndex === index }"
          >
            <component
              :is="icon"
              fillColor="#FFFFFF"
              :size="40"
              class="cursor-pointer"
              @click="setIndex(index)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="!showFullVideo">
      <div class="fixed flex z-20 top-0 right-0 w-full h-[50%] bg-black pl-[120px] bg-clip-border">
        <MovieDetails v-if="movie.name.length > 0" :movie="movie" />
        <div
          class="absolute z-30 h-[600px] left-[120px] w-[77%] right-0 top-0 bg-gradient-to-r from-black via-black"
        ></div>
        <video
          v-if="movie.name.length > 0"
          :src="'/videos/' + movie.name + '.mp4'"
          autoplay
          loop
          class="absolute z-0 right-0 top-0 h-[600px]"
        ></video>
      </div>
      <div class="fixed z-30 bottom-0 right-0 w-full h-[55%] pl-[120px] overflow-y-auto">
        <VideoCarousel
          class="pb-14 pt-14"
          category="Popular Movies"
          :movies="movies[0]"
        ></VideoCarousel>
        <VideoCarousel
          class="pb-14 pt-14"
          category="Horror Movies"
          :movies="movies[1]"
        ></VideoCarousel>
        <VideoCarousel
          class="pb-14 pt-14"
          category="Featured Movies"
          :movies="movies[2]"
        ></VideoCarousel>
      </div>
    </div>
    <div
      v-if="!showFullVideo"
      class="absolute z-20 h-[70%] left-[120px] w-[100%] right-0 bottom-0 bg-gradient-to-t from-black via-black"
    ></div>
    <div v-if="showFullVideo">
      <div
        @click="($event) => (showFullVideo = false)"
        class="absolute z-50 p-2 m-4 bg-white bg-opacity-50 rounded-full cursor-pointer"
      >
        <ChevronLeft fillColor="#FFFFFF" :size="40"></ChevronLeft>
      </div>
      <video
        v-if="movie.name.length > 0"
        :src="'/videos/' + movie.name + '.mp4'"
        autoplay
        loop
        controls
        class="absolute z-0 w-[100vw] h-full object-fill"
      ></video>
    </div>
  </div>
</template>
