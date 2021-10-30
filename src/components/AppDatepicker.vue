<template>
  <div class="datepicker" @click.stop>
    <div class="datepicker__header">
      <div class="datepicker__navigation datepicker__navigation--back" @click="adjustMonth(-1)" />
      <h3 class="datepicker__header-text">{{ selectedMonth }}</h3>
      <div class="datepicker__navigation datepicker__navigation--forth" @click="adjustMonth(1)" />
    </div>
    <div class="datepicker__callendar">
      <p
        v-for="day in weekDays"
        :key="`week-day-${day}`"
        class="datepicker__week-day datepicker__week-day--name">
          {{ day }}
      </p>
      <p
        v-for="date in monthCallendar"
        :key="date"
        :class="[
          'datepicker__week-day',
          {'datepicker__week-day--current-month': isDateInThisMonth(date) }
        ]">
          {{ showDay(date) }}
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'AppDatepicker',
  props: {
    dateRange: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedMonth: moment(this.dateRange.from).format('MMMM YYYY'),
      weekDays: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      monthCallendar: [],
    };
  },
  methods: {
    checkIfDateIsInRange(date) {
      const { to } = this.dateRange;
      return moment(date).isSameOrBefore(to);
    },
    getCallendarForSelectedMonth() {
      const daysFromPrevMonth = moment(this.selectedMonth).day();
      const monthLength = moment(this.selectedMonth).daysInMonth();
      const daysFromNextMonth = 7 - ((monthLength + daysFromPrevMonth) % 7);
      const firstDayOfThisMonth = `${moment(this.selectedMonth).format('YYYY-MM')}-01`;
      const firstDayToShow = moment(firstDayOfThisMonth).subtract(daysFromPrevMonth, 'days').format('YYYY-MM-DD');
      const daysToShow = daysFromPrevMonth + monthLength + daysFromNextMonth;
      this.monthCallendar = [];
      for (let index = 0; index < daysToShow; index += 1) {
        const dayDate = moment(firstDayToShow).add(index, 'days').format('YYYY-MM-DD');
        this.monthCallendar.push(dayDate);
      }
    },
    adjustMonth(delta) {
      this.selectedMonth = moment(this.selectedMonth).add(delta, 'months').format('MMMM YYYY');
      this.getCallendarForSelectedMonth();
    },
    showDay(date) {
      return moment(date).format('D');
    },
    isDateInThisMonth(date) {
      return moment(date).format('YYYY-MM') === moment(this.selectedMonth).format('YYYY-MM');
    },
  },
  beforeMount() {
    this.getCallendarForSelectedMonth();
  },
};
</script>

<style scoped lang="scss">
.datepicker {
  width: 100%;
  position: absolute;
  top: $s56;
  left: -$s8;
  background-color: $white;
  border: 1px solid $borderGrey;
  cursor: initial;

  &::before {
    content: '';
    position: absolute;
    width: $s12;
    height: $s12;
    top: -$s8;
    left: $s24;
    border-top: 1px solid $borderGrey;
    border-left: 1px solid $borderGrey;
    transform: rotate(45deg);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $mainGreen;
  }

  &__header-text {
    margin: 0;
    font-weight: 100;
    color: $white;
  }

  &__navigation {
    position: relative;
    padding: $s32;
    transition-duration: $transition-duration;
    cursor: pointer;

    &:hover {
      background-color: rgba($black, 0.1);

      &::after {
        border-color: $white;
      }
    }

    &::after {
      content: '';
      position: absolute;
      width: $s8;
      height: $s8;
      left: calc(50% - $s8 / 2);
      transform-origin: top right;
      transform: rotate(45deg);
      transition-duration: $transition-duration;
    }

    &--back {
      &::after {
        border-bottom: 4px solid $mainTextGrey;
        border-left: 4px solid $mainTextGrey;
      }
    }

    &--forth {
      &::after {
        border-top: 4px solid $mainTextGrey;
        border-right: 4px solid $mainTextGrey;
      }
    }
  }

  &__callendar {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: $s16;
  }

  &__week-day {
    padding: $s16 0;
    width: calc(100% / 7);
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    text-transform: capitalize;
    color: $lighterTextGrey;
    cursor: pointer;

    &--name {
      color: $lightTextGrey;
      cursor: initial;
    }

    &--current-month {
      color: $secondaryTextGrey;
    }
  }
}
</style>
