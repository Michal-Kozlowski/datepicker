<template>
  <div class="reservation">
    <button @click="toggleDatepicker">Toggle datepicker</button>
    <AppDatepicker v-if="datepickerOpen" />
  </div>
</template>

<script>
import AppDatepicker from '@/components/AppDatepicker.vue';

export default {
  name: 'AppReservation',
  components: {
    AppDatepicker,
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

}
</style>
