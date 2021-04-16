<template>
  <a
    class="reset-filters-button"
    href="#"
    v-on:click="resetFilters()">
    <span class="filter-reset-icon-wrapper"><Close></Close></span> Clear Filter
  </a>
</template>

<script>
import { Close } from 'mdue';

export default {

  name: 'FilterReset',
  components: {
    Close,
  },
  props: {
    table: String,
  },
  data() {
    return {
      sharedState: this.store.state,
    };
  },
  methods: {
    resetFilters() {
      this.store.resetFilters(this.sharedState.activeFilterTable);
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-filters-button {
  background:#f9f9f9;
  color:#5e6875;
  text-decoration:none;
  font-size:0.75rem;
  display:flex;
  align-items:center;
  padding:2px 6px;
  position:absolute;
  top:1rem;
  right:0;

  .filter-reset-icon-wrapper {
    display:inline-block;
    font-size:0.9rem;
    line-height: 0.9rem;
  }

  &:hover {
    background:#f1f1f1;
    color:#111111;
  }
}
</style>
