<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Add a New Comic</hero-bar>
  <main-section>
    <comic-card
        class="mb-6"
        title="Comic"
        label="Add a new comic"
        :icon="mdiSquareEditOutline"
        has-table
        >
        <form  @submit.prevent="addComics" class="w-full max-w-full">
            <div class="flex items-center border-b border-teal-500 py-2 max-w-3xl">
                <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Comic's Name">
            </div>

            <div class="mt-5">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Authors
                </label>
                <div class="flex">
                    <div class="pr-3">
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter Author's Name">
                    </div>
                </div>
            </div>

            <div class="flex -mx-3 mt-5 mb-6 max-w-full">
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Genres
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter Author's Id">
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Tags
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter Author's Id">
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Release Date
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter Author's Id">
                </div>
            </div>

            <div class="mb-3 max-w-3xl">
                <label for="exampleFormControlTextarea1" class="form-label font-bold inline-block mb-2 text-gray-700"
                    >Description :</label
                >
                <textarea
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
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Please Enter Author Description"
                ></textarea>
            </div>

            <div class="max-w-xl mt-3">
                <p class="font-bold text-gray-700">Cover Image :</p>
                <label
                    class="flex justify-center w-full h-32 px-4 mt-2 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                    <span class="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span class="font-medium text-gray-600">
                            Drop files to Attach, or
                            <span class="text-blue-600 underline">browse</span>
                        </span>
                    </span>
                    <input type="file" name="file_upload" class="hidden">
                </label>
            </div>

            <div class="my-5">
                <div class="bg-white shadow shadow-2xl max-w-full p-5">
                    <div class="flex items-center justify-center">
                        <div  class="flex-grow items-center justify-center text-lg">Chapter 0</div>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">Insert Chapter After</button>
                    </div>
                </div>
            </div>

            <button class="mt-5 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">Save</button>
        </form>
    </comic-card>
  </main-section>
</template>

<script>
import { ref } from 'vue'
import { mdiSquareEditOutline } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import { collection, addDoc } from 'firebase/firestore'
import firebase from '@/firebase/firebase'
// import { getStorage, ref } from "firebase/storage"
export default {
  data () {
    return {
      // social_media: [{
      //   name: '',
      //   link: ''
      // }]
      title: null,
      authors: {},
      authors_data: {},
      categories: null,
      chapters_data: {
        chapter_number: null,
        chapter_preiew_url: null,
        id: null,
        price: null,
        release_date: null,
        view_count: null
      },
      cover_image_url: null,
      description: null,
      favorite_count: null,
      is_draft: false,
      last_update: null,
      keywords: {},
      release_date: null,
      tags: {},
      view_count: null
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
    async addComics () {
      const addData = await addDoc(collection(firebase.db, 'authors'), this.$data)
      console.log(addData)
      this.$router.go()
    }
  }
}
</script>

<script setup>
const titleStack = ref(['Admin', 'Comic', 'Add'])
</script>
