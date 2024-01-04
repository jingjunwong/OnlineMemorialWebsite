<template>
    <v-container>
      <v-row no-gutters>
        <v-col sm="10" class="mx-auto">
          <v-card color="rgba(255, 176, 255, 0.16)" class="pa-5">
            <v-card-title>Create a new Memorial</v-card-title>
            <v-divider></v-divider>
            <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
              <v-text-field label="Memorial Title" v-model="post.title" prepend-icon="mdi-note" :rules="rules"></v-text-field>
              <v-text-field label="Name" v-model="post.name" prepend-icon="mdi-account-box" :rules="rules"></v-text-field>
              <v-text-field label="Category" v-model="post.category" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
              <v-textarea label="About" v-model="post.about" prepend-icon="mdi-note-plus" :rules="rules"></v-textarea>
              <v-select label="Private or public memorial" v-model="post.privacy" prepend-icon="mdi-lock-alert" :items="['Private', 'Public']"></v-select>
              <v-select label="Custom Theme" v-model="post.theme" prepend-icon="mdi-theme-light-dark" :items="['Default', 'Autumn Leaves', 'Blue Pink Gradient', 'Blue', 'Pink Flowers', 'Purple Flowers']"></v-select>
              <input type="hidden" v-model="this.username">
              <v-file-input @change="selectFile" :rules="rules" show-size counter multiple label="Select Image"></v-file-input>

              <v-btn type="submit" class="mt-5 ml-0" color="success">Create Memorial</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script>
import API from '../api';
import Cookies from 'js-cookie';

export default{
  data(){
    return{
      rules: [(value)=>!! value || "This field is required!"],
      post: {
        title: "",
        name: "",
        category: "",
        about: "",
        privacy: "",
        theme: "",
        image: ""
      },
      image: "",
      username: null,
    };
  },
  mounted(){
    this.username = Cookies.get('jwt');
  },
  methods: {
    selectFile(file){
      this.image = file[0];
    },
    async submitForm(){
      const formData = new FormData();
      formData.append('image', this.image);
      formData.append('title', this.post.title);
      formData.append('name', this.post.name);
      formData.append('category', this.post.category);
      formData.append('about', this.post.about);
      formData.append('privacy', this.post.privacy);
      formData.append('theme', this.post.theme);
      formData.append('allowedVisitor', [this.username]);
      formData.append('createdBy', this.username);
      if(this.$refs.form.validate()){
        const response = await API.addPost(formData);
        this.$router.push({name: 'home', params:{message: response.message}});
      }
    }
  },
};
</script>