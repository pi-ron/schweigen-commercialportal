<template>
  <div class="tableHeader">
    {{ text }}
  
    <div class="sortControls" v-if="sortable">
      <TableSorterIcon direction="asc" sortType="alphabetically"></TableSorterIcon>
      <TableSorterIcon direction="dsc" sortType="alphabetically"></TableSorterIcon>
    </div>
  </div>
</template>

<script>
import TableSorterIcon from './TableSorterIcon.vue'

export default {

  name: 'TableColHeader',
    components: {
      TableSorterIcon
    },
  props: {
    text: String,
    sortType: String,
    sortable: Boolean
  },
  data() {
    return {
      class: "button small secondary w-inline-block"
    };
  }
};
</script>

<style lang="css" scoped>
  .tableHeader {
    display:flex;
    justify-content:space-between;
  }
  .tableHeader.text-center {
    text-align:center;
    justify-content:center;
  }
  .sortControls {
    display:flex;
    flex-direction:column;
  }
</style>
