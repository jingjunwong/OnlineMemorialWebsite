<template>
    <v-container>
      <v-row no-gutters>
        <v-col sm="10" class="mx-auto">
          <v-card class="pa-5">
            <v-card-title>Add Authorised Visitors to this Memorial</v-card-title>
            <v-divider></v-divider>
            <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
              <v-text-field label="Username" v-model="username" prepend-icon="mdi-account-box" :rules="rules"></v-text-field>

              <v-btn type="submit" class="mt-5 ml-0" color="success">Add</v-btn>
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
      username: "",
    };
  },
  async created(){
    const response = await API.getPostByID(this.$route.params.id);
    this.post = response;
  },
  methods: {
    async submitForm(){
        const data = {
        'username': this.username,
        }

        if(this.$refs.form.validate()){
            const response = await API.addVisitor(this.$route.params.id, data);
            this.$router.push({name: 'home', params:{message: response.message}});
        }
    }
  },
};
</script>