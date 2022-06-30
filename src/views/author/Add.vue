<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Add a New Author</hero-bar>
  <main-section>
    <author-card
      class="mb-6"
      title="Author"
      label="Add a new author"
      :icon="mdiSquareEditOutline"
      has-table
    >
      <form
        class="w-full max-w-full"
        @submit.prevent="addAuthors"
      >
        <div class="flex items-center border-b border-teal-500 py-2 max-w-3xl">
          <input
            v-model="name"
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Author's Name"
          >
        </div>

        <div class="flex flex-wrap -mx-3 mt-10 mb-6 max-w-3xl">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Email
            </label>
            <input
              id="grid-first-name"
              v-model="email"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Enter Author's Email"
            >
          </div>
        </div>

        <div class="mb-3 max-w-3xl">
          <label
            for="exampleFormControlTextarea1"
            class="form-label font-bold inline-block mb-2 text-gray-700"
          >Description</label>
          <textarea
            id="exampleFormControlTextarea1"
            v-model="description"
            class="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
            rows="3"
            placeholder="Please Enter Author Description"
          />
        </div>
        <div>
          <p class="font-bold text-gray-700">
            Social Media Links :
          </p>
          <button class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add a new social media
          </button>
          <div class="my-5">
            <div class="bg-white shadow shadow-2xl max-w-xl p-5">
              <p class="font-bold py-3">
                Facebook
              </p>
              <input
                id="grid-first-name"
                v-model="social_media_links.facebook"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Enter Author's Social Media Link"
              >
              <!-- <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button> -->
            </div>

            <div class="bg-white shadow shadow-2xl max-w-xl p-5">
              <p class="font-bold py-3">
                Twitter
              </p>
              <input
                id="grid-first-name"
                v-model="social_media_links.twitter"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Enter Author's Social Media Link"
              >
              <!-- <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button> -->
            </div>
          </div>

          <p class="font-bold text-gray-700">
            Profile Photo :
          </p>

          <div class="max-w-xl mt-3">
            <div>
              <img
                v-if="imageDataUrl"
                class="preview"
                height="268"
                width="356"
                :src="imageDataUrl"
              >
              <input
                ref="profilePictureRef"
                type="file"
                style="display:none"
                @change="onFileChange"
              >
              <button
                class="font-bold px-3 border-2 rounded"
                @click="selectProfile"
              >
                Choose Profile Picture
              </button>
            </div>
          </div>

          <button class="mt-5 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">
            Save
          </button>
        </div>
      </form>
    </author-card>
  </main-section>
</template>

<script>
import { ref } from 'vue'
import { mdiSquareEditOutline } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import AuthorCard from '@/views/author/component/AuthorCard.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import { collection, addDoc } from 'firebase/firestore'
import firebase from '@/firebase/firebase'
import { ProfilePicture } from '@/firebase/types'
// import { getStorage, ref } from "firebase/storage"
export default {
  data () {
    return {
      // social_media: [{
      //   name: '',
      //   link: ''
      // }]
      name: null,
      email: null,
      description: null,
      social_media_links: {
        facebook: null,
        twitter: null
      },
      profile_picture_url: null,
      imageDataUrl: null,
      ProfilePicture: null
    }
  },
  methods: {
    // addNewSocialMedia () {
    //   this.social_media.push({
    //     name: '',
    //     link: ''
    //   })
    // },
    // deleteSocialMedia (index) {
    //   this.social_media.splice(index, 1)
    // }
    async addAuthors () {
      const author = {
        name: this.name,
        email: this.email,
        description: this.description,
        social_media_links: {
          facebook: this.social_media_links.facebook,
          twitter: this.social_media_links.twitter
        },
        profile_picture_url: this.imageDataUrl
      }
      const addData = await addDoc(collection(firebase.db, 'authors'), author)
      this.imageDataUrl = await ProfilePicture.uploadField('profile_picture_url', '/profile_images' + this.ProfilePicture)
      this.$router.push('/author')
      console.log(addData)
    },
    onFileChange (event) {
      this.ProfilePicture = event.target.files[0]
      this.imageDataUrl = URL.createObjectURL(this.ProfilePicture)
    },
    selectProfile () {
      this.$refs.profilePictureRef.click()
    }
  }
}
</script>

<script setup>
const titleStack = ref(['Admin', 'Author', 'Add'])
</script>
