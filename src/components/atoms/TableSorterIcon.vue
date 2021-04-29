<template>
      <chevron-up-circle-outline @click="updateSort(direction)" v-if="direction == 'asc' && active == false"></chevron-up-circle-outline>
      <chevron-down-circle-outline @click="updateSort(direction)" v-if="direction == 'dsc' && active == false"></chevron-down-circle-outline>
      <chevron-up-circle @click="updateSort(direction)" v-if="direction == 'asc' && active == true" class="icon-active"></chevron-up-circle>
      <chevron-down-circle @click="updateSort(direction)" v-if="direction == 'dsc' && active == true" class="icon-active"></chevron-down-circle>
</template>

<script>
  import { ChevronUpCircleOutline, ChevronDownCircleOutline, ChevronUpCircle, ChevronDownCircle } from 'mdue';

export default {

  name: 'TableSorterIcon',
    components: {
      ChevronUpCircleOutline, ChevronDownCircleOutline, ChevronUpCircle, ChevronDownCircle //Icons
    },
    methods: {
      updateSort(direction) {
        this.emitter.emit("sort", this.sortType + " " + direction);
      }
    },
  props: {
    direction: {
      validator: function (value) {
        // The value must match one of these strings
        return ['asc', 'dsc'].indexOf(value) !== -1
      }
    },
    sortType: {
      validator: function (value) {
        // The value must match one of these strings
        return ['alphabetically', 'number'].indexOf(value) !== -1
      }
    },
  },
  data() { return {
      activeSort: null
    }
  },
  computed: {
    // a computed getter
    active() {
      // `this` points to the vm instance
 
      if (this.activeSort == null) { return false }
        else if (this.activeSort != null && this.activeSort.includes(this.direction)) {
          return true
        }
      return false
    }
  },
  mounted() { 
    this.emitter.on("sort", activeSort => {
      this.activeSort = activeSort;
    });
  }  
};
</script>

<style lang="css" scoped>
.icon-active {
  color:#db0962;
}
</style>
