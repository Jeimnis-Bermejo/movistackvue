const url ="https://moviestack.onrender.com/api/movies"
const apiKei = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
const opciones = {
  headers: {
    "x-api-key": apiKei
  }
}

const { createApp } = Vue
const options = {
  data(){
    return {
    movies:[],
    moviesfiltered:[],
    genres:[] ,
    search:"",
    select:"all",
    }
  },
  beforeCreate(){
    let movies = [];
    fetch("https://moviestack.onrender.com/api/movies", opciones)
      .then(res => res.json())
      .then((data) => {

       this.movies = data.movies
       this.genres= [...new Set(this.movies.map(movie => movie.genres).flat())]
       this.moviesfiltered=this.movies 
   
      } )
      .catch (err => console.log(err))
    },

 methods:{
 keepsearch(e) {
    this.search = e.target.value
     this.filtrar()
},
keepselect(e){
this.select= e.target.value
this.filtrar()
},
filtrar(){
  this.moviesfiltered =this.movies.filter(movie => movie.title.toLowerCase().includes (this.search.toLowerCase()) &&( this.select =="all"|| movie.genres.includes(this.select)))

}
},


 }

 const app = createApp(options)
 app.mount ('#app')