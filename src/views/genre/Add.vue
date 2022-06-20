<script setup>
import { ref } from 'vue'
import { mdiTable } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TagCard from '@/views/tag/component/TagCard.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

const titleStack = ref(['Admin', 'Genre', 'Add'])
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Add a New Genre</hero-bar>
  <main-section>
    <tag-card
      class="mb-6"
      title="Genre"
      label="Add a new Genre"
      :icon="mdiTable"
      has-table
    >
    <form class="w-full max-w-sm">
        <div class="flex items-center border-b border-teal-500 py-2">
            <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Genre's Name">
        </div>
    </form>
    </tag-card>
  </main-section>
</template>
