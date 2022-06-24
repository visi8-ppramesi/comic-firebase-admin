<script>
import { ref } from 'vue'
import { mdiSquareEditOutline } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import Comic from '@/firebase/comics/Comic.js'
export default {
  data () {
    return {
      comic: {}
    }
  },
  created () {
    this.fetchComic()
  },
  methods: {
    async fetchComic () {
      this.comic = await Comic.getDocumentWithStorageResource(this.$route.params.id, ['cover_image_url'])
    }
  }
}
</script>

<script setup>
const titleStack = ref(['Admin', 'Comic', 'Edit'])
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Edit Comic</hero-bar>
  <main-section>
    <comic-card
        class="mb-6"
        title="Comic"
        label="Add a new comic"
        :icon="mdiSquareEditOutline"
        has-table
        >
        <form class="w-full max-w-full">
            <div class="flex items-center border-b border-teal-500 py-2 max-w-3xl">
                <input v-model="comic.title" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Comic's Name">
            </div>

            <div class="mt-5">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Authors
                </label>
                <div class="flex">
                    <div class="pr-3" v-for="author in comic.authors_data" :key="author.id">
                        <input v-model="author.name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter Author's Email">
                    </div>
                </div>
            </div>

            <div class="flex -mx-3 mt-5 mb-6 max-w-full">
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Genres
                    </label>
                    <input v-model="comic.categories" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter Author's Id">
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Tags
                    </label>
                    <input v-model="comic.tags" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter Author's Id">
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Release Date
                    </label>
                    <input v-model="comic.release_date" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter Author's Id">
                </div>
            </div>

            <div class="mb-3 max-w-3xl">
                <label for="exampleFormControlTextarea1" class="form-label font-bold inline-block mb-2 text-gray-700"
                    >Description :</label
                >
                <textarea
                    v-model="comic.description"
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
        </form>
    </comic-card>
  </main-section>
</template>
