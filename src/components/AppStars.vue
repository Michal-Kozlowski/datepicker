<template>
  <div class="stars" :style="starsStyles">
    <div class="stars__rate" :style="rateStyles"></div>
  </div>
</template>

<script>
export default {
  name: 'AppStars',
  props: {
    rate: {
      type: Number,
      required: false,
    },
    starSize: {
      type: Number,
      required: false,
      default: 16,
    },
    numberOfStars: {
      type: Number,
      required: false,
      default: 5,
    },
  },
  computed: {
    starsStyles() {
      return {
        width: `${this.numberOfStars * this.starSize}px`,
        height: `${this.starSize}px`,
      };
    },
    rateStyles() {
      return {
        width: `${this.rate * this.starSize}px`,
        height: `${this.starSize}px`,
        minWidth: `${this.starSize}px`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.stars {
  background-color: $borderGrey;
  mask-image: url("~@/assets/images/star.svg");
  position: relative;

  &__rate {
    content: "";
    background-color: $accentGreen;
    mask-image: url("~@/assets/images/star.svg");
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
