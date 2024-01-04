<template>
    <v-container>
      <v-row no-gutters>
        <v-col sm="10" class="mx-auto">
          <v-card class="pa-5">
            <v-card-title>Upload a Picture to Gallery</v-card-title>
            <v-divider></v-divider>
            <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
            <v-select prepend-icon="mdi-file-edit-outline" :rules="rules" label="Select File Type" :items="['Picture', 'Video']" v-model="gallery.fileType"></v-select>
            <v-file-input @change="selectFile" :rules="rules" show-size counter multiple label="Select Image"></v-file-input>
            <v-btn type="submit" class="mt-5 ml-0" color="primary">Add Picture</v-btn>
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
            gallery: {
                fileType:"",
                image: "",
            },
            image:"",
        };
    },
    methods:{
        selectFile(file){
            this.image = file[0];
        },
        async submitForm(){
            const formData = new FormData();
            formData.append('fileType', this.gallery.fileType);
            formData.append('image', this.image);
            if(this.$refs.form.validate()){
                const response = await API.addPicture(this.$route.params.id, formData);
                this.$router.push({name: 'home', params:{message: response.message}});
            }
        }
    },
};
</script>