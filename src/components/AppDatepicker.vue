<template>
  <div class="datepicker" @click.stop>
    <div class="datepicker__background" @click="closeDatepicker" />
    <div class="datepicker__body">
      <div class="datepicker__header">
        <div class="datepicker__navigation datepicker__navigation--back" @click="adjustMonth(-1)" />
        <h3 class="datepicker__header-text">{{ dateFormatWithMonthName(selectedMonth) }}</h3>
        <div class="datepicker__navigation datepicker__navigation--forth" @click="adjustMonth(1)" />
      </div>
      <div class="datepicker__callendar">
        <p class="datepicker__unavailable-between" v-if="unavailableInsidePeriod">
          There is an unavailable date during this period.
        </p>
        <p
          v-for="day in weekDays"
          :key="`week-day-${day}`"
          class="datepicker__day-name">
            {{ day }}
        </p>
        <p
          v-for="date in monthCallendar"
          :key="date"
          @click="pickDate(date)"
          :class="[
            'datepicker__day',
            {'datepicker__day--current-month': isInThisMonth(date) },
            {'datepicker__day--today': isToday(date) },
            {'datepicker__day--selected': isBetween(date) },
            {'datepicker__day--first': isFirst(date) },
            {'datepicker__day--last': isLast(date) },
            {'datepicker__day--exact': isExact(date) },
            {'datepicker__day--disabled': isDisabled(date) },
          ]">
            {{ showDay(date) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AppDatepicker',
  props: {
    dateRange: {
      type: Object,
      required: true,
    },
    unavailable: {
      type: Array,
      default() {
        return ([]);
      },
      required: false,
    },
  },
  data() {
    return {
      selectedMonth: this.dateRange.from,
      weekDays: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      monthCallendar: [],
      unavailableInsidePeriod: false,
      closeTimeout: null,
    };
  },
  watch: {
    datepickerOpen() {
      clearTimeout(this.closeTimeout);
    },
  },
  computed: {
    ...mapState([
      'selectedStartDate',
      'selectedEndDate',
      'datepickerOpen',
    ]),
    done() {
      return this.selectedStartDate && !!this.selectedEndDate;
    },
    isOneDay() {
      return this.selectedStartDate === this.selectedEndDate;
    },
  },
  methods: {
    ...mapActions([
      'setStartDate',
      'setEndDate',
      'toggleDatepicker',
    ]),
    dateFormatWithMonthName(date) {
      return moment(date).format('MMMM YYYY');
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
      this.selectedMonth = moment(this.selectedMonth).add(delta, 'months').format('YYYY-MM-DD');
      this.getCallendarForSelectedMonth();
    },
    showDay(date) {
      return moment(date).format('D');
    },
    isInThisMonth(date) {
      return moment(date).format('YYYY-MM') === moment(this.selectedMonth).format('YYYY-MM');
    },
    pickDate(date) {
      if (this.isDisabled(date)) return;
      if (this.unavailableIsInTheMiddle(date)) return;
      if (!this.selectedStartDate || (this.selectedStartDate && this.selectedEndDate)) {
        this.setStartDate(date);
        this.setEndDate('');
        this.unavailableInsidePeriod = false;
      } else {
        if (moment(date).isBefore(this.selectedStartDate)) {
          this.setEndDate(this.selectedStartDate);
          this.setStartDate(date);
          if (this.unavailableIsInTheMiddle(this.selectedEndDate)) return;
        } else {
          this.setEndDate(date);
        }
        this.unavailableInsidePeriod = false;
        this.closeTimeout = setTimeout(() => {
          this.toggleDatepicker();
        }, 300);
      }
    },
    isToday(date) {
      return moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
    },
    isBetween(date) {
      return this.done && moment(date).isBetween(this.selectedStartDate, this.selectedEndDate);
    },
    isFirst(date) {
      return moment(date).format('YYYY-MM-DD') === moment(this.selectedStartDate).format('YYYY-MM-DD');
    },
    isLast(date) {
      return this.done && moment(date).format('YYYY-MM-DD') === moment(this.selectedEndDate).format('YYYY-MM-DD');
    },
    isExact(date) {
      return this.isFirst(date) && (this.isOneDay || !this.selectedEndDate);
    },
    isDisabled(date) {
      const beforeAllowed = moment(date).isBefore(this.dateRange.from);
      const afterAllowed = moment(date).isAfter(this.dateRange.to);
      return beforeAllowed || afterAllowed || this.unavailable?.includes(date);
    },
    unavailableIsInTheMiddle(date) {
      let isUnavailable = false;
      if (this.unavailable?.find((disabled) => moment(disabled).isBetween(this.selectedStartDate, date))) {
        this.unavailableInsidePeriod = true;
        this.setStartDate('');
        isUnavailable = true;
      }
      return isUnavailable;
    },
    closeDatepicker() {
      this.unavailableInsidePeriod = false;
      this.toggleDatepicker();
    },
  },
  beforeMount() {
    this.getCallendarForSelectedMonth();
  },
};
</script>

<style scoped lang="scss">
.datepicker {
  position: absolute;
  width: 100%;
  top: $s56;
  left: -$s8;

  &__body {
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
    position: relative;
  }

  &__unavailable-between {
    font-size: 14px;
    line-height: 16px;
    width: 100%;
    text-align: center;
    color: $mainRed;
    position: absolute;
    top: $s4;
    left: 0;
  }

  &__day,
  &__day-name {
    padding: $s16 0;
    width: calc(100% / 7);
    font-size: 14px;
    line-height: 16px;
    font-weight: 700;
    text-align: center;
    text-transform: capitalize;
    color: $lighterTextGrey;
    cursor: pointer;
  }

  &__day-name {
    color: $lightTextGrey;
    cursor: initial;
  }

  &__day {
    position: relative;
    transition-duration: $transition-duration;

    &::after {
      content: '';
      position: absolute;
      top: calc(50% - 32px / 2 - 2px);
      left: calc(50% - 32px / 2 - 2px);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid transparent;
      transition-duration: $transition-duration;
    }

    &:hover {
      color: $mainGreen;

      &::after {
        border-color: $mainGreen;
      }
    }

    &--current-month {
      color: $secondaryTextGrey;
    }

    &--today {
      &::after {
        border-color: $mainGreen;
      }
    }

    &--selected,
    &--first,
    &--last {
      color: $mainGreen;
      z-index: 1;

      &::before {
        content: '';
        width: 100%;
        height: 36px;
        position: absolute;
        top: calc((100% - 36px) / 2 );
        left: 0;
        z-index: -2;
        background-color: $washedGreen;
      }
    }

    &--first,
    &--last {
      color: $white;

      &:hover {
        color: $white;
      }

      &::after {
        background: $mainGreen;
        z-index: -1;
      }
    }

    &--first {
      &::before {
        width: 50%;
        left: 50%;
      }
    }

    &--last {
      &::before {
        width: 50%;
      }
    }

    &--exact {
      &::before {
        display: none;
      }
    }

    &--disabled {
      cursor: not-allowed;
      text-decoration: line-through;
      background: $borderGrey;

      &::after {
        border: none;
      }

      &:hover {
        color: $mainRed;
      }
    }
  }

  &__background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: auto;
  }
}
</style>
