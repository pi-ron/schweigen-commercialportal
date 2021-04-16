<template>
  <div class="filter-heading s-m-b-32">
    <div class="text-icon-wrapper">
      <div class="schweigen-commercial-icons icon-left l c-t-primary-70"></div>
      <div class="heading xs">Filters</div>
    </div>
  </div>
  <div class="filter-container">
    <div class="filter-trigger">
      <img src="https://assets.website-files.com/6007b4af01b37638d431e8f4/601890cb6ba8ee0877501a94_Filter-Minus.svg"
      loading="lazy"
      alt=""
      class="icon-image mini filter-trigger-icon filter-open"
      style="display: block;">
      <div class="filters-trigger-text">Type</div>
    </div>
    <div class="filter-options filter-bar-category" style="display: block;">
        <FilterToggle
          table="Catalogue"
          field="product-type"
          value="Silent Rangehood"
          filterName="Product Type"
        ></FilterToggle>
        <FilterToggle
          table="Catalogue"
          field="product-type"
          value="Onboard Rangehood"
          filterName="Product Type"
        ></FilterToggle>
    </div>
  </div>
  <div class="filter-container">
    <div class="filter-trigger">
      <img src="https://assets.website-files.com/6007b4af01b37638d431e8f4/601890cb6ba8ee0877501a94_Filter-Minus.svg"
      loading="lazy"
      alt=""
      class="icon-image mini filter-trigger-icon filter-open"
      style="display: block;">
      <div class="filters-trigger-text">Brand</div>
    </div>
    <div class="filter-options filter-bar-category" style="display: block;">
        <FilterToggle
          table="Catalogue"
          field="brand-name"
          value="Schweigen Classic"
          filterName="Brand"
        ></FilterToggle>
        <FilterToggle
          table="Catalogue"
          field="brand-name"
          value="Schweigen X"
          filterName="Brand"
        ></FilterToggle>
        <FilterToggle
          table="Catalogue"
          field="brand-name"
          value="Schweigen IN."
          filterName="Brand"
        ></FilterToggle>
    </div>
    <FilterReset v-if="sharedState.filterActive"></FilterReset>
  </div>
  <div class="filter-container">
    <div class="filter-trigger">
      <img src="https://assets.website-files.com/6007b4af01b37638d431e8f4/601890cb6ba8ee0877501a94_Filter-Minus.svg"
      loading="lazy"
      alt=""
      class="icon-image mini filter-trigger-icon filter-open"
      style="display: block;">
      <div class="filters-trigger-text">Finish</div>
    </div>
    <div class="filter-options filter-bar-category" style="display: block;">
        <FilterToggle
          table="Catalogue"
          field="finish"
          value="Stainless Steel"
          filterName="Finish"
        ></FilterToggle>
        <FilterToggle
          table="Catalogue"
          field="finish"
          value="Black"
          filterName="Finish"
        ></FilterToggle>
        <FilterToggle
          table="Catalogue"
          field="finish"
          value="White"
          filterName="Finish"
        ></FilterToggle>
    </div>
  </div>
</template>

<script>
import FilterToggle from '@/components/atoms/FilterToggle.vue';
import FilterReset from '@/components/atoms/FilterReset.vue';

export default {

  name: 'Sidebar',
  components: {
    FilterToggle,
    FilterReset,
  },
  data() {
    return {
      sharedState: this.store.state,
    };
  },
  methods: {
    filterRecords(table, field, value, filterName) {
      this.store.filterRecords(table, field, value, filterName);
    },
  },
};
</script>

<style lang="css"
scoped>
</style>
