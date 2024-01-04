<template>
    <v-container>
      <v-alert border="left" close-text="Close Alert" color="red accent-4" dark dismissible v-if="this.errorMessage">
        {{ this.errorMessage }}
      </v-alert>
      <v-row no-gutters>
        <v-col sm="10" class="mx-auto">
          <v-card class="pa-5">
            <v-card-title>Add A Tribute</v-card-title>
            <v-divider></v-divider>
            <v-form ref="form" @submit="checkForm" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                <p v-if="errors.length">{{ errors[0] }}</p>
                <v-text-field label="Name" v-model="tribute.name" prepend-icon="mdi-note" :rules="rulesName"></v-text-field>
                <v-text-field label="Tribute Message" v-model="tribute.tributeMessage" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
                <v-select label="Select A Flower or Candle" v-model="tribute.icon" prepend-icon="mdi-flower" :items="icons" :rules="rules" return-object></v-select>
                <v-row><v-icon style="font-size:50px; text-align:center; width:100%; margin-top:5px;" color="info">{{ this.tribute.icon }}</v-icon></v-row>
                <v-btn type="submit" class="mt-5 ml-0" color="primary">Add Tribute</v-btn>
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
      icons: ["mdi-candle", "mdi-flower-tulip-outline", "mdi-flower-tulip", "mdi-spa-outline", "mdi-flower", "mdi-candelabra", "mdi-menorah-fire", "mdi-candelabra-fire"],
      rules: [(value)=>!! value || "This field is required!"],
      errors: [],
      tribute: {
        name: "",
        tributeMessage: "",
        icon: "",
      },
      errorMessage:"",
    };
  },
  methods: {
    async submitForm(){
      const formData = new FormData();
      if(this.tribute.name == "")
      {
        formData.append('name', "Anonymous");
      }
      else
      {
        formData.append('name', this.tribute.name);
      }
      formData.append('tributeMessage', this.tribute.tributeMessage);
      formData.append('icon', this.tribute.icon);
      if(this.$refs.form.validate()){
        const response = await API.addTribute(this.$route.params.id, formData);
        this.errorMessage = response.message;
        if(this.errorMessage === "Tribute created successfully")
        {
          const originalPost = this.$route.params.id;
          this.$router.push({name: 'post', params:{originalPost, message: response.message}});
        }
      }
    },

    checkForm: function(e){
      this.errors = [];
      if(this.tribute.name == "Shit"){
        this.errors.push("Please use appropriate name");
      }

      if(!this.errors.length){
        return true;
      }

      e.preventDefault();
    },
  },
};
</script>