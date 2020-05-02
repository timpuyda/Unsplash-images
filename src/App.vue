<template>
  <div id="app">
    <div>
     <div class="nav-tool">
       <button class="prev arrow" :disabled ="currentPage<=1" @click = prevPage > &#171; </button>

       <ul class="pagination">
        <li v-if="rangeStart!==1"><a href="#" @click="fetchPhotos(1)">1</a></li>
         <li v-if="rangeStart!==1">...</li> 
         <li v-for="page in pages" :key="page">
           <a href="#" @click="fetchPhotos(page)" :class="{active: page==currentPage}">{{page}}</a>
         </li>
         <li v-if="rangeEnd !==totalPages">...</li> 
         <li v-if="rangeEnd !==totalPages"><a href="#" @click="fetchPhotos(totalPages)">{{totalPages}}</a></li>
       </ul>

       <button class="next arrow" :disabled ="currentPage>=(totalPages)" @click = nextPage> &#187; </button>
     </div>

     <div class="pictures">
      <div v-for= "photo in photos" :key="photo.urls.small" class="picture-wrap">
        <div class="picture">
          <img :src="photo.urls.small" alt="">
        </div>
        <div class="author">
          <div class="circle"><img :src=photo.user.profile_image.small alt="">
          </div>
          <p>Author: <em> {{ photo.user.name }} </em></p>
        </div>
      </div>
    </div>
<!-- 
    <div v-for="photo in photos" :key="photo.urls.small">
      <img :src="photo.urls.small" alt="">
    </div> -->
  </div>
</div>
</template>

<script>
  console.clear()


 let appId = "Access-Key"
export default {
  name: 'App',
  data(){
    return{
      photos:[],
      totalPhotos:[],
      perPage: 3,
      currentPage: 1,
      pageRange: 2
    }
  },
  methods:{
    fetchPhotos(page) { 
      let options = {
        params:{
          client_id: appId,
          page: page,
          per_page:this.perPage
        }
      }
      this.$axios.get('https://api.unsplash.com/photos', options)
      .then( response => {
        this.photos = response.data
        console.log(response)
          this.totalPhotos = Number(response.headers['x-total'])
        } )
      .catch(error => console.warn(error))
      this.currentPage = page
    },

    nextPage(){
      this.currentPage++
      this.fetchPhotos(this.currentPage)
    },
    prevPage(){
      this.currentPage--
      this.fetchPhotos(this.currentPage)
    },
  },
  created(){
    this.fetchPhotos(this.currentPage)
  },
  computed: {
    totalPages(){
      return Math.floor(this.totalPhotos/this.perPage)
    },
    rangeStart(){
      let start = this.currentPage - this.pageRange
      return (start>0) ? start : 1
    },
    rangeEnd(){
      let end =  this.currentPage + this.pageRange
      return (end<this.totalPages) ? end : this.totalPages
    },
    pages(){
      let pages = []
      for (let i = this.rangeStart; i<= this.rangeEnd; i++){
        pages.push(i)
      }
      return pages
    }
  }
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.picture-wrap{
  width: 30%;
  border: 1px solid #c1c1c1;
  margin:1rem auto; 
}
.picture-wrap:hover{
   box-shadow: 0 14px 28px rgba(0,0,0,.25),
   0 10px 10px rgba(0,0,0,.22);
}
.pictures{
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
.picture{
  position: relative;
  overflow: hidden;
  height: 120px;
}
.picture-wrap p{
  padding: 0 1rem;
}
.picture img{
  position: absolute;
  display: block;
  width: 100%;
  margin-top: -50%;
  top: 50%;
}
.author{
  display: flex;
}
.circle img{
   width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #d8d8d8;
  margin: 5px 15px 0;
}
.nav-tool{
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.arrow{
  background-color: #444;
  padding: 1rem;
  border: 1px solid #3b3636ba;
  font-size: 2rem;
}
.pagination{
  list-style: none;
  display: flex;
}
.pagination a{
  padding: 0 20px;
  max-width: 160px;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid #ccc;
  text-decoration: none;
  margin: 0 6px;
  transition: all .2s ease-in-out;
}
.pagination a:hover,.pagination .active{
  border-color: #551a8b;
}
</style>
