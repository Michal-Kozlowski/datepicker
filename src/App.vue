<template>
  <div class="main">
    <AppReservation
      :price="298"
      :rate="4.5"
      :rate-count="123"
      :dates-unavailable="['2021-11-20', '2021-12-25', '2021-12-26']"
    />
  </div>
</template>

<script>
import AppReservation from '@/components/AppReservation.vue';

export default {
  name: 'App',
  components: {
    AppReservation,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap");

body,
html {
  height: 100%;
  margin: 0;
  background-color: $backgroundGrey;
  font-family: "Roboto", sans-serif;
  color: $mainTextGrey;
}

p {
  margin: 0;
}

.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
