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
            id: null,
            movie:"",
        }

    },
    beforeCreate() {
        const search = location.search
        const params = new URLSearchParams(search)
        this.id = params.get("id")
        
        fetch("https://moviestack.onrender.com/api/movies/"+ this.id, opciones)
            .then(response => response.json())
            .then(data => {
                this.movie=data
              console.log(this.movie)  
            })
            .catch(error => console.log(error))

    },
    computed:{
        formatDate(){
            const options = {day:'numeric', month:'long', year:'numeric'}
            const release = new Date(this.movies.release_date)
            return release.toLocaleDateString("es-ES",options)
    }
}}
const app = createApp(options)
app.mount('#app')