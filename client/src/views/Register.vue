<template>
  <v-container>
    <v-alert border="left" close-text="Close Alert" color="red accent-4" dark dismissible v-if="this.errorMessage">
      {{ this.errorMessage }}
    </v-alert>
    <v-card>
        <v-card-title>Register a new account</v-card-title>

        <v-form ref="form" @submit.prevent="submitUserLogin" class="pa-5" enctype="multipart/form-data">
            <v-text-field label="Username" v-model="user.username" prepend-icon="mdi-rename" :rules="rules"></v-text-field>
            <v-text-field type="password" label="Password" v-model="user.password" prepend-icon="mdi-lock-outline" :rules="rules"></v-text-field>
            <v-text-field label="Date of Birth" v-model="user.dateOfBirth" prepend-icon="mdi-calendar-range"></v-text-field>
            <v-text-field label="Email" v-model="user.email" prepend-icon="mdi-email-box" :rules="rules"></v-text-field>
            <v-btn type="submit" class="mt-5 ml-0" color="primary">Register</v-btn>
        </v-form>    
    </v-card>
  </v-container>
</template>

<script>
import UserAPI from '../userapi.js';

export default{
  data(){
    return{
      rules: [(value)=>!! value || "This field is required!"],
      user: {
        username:"",
        password:"",
        dateOfBirth:"",
        email:"",
      },
      errorMessage:"",
    };
  },
  methods: {
    async submitUserLogin(){
      //const formData = new FormData();
      const data = {
        'username': this.user.username,
        'password':this.user.password,
        'dateOfBirth':this.user.dateOfBirth,
        'email':this.user.email
      }
      //console.log(formData);
      /*formData.append('username', this.user.username);
      formData.append('password', this.user.password);
      
      const object = {};
      formData.forEach(function(value, key){
        object[key] = value;
      })
      const data = JSON.stringify(object);
      console.log(data);*/

      if(this.$refs.form.validate()){
        const response = await UserAPI.register(data);
        if(response.message === 'Account registered successfully! Please proceed to login!')
        {
          this.$router.push({name: 'login', params:{message: response.message}});
        }
        else
        {
          this.errorMessage = response.message;
        }
      }
    }
  },
};
</script>