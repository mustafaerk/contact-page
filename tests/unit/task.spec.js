import { shallowMount } from '@vue/test-utils'
import ButtonComponent from '../../src/components/Button'
import InputComponent from '../../src/components/FormInput'

describe('Button Component', () => {
  beforeEach(() => {

  })
  it('Check text and button type props work', () => {
    const wrapper = shallowMount(ButtonComponent, {
      propsData: {
        type: 'button',
        text: 'Test Button'
      }
    })
    const buttonComponent = wrapper.find('#button')
    expect(buttonComponent.text()).toMatch('Test Button');
    expect(buttonComponent.attributes().type).toBe('button')
  })
})

describe('Input  Component', () => {

  it('Check is input created with required props', () => {
    const wrapper = shallowMount(InputComponent, {
      propsData: {
        value: '0',
        name: 'test-input',
        type: 'number',
        title: 'Test'
      }
    })
    const testInputComponent = wrapper.find('#test-input')
    expect(testInputComponent.exists()).toBe(true);
    expect(testInputComponent.element.value).toEqual('0')
    expect(testInputComponent.attributes().name).toBe('test-input')
    expect(testInputComponent.attributes().type).toBe('number')
    expect(testInputComponent.attributes().placeholder).toBe('Test')
  })
  it('Check is input show validation error', () => {
    const wrapper = shallowMount(InputComponent, {
      propsData: {
        value: '0',
        name: 'test-input',
        type: 'number',
        title: 'Test',
        isValidated: false,
        validateMessage: 'This input not validated'
      }
    })

    const testInputComponent = wrapper.find('#test-input')
    expect(testInputComponent.exists()).toBe(true);

    const errorLabel = wrapper.find('#input_error')
    expect(errorLabel.exists()).toBe(true);
    expect(errorLabel.text()).toEqual('This input not validated')
  })
  it('Check is input not show  validation error when input valited', () => {
    const wrapper = shallowMount(InputComponent, {
      propsData: {
        value: '0',
        name: 'test-input',
        type: 'number',
        title: 'Test',
        isValidated: true,
        validateMessage: 'This input not validated'
      }
    })

    const testInputComponent = wrapper.find('#test-input')
    expect(testInputComponent.exists()).toBe(true);

    const errorLabel = wrapper.find('#input_error')
    expect(errorLabel.exists()).toBe(false);
  })
})
