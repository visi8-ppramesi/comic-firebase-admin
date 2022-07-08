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
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th class="flex justify-center">
          Actions
        </th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(user, index) in users"
        :key="user.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
        <checkbox-cell
          v-if="checkable"
          @checked="checked($event, user)"
        />
        <td data-label="Id">
          {{ user.id }}
        </td>
        <td data-label="Name">
          {{ user.name }}
        </td>
        <td data-label="Email">
          {{ user.email }}
        </td>
        <td class="actions-cell">
          <div
            class="flex justify-end"
            no-wrap
          >
            <div class="px-2">
              <router-link :to="{name: 'userDetail', params: { id: user.id}}">
                <button class="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded">
                  Detail
                </button>
              </router-link>
            </div>
          </div>
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

<script>
import { computed, ref } from 'vue'
import { useMainStore } from '@/store/main'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import User from '@/firebase/users/User'
export default {
	data () {
		return {
			users: {}
		}
	},
	mounted () {
		this.fetchUsers()
	},
	methods: {
		async fetchUsers () {
			const users = await User.getUsers()
			this.users = users
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

const items = computed(() => mainStore.user)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref([])

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
