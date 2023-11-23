const { createApp } = Vue

const url = "https://moviestack.onrender.com/api/movies"
const apiKey = { headers: { "x-api-key": "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd" } }

const app = createApp({

  data() {
    return {
      movies: [],
      moviesfiltered: [],
      select: [],
      favorites: []


    }
  },

  beforeCreate() {

    fetch(url, apiKey)
      .then(response => response.json())
      .then(data => {
        this.movies = data.movies
        this.moviesfiltered = this.movies
        this.favorites = JSON.parse(localStorage.getItem("favorites")) || []
        this.moviesfiltered = this.movies.filter(movie => this.favorites.includes(movie.id))



      })
      .catch(e => { console.log(e) })
  },
  methods: {

    removefavs(movieid) {

      this.favorites = this.favorites.filter(movie => movieid != movie)
      localStorage.setItem("favorites", JSON.stringify(this.favorites))
    },

    addfavs(movieid) {
      this.favorites.push(movieid)
      localStorage.setItem("favorites", JSON.stringify(this.favorites))

    },

  }
})
      app.mount('#app')