<template>
  <div class="filter-heading s-m-b-32">
    <div class="text-icon-wrapper">
      <div class="schweigen-commercial-icons icon-left l c-t-primary-70"></div>
      <div class="heading xs">Filters</div>
    </div>
  </div>
  <div class="filter-container" v-for="filterGroup in filterGroups" :key="filterGroup.name">
    <div class="filter-trigger">
      <img src="https://assets.website-files.com/6007b4af01b37638d431e8f4/601890cb6ba8ee0877501a94_Filter-Minus.svg"
           loading="lazy"
           alt=""
           class="icon-image mini filter-trigger-icon filter-open"
           style="display: block;">
      <div class="filters-trigger-text">{{ filterGroup.name }}</div>
    </div>
    <div class="filter-options filter-bar-category" style="display: block;">
      <button
        class="filter-option filter-button w-inline-block"
        v-for="filter in filterGroup.filterValues"
        :key="filter"
        v-bind:class="{ 'filter-active': filter.active }"
        v-on:click="activateFilter(filter)">
        {{ filter.display }}
      </button>
    </div>
  </div>
  <hr >
  <FilterReset v-if="sharedState.filtering.filterActive"></FilterReset>
</template>

<script>
// import FilterToggle from '@/components/atoms/FilterToggle.vue';
import FilterReset from '@/components/atoms/FilterReset.vue';

export default {

  name: 'Sidebar',
  components: {
    // FilterToggle,
    FilterReset,
  },
  data() {
    return {
      sharedState: this.store.state,
    };
  },
  computed: {
    filterGroups() {
      return this.sharedState.filtering.filterGroups;
    },
  },
  methods: {
    activateFilter(filter) {
      this.store.activateFilter(filter);
    },
    filterRecords(table, field, value, filterName) {
      this.store.filterRecords(table, field, value, filterName);
    },
  },
};
</script>

<style lang="css"
scoped>
</style>
