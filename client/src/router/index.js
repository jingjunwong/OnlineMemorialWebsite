import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import AddPost from '../views/AddPost.vue'
import Post from '../views/Post.vue'
import EditPost from '../views/EditPost.vue'
import ContactUs from '../views/contact-us.vue'
import FAQ from '../views/faq.vue'
import login from '../views/login.vue'
import register from '../views/Register.vue'
import AddTribute from '../views/AddTribute.vue'
import AddPhoto from '../views/AddPhoto.vue'
import AddVisitor from '../views/AddVisitor.vue'
import AddFundraising from '../views/AddFundraising.vue'
import UserProfile from '../views/UserProfile.vue'

import Cookies from 'js-cookie';

function checkLogin(to, from, next){
  if(Cookies.get('jwt')){
    next();
  }
  else{
    next('/login');
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/add-post',
    name: 'add-post',
    beforeEnter: checkLogin,
    component: AddPost
  },
  {
    path: '/post/:id',
    name: 'post',
    component: Post,
  },
  {
    path: '/edit-post/:id',
    name: 'edit-post',
    component: EditPost
  },
  {
    path: '/contact-us',
    name: 'contact-us',
    component: ContactUs
  },
  {
    path: '/faq',
    name: 'faq',
    component: FAQ
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/add-tribute/:id',
    name: 'add-tribute',
    component: AddTribute
  },
  {
    path: '/add-visitor/:id',
    name: 'add-visitor',
    component: AddVisitor
  },
  {
    path: '/add-fundraising/:id',
    name: 'add-fundraising',
    component: AddFundraising
  },
  {
    path: '/userProfile',
    name: 'user-profile',
    component: UserProfile
  },
  {
    path: '/add-photo/:id',
    name: 'add-photo',
    component: AddPhoto
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
