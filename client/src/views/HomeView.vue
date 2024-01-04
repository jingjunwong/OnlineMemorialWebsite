<template>
  <v-container>
    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">
      {{ this.$route.params.message }}
    </v-alert>

    <v-alert border="left" close-text="Close Alert" color="red accent-4" dark dismissible v-if="this.$route.params.unauthorisedMessage">
      {{ this.$route.params.unauthorisedMessage }}
    </v-alert>

    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.cookieData">
      Welcome, {{ this.cookieData }}!
    </v-alert>

    <v-row style="width:100%;height:100px;">
      <v-text-field label="Search for memorial" prepend-icon="mdi-search-web" v-model="search"></v-text-field>
    </v-row>

    <v-row no-gutters v-if="search != ''">
      <v-col sm="4" class="pa-3" v-for="post in filteredList" :key="post._id">
        <v-card class="pa-1" :to="{ name:'post', params:{id: post._id} }" color="#f0fbff" v-if="post.privacy == 'Public'">
          <v-img height="250" :src="'/'+post.image"></v-img>
          <v-btn class="ml-3 mt-3" small outline color="indigo">
            {{ post.category }}
          </v-btn>
          <v-card-title class="headline">
            {{ post.title }}
          </v-card-title>
          <v-card-title class="py-0">
            <p>{{ post.name }}</p>
          </v-card-title>
        </v-card>

        <v-card class="pa-1" :to="{ name:'post', params:{id: post._id} }" color="#ffbfbf" v-if="post.privacy == 'Private'">
          <v-img height="250" :src="'/'+post.image"></v-img>
          <v-btn class="ml-3 mt-3" small outline color="indigo">
            {{ post.category }}
          </v-btn>
          <v-card-title class="headline">
            {{ post.title }}
            <v-icon>mdi-lock</v-icon>
          </v-card-title>
          <v-card-title class="py-0">
            <p>{{ post.name }}</p>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row no-gutters v-if="search == ''">
      <v-col sm="4" class="pa-3" v-for="post in posts" :key="post._id">
        <v-card class="pa-1" :to="{ name:'post', params:{id: post._id} }" color="#f0fbff" v-if="post.privacy == 'Public'">
          <v-img height="250" :src="'/'+post.image"></v-img>
          <v-btn class="ml-3 mt-3" small outline color="indigo">
            {{ post.category }}
          </v-btn>
          <v-card-title class="headline">
            {{ post.title }}
          </v-card-title>
          <v-card-title class="py-0">
            <p>{{ post.name }}</p>
          </v-card-title>
        </v-card>

        <v-card class="pa-1" :to="{ name:'post', params:{id: post._id} }" color="#ffbfbf" v-if="post.privacy == 'Private'" @click="warn">
          <v-img height="250" :src="'/'+post.image"></v-img>
          <v-btn class="ml-3 mt-3" small outline color="indigo">
            {{ post.category }}
          </v-btn>
          <v-card-title class="headline">
            {{ post.title }}
            <v-icon style="margin-left:5px;">mdi-lock</v-icon>
          </v-card-title>
          <v-card-title class="py-0">
            <p>{{ post.name }}</p>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from '../api';
import UserAPI from '../userapi'
import Cookies from 'js-cookie';


  export default {
    name: 'Home',
    data(){
      return{
        posts:[],
        cookieData: null,
        search:'',
        filteredPosts: [],
      };
    },
    mounted(){
      const theCookieData = Cookies.get('jwt');
      console.log(theCookieData);
      this.cookieData = theCookieData;

      /*if(cookieData){
        const decodedSession = decodeURIComponent(cookieData);
        console.log(decodedSession);
        const startIndex = decodedSession.indexOf('{');
        const endIndex = decodedSession.lastIndexOf('}') + 1;
        const sessionData = JSON.parse(decodedSession.slice(startIndex, endIndex));

        console.log(sessionData);
        this.cookieData = sessionData;
      }*/
      //const userid = await 
      //console.log(userid['userid']);
    },
    async created(){
      this.posts = await API.getAllPost();
    },
    methods:{
      warn(){
        alert("hello");
      }
    },
    computed:{
      filteredList(){
        return this.posts.filter(post => {
           return post.name.toLowerCase().includes(this.search.toLowerCase() )
        })
      },
    },
    /*computed:{
      publicList(){
        return this.posts.filter(post => post.privacy === "Public");
      }
    }*/
  }
</script>
