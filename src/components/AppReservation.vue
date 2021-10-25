<template>
  <div class="reservation">
    <p class="reservation__price">{{ price }} zł</p>
    <div class="reservation__rate">
      <AppStars :rate="rate" />
      <p class="reservation__rate-count">{{ rateCount }}</p>
    </div>
    <p class="reservation__dates-header">Dates</p>
    <div class="reservation__datepicker" @click="toggleDatepicker">
      <p class="reservation__check">Check In</p>
      <p class="reservation__check">Check Out</p>
    </div>
    <AppDatepicker v-if="datepickerOpen" />
    <p class="reservation__selected-dates">17.12.2021 - 22.12.2021</p>
    <div class="reservation__group-size">
      <button
        v-for="(number, index) in 5"
        :key="`group-of-${index + 1}`"
        class="reservation__button"
      >
        {{ number }}
      </button>
    </div>
    <button class="reservation__button">Dog</button>
    <div class="reservation__actions">
      <button class="reservation__accept">Accept</button>
      <button class="reservation__clear">Clear</button>
    </div>
  </div>
</template>

<script>
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
  },
  data() {
    return {
      datepickerOpen: false,
    };
  },
  methods: {
    toggleDatepicker() {
      this.datepickerOpen = !this.datepickerOpen;
    },
  },
};
</script>

<style scoped lang="scss">
.reservation {
  width: 360px;
  padding: $s24 $s32;
  margin: $s8;
  border: 1px solid $borderGrey;
  background-color: $backgroundGrey;

  &__price {
    font-size: 28px;
    font-weight: 900;
    margin-bottom: $s8;
  }

  &__rate {
    display: flex;
    width: 100%;
    padding-bottom: $s24;
    margin-bottom: $s24;
    border-bottom: 1px solid $borderGrey;
  }

  &__rate-count {
    font-size: 14px;
    font-weight: 700;
    margin-top: $s2;
    margin-left: $s8;
  }

  &__dates-header {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: $s8;
  }

  &__datepicker {
    display: flex;
    justify-content: space-between;
    padding: $s8;
    border: 1px solid $borderGrey;
    border-radius: $s2;
    cursor: pointer;
    position: relative;
    transition-duration: $transition-duration;

    &:hover {
      background-color: rgba($washedAccentGreen, 0.2);
    }

    &::before {
      content: "";
      width: 24px;
      height: 2px;
      position: absolute;
      top: calc(50% - 2px / 2);
      left: calc(50% - 24px / 2);
      background-color: $mainTextGrey;
    }

    &::after {
      content: "";
      width: 10px;
      height: 10px;
      position: absolute;
      top: calc(50% - 12px / 2);
      left: calc(50% + 2px / 2);
      border-top: 2px solid $mainTextGrey;
      border-right: 2px solid $mainTextGrey;
      transform: rotate(45deg);
    }
  }

  &__check {
    font-size: 18px;
    border-radius: $s4;
    padding: $s4 $s8;
    width: calc(50% - 30px - $s16);

    &--active {
      background-color: $washedAccentGreen;
    }
  }

  &__selected-dates {
  }

  &__group-size {
  }

  &__button {
  }

  &__actions {

  }

  &__accept {

  }

  &__clear {

  }
}
</style>
