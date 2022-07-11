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
      >
        <div class="flex items-center border-b border-teal-500 py-2 max-w-3xl">
          <input
            v-model="author.name"
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
              v-model="author.email"
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
            v-model="author.description"
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
          <div class="my-5">
            <div class="bg-white shadow shadow-2xl max-w-xl p-5">
              <p class="font-bold py-3">
                Facebook
              </p>
              <input
                id="grid-first-name"
                v-model="author.social_media_links.facebook"
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
                v-model="author.social_media_links.twitter"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Enter Author's Social Media Link"
              >
              <!-- <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button> -->
            </div>
          </div>

          <div>
            <div class="max-w-xl mt-3">
              <p class="font-bold text-gray-700">
                Profile Image :
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
                  :src="author.profile_picture_url"
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
import Author from '@/firebase/Author.js'
import handleError from '@/utils/handleError.js'
// import { getStorage, ref } from "firebase/storage"
export default {
	data () {
		return {
      author: {
        name: [],
        email: [],
        description: [],
        social_media_links: {
          facebook: [],
          twitter: []
        },
      },
			coverImage: null,
			coverImageChanged: false,
			imageDataUrl: null
		}
	},
	methods: {
		async submitData () {
			try {
				// eslint-disable-next-line camelcase
				const { name, email, description, social_media_links: {facebook, twitter} } = this.author
				const newAuthor = await Author.createDocument(
					{
						name,
            email,
            description,
            social_media_links: {
              facebook,
              twitter
            }
					}
				)
				console.log(newAuthor)
				if (this.coverImageChanged) {
					try {
						console.log('asdfasdf')
						await newAuthor.adminUploadField('profile_picture_url', 'authors/' + newAuthor.id, this.coverImage)
					} catch (err) {
						await newAuthor.deleteDocument()
						console.error('error... deleting...')
						handleError(err, 'uploadFileError')
						throw err
					}
				}
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
		},
		onFileChange (event) {
			this.coverImage = event.target.files[0]
			this.imageDataUrl = URL.createObjectURL(this.coverImage)
			this.coverImageChanged = true
		}
	}
}
</script>

<script setup>
const titleStack = ref(['Admin', 'Author', 'Add'])
</script>
