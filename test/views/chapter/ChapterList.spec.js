import ChapterList from '../../../src/views/chapter/List.vue'
import { mount } from '@vue/test-utils'
import options from '../../utils/pluginInitializer.js'

test('ChapterList', async () => {
    options.plugins.router.push({ name: 'chapter', params: { comicId: 'comic-1', chapterId: 'chapter-1' } })
    await options.plugins.router.isReady()
    
    const wrapper = mount(ChapterList, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        slots: {
            default: 'Chapter List'
        }
    })

    expect(wrapper.find('#hero-bar').text()).toContain('Chapter List')
    expect(wrapper.find('#card-component-title').exists()).toBe(true)
    expect(wrapper.find('#card-component-title').text()).toBe('Chapters')
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Comic", "Chapter List"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)
})