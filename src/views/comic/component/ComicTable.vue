<script>
import { computed, ref } from 'vue'
import { useMainStore } from '@/store/main'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Comic from '@/firebase/comics/Comic.js'
export default {
  mounted () {
    this.fetchComics()
  },
  methods: {
    async fetchComics () {
      const comics = await Comic.getComics()
      console.log(comics)
      this.comics = comics
    }
  },
  data () {
    return {
      comics: {}
    }
  }
}
</script>

<script setup>
defineProps({
  checkable: Boolean
})

const mainStore = useMainStore()

const lightBorderStyle = computed(() => mainStore.lightBorderStyle)

const lightBgStyle = computed(() => mainStore.lightBgStyle)

const tableTrStyle = computed(() => mainStore.tableTrStyle)

const tableTrOddStyle = computed(() => mainStore.tableTrOddStyle)

const darkMode = computed(() => mainStore.darkMode)

const items = computed(() => mainStore.comic)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref([])

// const itemsPaginated = computed(
//   () => comics.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
// )

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, comic) => {
  if (isChecked) {
    checkedRows.value.push(comic)
  } else {
    checkedRows.value = remove(checkedRows.value, row => row.id === comic.id)
  }
}
</script>

<template>
  <modal-box
    v-model="isModalActive"
    title="Sample modal"
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <modal-box
    v-model="isModalDangerActive"
    large-title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <div
    v-if="checkedRows.length"
    class="bg-opacity-50 p-3 dark:bg-gray-800"
    :class="lightBgStyle"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm dark:bg-gray-700"
      :class="lightBgStyle"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>id</th>
        <th>Title</th>
        <th>Author</th>
        <th>Genre</th>
        <th>Release</th>
        <th>Created</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="comic in comics"
        :key="comic.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
        <checkbox-cell
          v-if="checkable"
          @checked="checked($event, comic)"
        />
        <td data-label="Id">
          {{ comic.id }}
        </td>
        <td data-label="Title">
          {{ comic.title }}
        </td>
        <td data-label="Author">
          {{ comic.authors_data[0].name }}
        </td>
        <td data-label="Genre">
          {{ comic.categories }}
        </td>
        <td data-label="Release Date">
          {{ comic.description }}
        </td>
        <td data-label="Release Date">
          {{ comic.last_update }}
        </td>
        <td class="actions-cell">
          <jb-buttons
            type="justify-start lg:justify-end"
            no-wrap
          >
            <jb-button
              color="info"
              :icon="mdiEye"
              small
              @click="isModalActive = true"
            />
            <jb-button
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </jb-buttons>
        </td>
      </tr>
    </tbody>
  </table>
  <div
    :class="lightBorderStyle"
    class="p-3 lg:px-6 border-t dark:border-gray-800"
  >
    <level>
      <jb-buttons>
        <jb-button
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :outline="darkMode"
          small
          @click="currentPage = page"
        />
      </jb-buttons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>
