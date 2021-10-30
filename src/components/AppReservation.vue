<template>
  <div :class="['reservation', { 'reservation--sent': reservationSent }]">
    <p class="reservation__price">{{ price }} zł</p>
    <div class="reservation__rate">
      <AppStars :rate="rate" />
      <p class="reservation__rate-count">{{ rateCount }}</p>
    </div>
    <p class="reservation__header">Dates</p>
    <div class="reservation__datepicker" @click="toggleDatepicker">
      <p class="reservation__check">{{ dates.from || 'Check In' }}</p>
      <p class="reservation__check">{{ dates.to || 'Check Out' }}</p>
      <AppDatepicker v-show="!datepickerOpen" :dateRange="dateRange" />
    </div>
    <p class="reservation__header">Personal Info</p>
    <form class="reservation__section">
      <input
        class="reservation__input reservation__item"
        v-model="name"
        type="text"
        placeholder="First Name"
      />
      <input
        class="reservation__input reservation__item"
        v-model="surname"
        type="text"
        placeholder="Last Name"
      />
      <input
        class="reservation__input reservation__item reservation__item--full"
        v-model="email"
        type="email"
        placeholder="Email"
      />
      <input
        class="reservation__input reservation__item reservation__item--full"
        v-model="phone"
        type="phone"
        placeholder="Phone"
      />
    </form>
    <div class="reservation__actions reservation__section">
      <button
        @click="submitForm"
        class="reservation__button reservation__accept reservation__item">
        Accept
      </button>
      <button
        @click="clearForm"
        class="reservation__button reservation__clear reservation__item">
        Clear
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import AppDatepicker from '@/components/AppDatepicker.vue';
import AppStars from '@/components/AppStars.vue';

export default {
  name: 'AppReservation',
  components: {
    AppDatepicker,
    AppStars,
  },
  props: {
    price: {
      type: Number,
      required: false,
    },
    rate: {
      type: Number,
      required: false,
    },
    rateCount: {
      type: Number,
      required: false,
    },
    dateRange: {
      type: Object,
      required: false,
      default() {
        return ({
          from: moment().format('YYYY-MM-DD'),
          to: moment().add(6, 'months').format('YYYY-MM-DD'),
        });
      },
    },
  },
  data() {
    return {
      datepickerOpen: false,
      name: '',
      surname: '',
      email: '',
      phone: '',
      dates: {
        from: '21-12-2021',
        to: null,
      },
      reservationSent: false,
    };
  },
  methods: {
    toggleDatepicker() {
      this.datepickerOpen = !this.datepickerOpen;
    },
    submitForm() {
      this.reservationSent = true;
    },
    clearForm() {
      this.name = '';
      this.surname = '';
      this.email = '';
      this.phone = '';
    },
  },
};
</script>

<style scoped lang="scss">
.reservation {
  font-size: 18px;
  position: relative;
  width: 360px;
  padding: $s24 $s32;
  margin: $s8;
  border: 1px solid $borderGrey;
  background-color: $backgroundGrey;

  &--sent {
    &::before,
    &::after {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
    }

    &::before {
      content: '';
      top: 0;
      z-index: 2;
      background-color: rgba($black, 0.4);
      backdrop-filter: blur(5px);
    }

    &::after {
      content: 'Thank you for booking :)';
      font-size: 24px;
      position: absolute;
      top: calc(50% - $s24/2);
      text-align: center;
      z-index: 3;
      color: $washedGreen;
      text-shadow: 0 0 16px $black;
    }
  }

  &__price {
    font-size: 28px;
    font-weight: 900;
    margin-bottom: $s8;
  }

  &__rate {
    display: flex;
    width: 100%;
    padding-bottom: $s24;
    border-bottom: 1px solid $borderGrey;
  }

  &__rate-count {
    font-size: 14px;
    font-weight: 700;
    margin-top: $s2;
    margin-left: $s8;
  }

  &__header {
    font-size: 14px;
    font-weight: 700;
    margin: $s24 $s2 $s8;
  }

  &__datepicker {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: $s8;
    border: 1px solid $borderGrey;
    border-radius: $s4;
    cursor: pointer;
    user-select: none;
    transition-duration: $transition-duration;

    &:hover {
      background-color: rgba($washedAccentGreen, 0.2);
    }

    &::before {
      content: "";
      position: absolute;
      width: 24px;
      height: 2px;
      top: calc(50% - 2px / 2);
      left: calc(50% - 24px / 2);
      background-color: $mainTextGrey;
    }

    &::after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      top: calc(50% - 12px / 2);
      left: calc(50% + 2px / 2);
      border-top: 2px solid $mainTextGrey;
      border-right: 2px solid $mainTextGrey;
      transform: rotate(45deg);
    }
  }

  &__check {
    width: calc(50% - 30px - $s16);
    padding: $s4 $s8;
    border-radius: $s4;

    &--active {
      background-color: $washedAccentGreen;
    }
  }

  &__selected-dates {
    padding: $s8;
    margin-top: $s16;
    border: 1px solid $borderGrey;
    text-align: center;
  }

  &__section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-radius: $s4;
  }

  &__item {
    width: calc(50% - 3 * $s8);
    padding: $s12 $s8;
    margin-bottom: $s16;
    font-size: inherit;
    border: 1px solid $borderGrey;

    &--full {
      width: 100%;
    }
  }

  &__input {
    background-color: transparent;
    border-radius: $s4;
  }

  &__button {
    border-radius: $s4;
    transition-duration: $transition-duration;
    cursor: pointer;

    &:hover {
      color: $white;
    }
  }

  &__actions {
    margin-top: $s16;
  }

  &__accept {
    &:hover {
      background: $mainGreen;
    }
  }

  &__clear {
    &:hover {
      background: $mainRed;
    }
  }
}
</style>
