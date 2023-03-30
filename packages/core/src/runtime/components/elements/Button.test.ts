import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VButton from './Button.vue'

describe('UI button', () => {
  it('render button', () => {
    const wrapper = mount(VButton)

    expect(wrapper).toBeDefined()
  })
})