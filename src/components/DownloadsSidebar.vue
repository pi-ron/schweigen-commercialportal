<template>
  <div class="filter-heading s-m-b-16">
    <div class="text-icon-wrapper">
      <div class="schweigen-commercial-icons icon-left l c-t-primary-70"></div>
      <div class="heading xs">Filters</div>
    </div>
  </div>
  <div class="filter-heading s-m-b-16">
    <span class="body-text s">
      Showing {{filteredRecordsCount}} of {{allRecordsCount}} products.</span>
  </div>
  <div class="filter-container">
    <div class="w-form">
        <div class="input-icon-wrapper">
          <input type="text" class="input small icon-right w-input"
          maxlength="256"
          v-on:input="updateNameFilter($event.target.value)"
          name="Filter-name"
          data-name="Filter-name"
          placeholder="Filter by name" id="Filter-name">
          <div class="material-icons icon-input-right"></div>
        </div>
      <div class="w-form-done">
        <div>Thank you! Your submission has been received!</div>
      </div>
      <div class="w-form-fail">
        <div>Oops! Something went wrong while submitting the form.</div>
      </div>
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
  <FilterReset v-if="sharedState.filtering.filterActive"></FilterReset>
</template>

<script>
// import FilterToggle from '@/components/atoms/FilterToggle.vue';
import FilterReset from '@/components/atoms/FilterReset.vue';

export default {

  name: 'DownloadsSidebar',
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
      const { filterGroups } = this.sharedState.filtering;
      return this.getTableFilters(filterGroups, this.recordsName);
    },
    allRecordsCount() {
      return this.sharedState[this.sharedState.activeRecordsName].unfiltered.records.length;
    },
    filteredRecordsCount() {
      return this.sharedState[this.sharedState.activeRecordsName].filtered.records.length;
    },
    showingAllRecords() {
      if (this.allRecordsCount > this.filteredRecordsCount) {
        return false;
      } return true;
    },
  },
  methods: {
    activateFilter(filter) {
      this.store.activateFilter(filter);
    },
    filterRecords(table, field, value, filterName) {
      this.store.filterRecords(table, field, value, filterName);
    },
    getTableFilters(filterGroups, table) {
      const result = [];
      filterGroups.forEach((filterGroup) => {
        if (filterGroup.table === table) {
          result.push(filterGroup);
        }
      });
      return result;
    },
    updateNameFilter(value) {
      this.store.filterByName(value);
    },
  },
};
</script>

<style lang="css"
scoped>
</style>
