<template>
  <v-container>
    <v-alert border="left" close-text="Close Alert" color="red accent-4" dark dismissible v-if="this.errorMessage">
      {{ this.errorMessage }}
    </v-alert>
    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">
      {{ this.$route.params.message }}
    </v-alert>
    <div>
        <h2>Login</h2>
        <v-form ref="form" @submit.prevent="submitUserLogin" class="pa-5" enctype="multipart/form-data">
            <v-text-field label="Username" v-model="user.username" prepend-icon="mdi-note" :rules="rules"></v-text-field>
            <v-text-field type="password" label="password" v-model="user.password" prepend-icon="mdi-account-box" :rules="rules"></v-text-field>
            <v-btn type="submit" class="mt-5 ml-0" color="primary">Login</v-btn>
        </v-form>    
    </div>
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
      },
      errorMessage:"",
    };
  },
  methods: {
    async submitUserLogin(){
      //const formData = new FormData();
      const data = {
        'username': this.user.username,
        'password':this.user.password
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
        const response = await UserAPI.login(data);
        this.errorMessage = response.message;
        if(this.errorMessage === "Login successful!")
        {
          this.$router.push({name: 'home', params:{message: response.message}});
        }
      }
    }
  },
};
</script>