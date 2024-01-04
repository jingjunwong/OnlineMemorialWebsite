<template>
    <v-container>
        <v-row>
            <v-col sm="10" class="pa-4 mx-auto">
                <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">
                    {{ this.$route.params.message }}
                </v-alert>
                <v-card :style="{ backgroundImage: 'url(' + require('../assets/' + themeURL) + ')', backgroundSize: 'cover' }" class="pa-2">
                    <v-img :src="'/'+post.image"></v-img>
                    <v-card-actions class="pb-0">
                        <v-row class="mt-1 mx-1">
                            <v-col sm="2">
                                <v-btn outlined color="primary">{{ post.category }}</v-btn>
                            </v-col>
                            <v-col sm="10" class="d-flex justify-end">
                                <v-btn color="info" text :to="{name: 'add-fundraising', params:{id: post._id}}" v-if="this.cookieData == post.createdBy">Start Fundraising Campaign</v-btn>
                                <v-btn color="success" text :to="{name: 'add-visitor', params:{id: post._id}}" v-if="post.privacy == 'Private' && this.cookieData == post.createdBy">Add Visitors</v-btn>
                                <v-btn color="success" text :to="{name: 'edit-post', params:{id: post._id}}" v-if="this.cookieData == post.createdBy">Edit</v-btn>
                                <v-btn color="red" text @click="removePost(post._id)" v-if="this.cookieData == post.createdBy">Delete</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <v-card-actions class="pb-0">
                        <v-row class="mt-1 mx-1">
                            <v-col sm="12" class="d-flex justify-end">
                                <v-btn color="info" text @click="share"><v-icon start>mdi-share-circle</v-icon>Share Link</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <v-card-subtitle class="headline">
                        <h1 style="color:black;margin-top:30px;">{{ post.title }}</h1><br>
                        <v-divider></v-divider>
                        <h2 style="color:black;margin-top:20px;">{{ post.name }}</h2><br>

                    </v-card-subtitle>
                    <v-card-text style="font-size:20px;">
                        <h4>{{ post.about }}</h4>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card class="pa-5 mx-10 my-2">
                        <v-row class="my-1">
                            <v-col>
                                <v-btn text>Gallery</v-btn>
                            </v-col>
                            <v-col class="d-flex justify-end">
                                <v-btn color="success" :to="{name: 'add-photo', params:{id:post._id}}"><v-icon start style="margin-right:2px;">mdi-upload</v-icon>Uplaod Photo</v-btn>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-btn text>Photos</v-btn>
                        <v-row>
                            <!--<v-col sm="4" v-for="(photos,index) in post.gallery" v-if="index <= 5">
                                <v-img v-if="photos.fileType == 'Picture'" :src="'/'+photos.image"></v-img>
                            </v-col>-->
                                <v-col offset="sm-4" sm="4" v-for="(photos,index) in pictureFiles" :key="index" :class="['carousel-item', index === currentIndex ? 'active' : '']">
                                    <v-img v-if="photos.fileType == 'Picture'" :src="'/'+photos.image"></v-img>
                                    <v-row class="my-3">
                                        <v-col sm="2" class="mx-0">
                                            <v-btn outlined color="primary" @click="prevItem"><v-icon start>mdi-skip-previous-outline</v-icon>Prev</v-btn>
                                        </v-col>
                                        <v-col sm="2" offset="sm-4">
                                            <v-btn outlined color="primary" @click="nextItem"><v-icon end>mdi-skip-next-outline</v-icon>Next</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                        </v-row>
                        <v-btn text>Videos</v-btn>
                        <v-row>
                            <v-col sm="4" v-for="(videos,index) in videoFiles">
                                <video width="320" height="240" controls :src="'/' + videos.image"></video>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-divider></v-divider>
                    <v-card-title style="color:black;font-size:25px;">Tributes</v-card-title>
                    <v-card-text>
                        <v-row v-for="tributes in post.tributes">
                            <v-row>
                            <v-col sm="10" class="my-5 mx-auto pa-2">
                            <v-card :img="require('../assets/flower_background_img3.jpg')">
                                <v-row class="mx-auto">
                                    <v-icon style="margin-left:20px;font-size:40px;">mdi-account-outline</v-icon>
                                    <v-card-title>{{ tributes.name }}</v-card-title>
                                </v-row>
                                <v-divider></v-divider>
                                <v-row class="my-3 mx-4">
                                    <v-icon style="color:black;font-size:35px">{{ tributes.icon }}</v-icon>
                                    <h2 style="margin-left:10px;">{{ tributes.tributeMessage }}</h2>
                                </v-row>
                            </v-card>
                            </v-col>
                            </v-row>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="success" :to="{name: 'add-tribute', params:{id: post._id}}">Add A Tribute</v-btn>
                    </v-card-actions>
                    <v-divider></v-divider>
                    <v-btn color="primary" text style="font-size:25px;margin-top:10px;" v-if="post.donation.length > 0">Donation Campaigns<v-icon style="font-size:30px;margin-left:10px;">mdi-hand-coin</v-icon></v-btn>
                    <v-card-text>
                        <v-row v-for="donation in post.donation">
                            <v-col sm="10" class="mx-auto pa-2 my-5">
                                <v-card>
                                    <v-card-title style="font-size:20px;">{{ donation.title }}</v-card-title>
                                    <v-card-text style="font-size:18px;">{{ donation.description }}</v-card-text>
                                    <v-row>
                                        <v-col offset="10" sm="2">
                                            <v-btn color="info">Donate</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
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
            currentIndex: 0,
            carouselInterval: null,
            post: {},
            cookieData:null,
            videoFiles: [],
            pictureFiles: [],
            themeURL: "",
        };
    },
    mounted(){
        this.cookieData = Cookies.get('jwt');

        //Set interval for carousel
        this.carouselInterval = setInterval(() => {
            this.nextItem();
        }, 5000);
    },
    beforeDestroy(){
        clearInterval(this.carouselInterval);
    },
    async created(){
        const response = await API.getPostByID(this.$route.params.id);
        this.post = response;
        
        if(this.post.privacy === "Private")
        {
            let showPage = false;
            let authorisedVisitor = this.post.allowedVisitor;

            for(let i=0; i<authorisedVisitor.length; i++)
            {
                if(authorisedVisitor[i] === this.cookieData)
                {
                    showPage = true;
                    console.log(this.cookieData+" is authorised")
                }
            }
            if(showPage === false)
            {
                this.$router.push({name: 'home', params: {unauthorisedMessage: "You are not allowed to visit this memorial!"}});
            }
        }

        if(this.post.theme === "Blue")
        {
            this.themeURL = 'simple_blue.jpg';
        }
        else if(this.post.theme === "Pink Flowers")
        {
            this.themeURL = 'pink_flower_pink_background.jpg';
        }
        else if(this.post.theme === "Purple Flowers")
        {
            this.themeURL = 'purple_flower_white_background.jpg';
        }
        else if(this.post.theme === "Blue Pink Gradient")
        {
            this.themeURL = 'blue_pink_gradient.jpg';
        }
        else if(this.post.theme === "Autumn Leaves")
        {
            this.themeURL = 'autumn_leaves.jpg';
        }
        else if(this.post.theme === "Default")
        {
            this.themeURL = 'flower_background_img3.jpg';
        }
        else
        {
            this.themeURL = 'flower_background_img3.jpg';
        }

        for(let i=0; i<this.post.gallery.length; i++)
        {
            if(this.post.gallery[i].fileType === "Video")
            {
                this.videoFiles.push(this.post.gallery[i]);
            }
        }

        for(let i=0; i<this.post.gallery.length; i++)
        {
            if(this.post.gallery[i].fileType === "Picture")
            {
                this.pictureFiles.push(this.post.gallery[i]);
            }
        }
        console.log(this.pictureFiles);

    },
    methods:{
        async removePost(id){
            const response = await API.deletePost(id);
            this.$router.push({name: 'home', params: {message: response.message}})
        },
        prevItem() {
            this.currentIndex = (this.currentIndex - 1 + this.post.gallery.length) % this.post.gallery.length;
        },
        nextItem() {
            this.currentIndex = (this.currentIndex + 1) % this.post.gallery.length;
        },
        share(){
            const url = location.href;
            window.navigator.clipboard.writeText(url);
            window.alert("The link has been successfully copied!");
        }
    }
};

</script>

<style>
.carousel-item {
  display: none;
  position: relative;
}

.carousel-item.active {
  display: block;
}
</style>