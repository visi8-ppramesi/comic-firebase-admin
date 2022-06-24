/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router'
import emitter from '@/utils/emitter'
import Home from '@/views/Home.vue'
import ComicList from '@/views/comic/List.vue'
import AuthorList from '@/views/author/List.vue'
import GenreList from '@/views/genre/List.vue'
import TagList from '@/views/tag/List.vue'
import CommentList from '@/views/comment/List.vue'
import UserList from '@/views/user/List.vue'
import UserProfile from '@/views/user/Profile.vue'
import Settings from '@/views/settings/settings.vue'
import ComicAdd from '@/views/comic/Add.vue'
import ComicEdit from '@/views/comic/Edit.vue'
import AuthorAdd from '@/views/author/Add.vue'
import AuthorEdit from '@/views/author/Edit.vue'
import GenreAdd from '@/views/genre/Add.vue'
import GenreEdit from '@/views/genre/Edit.vue'
import TagAdd from '@/views/tag/Add.vue'
import TagEdit from '@/views/tag/Edit.vue'
import Logout from '@/views/Logout.vue'

const authRoutes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard',
      requiresAuth: true
    },
    path: '/dashboard',
    name: 'Dashboard',
    component: Home
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Comic List',
      requiresAuth: true
    },
    path: '/comic',
    name: 'comic',
    component: ComicList
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Comic Add',
      requiresAuth: true
    },
    path: '/comic/add',
    name: 'comic add',
    component: ComicAdd
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Comic Edit',
      requiresAuth: true
    },
    path: '/comic/:id',
    name: 'comicEdit',
    component: ComicEdit
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Author List',
      requiresAuth: true
    },
    path: '/author',
    name: 'author',
    component: AuthorList
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Author Add',
      requiresAuth: true
    },
    path: '/author/add',
    name: 'author add',
    component: AuthorAdd
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Author Edit',
      requiresAuth: true
    },
    path: '/author/:id',
    name: 'authorEdit',
    component: AuthorEdit
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Genre List',
      requiresAuth: true
    },
    path: '/genre',
    name: 'genre',
    component: GenreList
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Genre Add',
      requiresAuth: true
    },
    path: '/genre/add',
    name: 'genre add',
    component: GenreAdd
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Genre Edit',
      requiresAuth: true
    },
    path: '/genre/:id',
    name: 'genreEdit',
    component: GenreEdit
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Tag List',
      requiresAuth: true
    },
    path: '/tag',
    name: 'tag',
    component: TagList
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Tag Add',
      requiresAuth: true
    },
    path: '/tag/add',
    name: 'tag add',
    component: TagAdd
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Tag Edit',
      requiresAuth: true
    },
    path: '/tag/:id',
    name: 'tagEdit',
    component: TagEdit
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Comment List',
      requiresAuth: true
    },
    path: '/comment',
    name: 'comment',
    component: CommentList
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'User List',
      requiresAuth: true
    },
    path: '/user',
    name: 'user',
    component: UserList
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'User Profile',
      requiresAuth: true
    },
    path: '/user/profile',
    name: 'user profile',
    component: UserProfile
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Settings',
      requiresAuth: true
    },
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Logout',
      requiresAuth: true
    },
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
]

const routes = [
  {
    meta: {
      title: 'Login',
      fullScreen: true
    },
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },
  {
    meta: {
      title: 'Tables'
    },
    path: '/tables',
    name: 'tables',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '@/views/Tables.vue')
  },
  {
    meta: {
      title: 'Forms'
    },
    path: '/forms',
    name: 'forms',
    component: () => import(/* webpackChunkName: "forms" */ '@/views/Forms.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue')
  },
  {
    meta: {
      title: 'Ui'
    },
    path: '/ui',
    name: 'ui',
    component: () => import(/* webpackChunkName: "ui" */ '@/views/Ui.vue')
  },
  {
    meta: {
      title: 'Responsive layout'
    },
    path: '/responsive',
    name: 'responsive',
    component: () => import(/* webpackChunkName: "responsive" */ '@/views/Responsive.vue')
  },
  {
    meta: {
      title: 'Error',
      fullScreen: true
    },
    path: '/error',
    name: 'error',
    component: () => import(/* webpackChunkName: "error" */ '@/views/Error.vue')
  },
  ...authRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  //eslint-disable-next-line no-unused-vars
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if(from.name && from.name !== 'Login'){
    const fromRoute = {
      name: from.name,
      params: from.params,
      query: from.query
    }
    localStorage.setItem('fromRoute', JSON.stringify(fromRoute))
  }
  
  emitter.emit('navigate')
  const loggedIn = localStorage.getItem('uid')

  if (to.meta.requiresAuth && !loggedIn) {
    return next('/')
  }

  next();
});

export default router
