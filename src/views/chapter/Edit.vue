<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Edit Chapter</hero-bar>
  <main-section>
    <author-card
      class="mb-6"
      title="Chapter"
      label="Add a new author"
      :icon="mdiSquareEditOutline"
      has-table
    >
      <form
        class="w-full max-w-full"
      >
        <div class="flex flex-wrap -mx-3 mt-3 mb-6 max-w-3xl">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
              for="grid-first-name"
            >
              Chapter Number
            </label>
            <input
              id="grid-first-name"
              v-model="chapter.chapter_number"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Enter Chapter's Number"
            >
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mt-2 mb-6 max-w-3xl">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
              for="grid-first-name"
            >
              Ar Price
            </label>
            <input
              id="grid-first-name"
              v-model="chapter.ar_price"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Enter Ar Price"
            >
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mt-2 mb-6 max-w-3xl">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
              for="grid-first-name"
            >
              Price
            </label>
            <input
              id="grid-first-name"
              v-model="chapter.price"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Enter Chapter's Price"
            >
          </div>
        </div>

        <div>
          <div class="max-w-xl mt-3">
            <p class="font-bold text-gray-700">
              Cover Image :
            </p>
            <label
              class="flex justify-center w-full h-32 px-4 mt-2 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
            >
              <img
                v-if="imageDataUrl"
                :src="imageDataUrl"
              >
              <img
                v-else-if="coverLoaded"
                :src="chapter.chapter_preview_url"
              >
              <span
                v-else
                class="flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span class="font-medium text-gray-600">
                  Drop files to Attach, or
                  <span class="text-blue-600 underline">browse</span>
                </span>
              </span>
              <input
                accept="image/*"
                type="file"
                name="file_upload"
                class="hidden"
                @change="onFileChange"
              >
            </label>
          </div>

          <button
            class="mt-5 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
            @click.prevent="submitData"
          >
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
import Chapter from '@/firebase/comics/Chapter.js'
import handleError from '@/utils/handleError.js'
import utils from '@/firebase/utils/index.js'
// import { getStorage, ref } from "firebase/storage"
export default {
	data () {
		return {
			chapter: {
				chapter_number: [],
				ar_price: [],
				price: []
			},
			coverImage: null,
			coverImageChanged: false,
			imageDataUrl: null
		}
	},
    created () {
        this.fetchChapter()
	},
	methods: {
		onFileChange (event) {
			this.coverImage = event.target.files[0]
			this.imageDataUrl = URL.createObjectURL(this.coverImage)
			this.coverImageChanged = true
		},
        async fetchChapter () {
			this.chapter = await Chapter.getDocument(['comics', this.$route.params.comicId, 'chapters'], this.$route.params.chapterId)
			if (this.chapter.chapter_preview_url) {
				this.chapter.chapter_preview_url = await utils.getDataUrlFromStorage(this.chapter.chapter_preview_url).then((cover) => {
					this.coverLoaded = true
					return cover
				})
			}
		},
		async submitData () {
			try {
				if (this.coverImageChanged) {
					try {
						console.log('asdfasdf')
						await this.chapter.adminUploadField('chapter_preview_url', 'previews/' + this.chapter.id, this.coverImage)
					} catch (err) {
						await this.chapter.deleteDocument()
						console.error('error... deleting...')
						handleError(err, 'uploadFileError')
						throw err
					}
				}
                const processedData = this.chapter.toDataJSON(['chapter_number', 'ar_price', 'price'])
				await this.chapter.updateDocument(processedData)
				this.$toast.open({
					message: 'Success!',
					type: 'success',
					duration: 5000,
					dismissible: true,
					position: 'bottom'
				})
			} catch (err) {
				console.error(err)
				this.$toast.open({
					message: err.toString(),
					type: 'error',
					duration: 5000,
					dismissible: true,
					position: 'bottom'
				})
			}
			this.$router.back()
		}
	}
}
</script>

<script setup>
const titleStack = ref(['Admin', 'Chapter', 'Edit'])
</script>
