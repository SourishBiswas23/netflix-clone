import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movie: {
      name: '',
      description: '',
      year: '',
      genre: {
        one: '',
        two: '',
        three: ''
      }
    },
    showFullVideo: false
  })
})
