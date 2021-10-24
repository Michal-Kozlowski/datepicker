<template>
  <div class="reservation">
    <p class="reservation__price">{{ price }} zł</p>
    <div class="reservation__rate">
      <AppStars :rate="rate" />
      <p class="reservation__rate-count">{{ rateCount }}</p>
    </div>
    <button @click="toggleDatepicker">Toggle datepicker</button>
    <AppDatepicker v-if="datepickerOpen" />
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
  width: 480px;
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
    font-size: 16px;
    font-weight: 700;
    margin-top: $s2;
    margin-left: $s8;
  }
}
</style>
