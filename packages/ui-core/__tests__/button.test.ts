import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DwButton from '../src/runtime/components/DwButton.vue'

describe('UI button', () => {
    it('render button', () => {
        const wrapper = mount(DwButton)

        expect(wrapper).toBeDefined()
    })
})