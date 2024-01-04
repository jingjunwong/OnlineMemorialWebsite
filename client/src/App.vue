<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Remembrance</v-toolbar-title>
      <v-icon class="px-2">mdi-heart</v-icon>

      <v-spacer></v-spacer>

      <v-btn rounded color="primary" class="mx-3" v-if="this.cookieData" @click="logoutFunction" to="/"> 
        Logout
      </v-btn>

      <v-btn rounded color="primary" class="mx-3" to="/login" v-if="!this.cookieData">
        Login
      </v-btn>
      
      <v-btn rounded outlined color="success" class="mx-3" to="/register" v-if="!this.cookieData">
        Sign Up
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            Remembrance
          </v-list-item-title>
          <v-list-item-subtitle>
            An online memorial application
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dense>
      <v-list-item-group color="primary">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.link" link
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :to="userProfileLink" v-if="cookieData != null">
        <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>My Profile</v-list-item-title></v-list-item-content>
      </v-list-item>
      </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="px-5">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer color="inherit">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        :to="link.link"
        color="inherit"
        variant="text"
        class="mx-2"
        rounded="xl"
      >
        {{ link.title }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Remembrance</strong>
      </v-col>
    </v-row>
  </v-footer>
  </v-app>
</template>

<script>
import Cookies from 'js-cookie';

  export default {
    data: () => ({ 
      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-home', link: "/" },
        { title: 'Create New Memorial', icon: 'mdi-abugida-thai', link: "/add-post" },
        { title: 'About', icon: 'mdi-help-box', link: "/about" },
        { title: 'FAQ', icon: 'mdi-frequently-asked-questions', link: "/faq"},
        { title: 'Contact Us', icon: 'mdi-forum', link: "/contact-us"},
      ],
      userProfileLink: '/userProfile',
      cookieData: null,
    }),
    created(){
      
    },
    mounted(){
      const theCookieData = Cookies.get('jwt');
      console.log(theCookieData);
      this.cookieData = theCookieData;

    },
    methods: {
      logoutFunction(){
        Cookies.remove('jwt');
        window.location.reload();
      }
    }
  };
</script>