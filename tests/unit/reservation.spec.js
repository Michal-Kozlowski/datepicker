import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AppReservation from '@/components/AppReservation.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AppReservation', () => {
  let actions;
  let store;
  let computed;

  beforeEach(() => {
    actions = {
      setStartDate: jest.fn(),
      setEndDate: jest.fn(),
      toggleDatepicker: jest.fn(),
      clearSelectedDates: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
    computed = {
      selectedStartDate() {
        return '2021-12-01';
      },
      selectedEndDate() {
        return '2021-12-05';
      },
    };
  });

  it('trigger toggleDatepicker', () => {
    const wrapper = mount(AppReservation, { store, localVue });
    const reservationDatepicker = wrapper.find('.reservation__datepicker');
    reservationDatepicker.trigger('click');
    expect(actions.toggleDatepicker).toHaveBeenCalled();
  });

  it('clear button clears form', async () => {
    const wrapper = mount(AppReservation, { store, localVue });
    const emailInput = wrapper.find('input[type="email"');
    await emailInput.setValue('test@test.pl');
    const reservationCancel = wrapper.find('.reservation__clear');
    await reservationCancel.trigger('click');
    expect(emailInput.element.value).toBe('');
  });

  it("can't send empty form", async () => {
    const wrapper = mount(AppReservation, { store, localVue });
    await wrapper.find('.reservation__accept').trigger('click');
    expect(wrapper.find('.reservation__error-message').isVisible()).toBe(true);
  });

  it('send filled form', async () => {
    const wrapper = mount(AppReservation, { store, localVue, computed });
    const nameInput = wrapper.find('input[name="name"');
    await nameInput.setValue('John');
    const lastNameInput = wrapper.find('input[name="last-name"');
    await lastNameInput.setValue('Doe');
    const emailInput = wrapper.find('input[type="email"');
    await emailInput.setValue('test@test.pl');
    const phoneInput = wrapper.find('input[type="phone"');
    await phoneInput.setValue('123456789');
    const reservationAccept = wrapper.find('.reservation__accept');
    await reservationAccept.trigger('click');
    const sentForeground = wrapper.find('.reservation--sent');
    expect(sentForeground.exists()).toBe(true);
  });

  it("form with wrong email can't be send", async () => {
    const wrapper = mount(AppReservation, { store, localVue, computed });
    const nameInput = wrapper.find('input[name="name"');
    await nameInput.setValue('John');
    const lastNameInput = wrapper.find('input[name="last-name"');
    await lastNameInput.setValue('Doe');
    const emailInput = wrapper.find('input[type="email"');
    await emailInput.setValue('testtest.pl');
    const phoneInput = wrapper.find('input[type="phone"');
    await phoneInput.setValue('123456789');
    const reservationAccept = wrapper.find('.reservation__accept');
    await reservationAccept.trigger('click');
    const sentForeground = wrapper.find('.reservation--sent');
    expect(sentForeground.exists()).toBe(false);
  });
});
