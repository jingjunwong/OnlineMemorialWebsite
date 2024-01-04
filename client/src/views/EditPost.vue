<template>
    <v-container>
      <v-row no-gutters>
        <v-col sm="10" class="mx-auto">
          <v-card class="pa-5">
            <v-card-title>Edit This Memorial</v-card-title>
            <v-divider></v-divider>
            <v-form ref="form" @submit.prevent="updateForm" class="pa-5" enctype="multipart/form-data">
              <v-text-field label="Memorial Title" v-model="post.title" prepend-icon="mdi-note" :rules="rules"></v-text-field>
              <v-text-field label="Name" v-model="post.name" prepend-icon="mdi-account-box" :rules="rules"></v-text-field>
              <v-text-field label="Category" v-model="post.category" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
              <v-textarea label="About" v-model="post.about" prepend-icon="mdi-note-plus" :rules="rules"></v-textarea>
              <v-select label="Private or public memorial" v-model="post.privacy" prepend-icon="mdi-lock-alert" :items="['Private', 'Public']"></v-select>
              <v-select label="Custom Theme" v-model="post.theme" prepend-icon="mdi-theme-light-dark" :items="['Default', 'Autumn Leaves', 'Blue Pink Gradient', 'Blue', 'Pink Flowers', 'Purple Flowers']"></v-select>
              <v-file-input @change="selectFile" show-size counter multiple label="Select Image"></v-file-input>
              <v-img :src="'/'+post.image" width="120"></v-img>

              <v-btn type="submit" class="mt-5 ml-0" color="success">Update Memorial</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script>
import API from '../api';

export default{
  data(){
    return{
      rules: [(value)=>!! value || "This field is required!"],
      post: {
        title: "",
        name: "",
        category: "",
        about: "",
        privacy:"",
        theme:"",
        image: ""
      },
      image: "",
    };
  },
  async created(){
    const response = await API.getPostByID(this.$route.params.id);
    this.post = response;
  },
  methods: {
    selectFile(file){
      this.image = file[0];
    },
    async updateForm(){
      const formData = new FormData();
      formData.append('image', this.image);
      formData.append('title', this.post.title);
      formData.append('name', this.post.name);
      formData.append('category', this.post.category);
      formData.append('about', this.post.about);
      formData.append('privacy', this.post.privacy);
      formData.append('theme', this.post.theme);
      formData.append('old_image', this.post.image);
      if(this.$refs.form.validate()){
        const response = await API.updatePost(this.$route.params.id, formData);
        const originalPost = this.$route.params.id;
        this.$router.push({name: 'post', params:{originalPost, message: response.message}});
      }
    }
  },
};
</script>