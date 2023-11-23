const url ="https://moviestack.onrender.com/api/movies"
const apiKei = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
const opciones = {
  headers: {
    "x-api-key": apiKei
  }
}

const { createApp } = Vue
const options = {
data() {
    return {
      movies: [],
      favorites: []
    };
  },
  mounted() {
    this.fetchMovies();
    this.loadFavorites();
  },
  methods: {
    fetchMovies() {
      const url = "https://moviestack.onrender.com/api/movies";
      const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";
      const options = {
        headers: {
          "x-api-key": apiKey
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(data => {
          this.movies = data.movies.filter(movie => this.favorites.includes(movie.id));
        })
        .catch(e => console.error(e));
    },
    loadFavorites() {
      this.favorites = JSON.parse(localStorage.getItem("Favs")) || [];
    },
    toggleFavorite(id) {
      if (!this.favorites.includes(id)) {
        this.favorites.push(id);
      } else {
        const index = this.favorites.indexOf(id);
        this.favorites.splice(index, 1);
      }
      localStorage.setItem("Favs", JSON.stringify(this.favorites));
    },
    isFavorite(id) {
      return this.favorites.includes(id);
    }
  }
};