import AuthorList from '../../src/views/author/List.vue'
import { mount } from '@vue/test-utils'
import options from '../utils/pluginInitializer.js'

test('AuthorList', async () => {
    const wrapper = mount(AuthorList, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        slots: {
            default: 'Author List'
        }
    })

    expect(wrapper.find('#hero-bar').text()).toContain('Author List')
    expect(wrapper.find('#card-component-title').exists()).toBe(true)
    expect(wrapper.find('#card-component-title').text()).toBe('Authors')
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Author List"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)
})