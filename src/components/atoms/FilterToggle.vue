<template>
  <a
    class="filter-option filter-button w-inline-block"
    v-bind:class="{ 'filter-active': filterActive }"
    href="#"
    v-on:click="filterRecords(
    table,
    field,
    value,
    filterName,
    filterType
    )">
    <template v-if="!text">{{ value }}</template>
    <template v-if="text">{{ text }}</template>
  </a>
</template>

<script>
export default {

  name: 'FilterToggle',
  props: {
    table: String,
    field: String,
    value: String,
    filterName: String,
    filterType: String,
    text: String,
  },
  data() {
    return {
      sharedState: this.store.state,
    };
  },
  computed: {
    filterActive() {
      const { activeFilterName } = this.sharedState;
      const { activeFilterValue } = this.sharedState;

      if (this.filterName === activeFilterName && this.value === activeFilterValue) {
        return true;
      }
      return false;
    },
  },
  methods: {
    filterRecords(table, field, value, filterName, filterType) {
      if (this.filterActive) {
        this.store.resetFilters(table);
      } else {
        this.store.filterRecords(table, field, value, filterName, filterType);
      }
    },
  },
};
</script>

<style lang="css" scoped>
</style>
