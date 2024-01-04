<template>
    <v-container>
      <v-row no-gutters>
        <v-col sm="10" class="mx-auto">
          <v-card class="pa-5">
            <v-card-title>User Profile</v-card-title>
            <v-divider></v-divider>
            <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
              <v-text-field label="Username" v-model="user.username" prepend-icon="mdi-rename" :rules="rules"></v-text-field>
              <v-text-field label="Password" type="password" v-model="user.password" prepend-icon="mdi-lock-outline" :rules="rules"></v-text-field>
              <v-text-field label="Date Of Birth" v-model="user.dateOfBirth" prepend-icon="mdi-calendar-range" :rules="rules"></v-text-field>
              <v-text-field label="Email" v-model="user.email" prepend-icon="mdi-email-box" :rules="rules"></v-text-field>
              <v-btn type="submit" class="mt-5 ml-0" color="success">Update Profile</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>


<script>
import API from '../api';
import UserAPI from '../userapi'
import Cookies from 'js-cookie';

export default{
  data(){
    return{
      rules: [(value)=>!! value || "This field is required!"],
      user:{
        _id:"",
        username:"",
        password:"",
        dateOfBirth:"",
        email:"",
      }
    };
  },
  async created(){
    const username = Cookies.get('jwt');
    const response = await UserAPI.findUser(username);
    this.user = response;
  },
  methods: {
    async submitForm(){
        const data = {
        'username': this.user.username,
        'password': this.user.password,
        'dateOfBirth': this.user.dateOfBirth,
        'email': this.user.email,
        }

        console.log(data);

        if(this.$refs.form.validate()){
            const response = await UserAPI.updateUser(this.user._id, data);
            this.$router.push({name: 'home', params:{message: response.message}});
        }
    }
  },
};
</script>