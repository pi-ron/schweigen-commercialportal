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
      <div class="filters-trigger-text">Product Category</div>
    </div>
    <div class="filter-options filter-bar-category" style="display: block;">
        <FilterToggle
          table="Catalogue"
          field="product-category-name"
          value="Undermount"
          filterName="Product Category"
        ></FilterToggle>
        <FilterToggle
          table="Catalogue"
          field="product-category-name"
          value="Wallmount"
          filterName="Product Category"
        ></FilterToggle>
        <FilterToggle
          table="Catalogue"
          field="product-category-name"
          value="Ceiling Cassette"
          filterName="Product Category"
        ></FilterToggle>
        <FilterToggle
          table="Catalogue"
          field="product-category-name"
          value="BBQ Alfresco"
          filterName="Product Category"
        ></FilterToggle>
        <FilterToggle
          table="Catalogue"
          field="product-category-name"
          value="Island"
          filterName="Product Category"
        ></FilterToggle>
        <FilterToggle
          table="Catalogue"
          field="product-category-name"
          value="Silent Exhuast Fan"
          filterName="Product Category"
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
  </div>
  <div class="filter-container">
    <div class="filter-trigger">
      <img src="https://assets.website-files.com/6007b4af01b37638d431e8f4/601890cb6ba8ee0877501a94_Filter-Minus.svg"
      loading="lazy"
      alt=""
      class="icon-image mini filter-trigger-icon filter-open"
      style="display: block;">
      <div class="filters-trigger-text">Width</div>
    </div>
    <div class="filter-options filter-bar-category" style="display: block;">
        <FilterToggle
          table="Catalogue"
          field="dimensions-width"
          value="0-650"
          text="600mm & below"
          filterName="Width"
        ></FilterToggle>
        <FilterToggle
          table="Catalogue"
          field="dimensions-width"
          value="890-905"
          text="900mm"
          filterName="Width"
        ></FilterToggle>
        <FilterToggle
          table="Catalogue"
          field="dimensions-width"
          value="950-1250"
          text="1000-1200mm"
          filterName="Width"
        ></FilterToggle>
        <FilterToggle
          table="Catalogue"
          field="dimensions-width"
          value="1450-2050"
          text="1500-2000mm"
          filterName="Width"
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
    <FilterReset v-if="sharedState.filterActive"></FilterReset>
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
