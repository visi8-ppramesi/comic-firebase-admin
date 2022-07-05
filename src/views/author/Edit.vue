<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Edit Author</hero-bar>
  <main-section>
    <author-card
      class="mb-6"
      title="Author"
      label="Add a new author"
      :icon="mdiSquareEditOutline"
      has-table
    >
      <form class="w-full max-w-full">
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
      </form>
      <div>
        <p class="font-bold text-gray-700">
          Social Media Links :
        </p>
        <!-- <button class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add a new social media</button> -->
        <div class="my-1">
          <div class="bg-white shadow shadow-2xl max-w-xl px-5 py-3">
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

          <div class="bg-white shadow shadow-2xl max-w-xl px-5 py-3">
            <p class="font-bold py-1">
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

        <p class="font-bold text-gray-700">
          Profile Photo :
        </p>

        <div class="max-w-xl mt-3">
          <div>
            <img
              v-if="imageDataUrl"
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
              Select Profile Picture
            </button>
          </div>
        </div>

        <router-link :to="{name: 'author', params: { id: author.id}}">
          <button
            class="mt-3 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
            @click="updateAuthors(author.id)"
          >
            Save
          </button>
        </router-link>
      </div>
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
import { doc, updateDoc } from 'firebase/firestore'
import firebase from '@/firebase/firebase'
export default {
	data () {
		return {
			// social_media: [{
			//   name: '',
			//   link: ''
			// }],
			author: {
				social_media_links: {
					facebook: null,
					twitter: null
				}
			},
			profile_picture_url: null,
			profilePictureChanged: false,
			imageDataUrl: null
		}
	},
	created () {
		this.fetchAuthor()
	},
	methods: {
		async fetchAuthor () {
			this.author = await Author.getDocumentWithStorageResource(this.$route.params.id, ['profile_picture_url'])
			console.log(this.author)
		},
		async updateAuthors (authorId) {
			const docRef = doc(firebase.db, 'authors', authorId)
			await updateDoc(docRef, {
				name: this.author.name,
				email: this.author.email,
				description: this.author.description,
				social_media_links: {
					facebook: this.social_media_links.facebook,
					twitter: this.social_media_links.twitter
				},
				profile_picture_url: this.imageDataUrl
			})
			console.log(docRef)
			this.$router.push('/author')
		}
		// addNewSocialMedia () {
		//   this.social_media.push({
		//     name: '',
		//     link: ''
		//   })
		// },
		// deleteSocialMedia (index) {
		//   this.social_media.splice(index, 1)
		// }
	}
}
</script>

<script setup>
const titleStack = ref(['Admin', 'Author', 'Edit'])
</script>
