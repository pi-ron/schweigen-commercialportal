import axios from 'axios';
import state from '@/store/state';
import _ from 'lodash';
import { watch } from 'vue';
import filters from '@/filters';
// import filters from '../filters';

const airtableAxios = axios.create({
  baseURL: 'https://timdaff.api.stdlib.com/sd977-frontend-api@0.1.2/airtable/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const store = {
  debug: false,
  state,
  setCurrentProduct(product) {
    this.state.currentProduct = product;
  },
  setDefaultRecords() {
    this.state.products.filtered.records = this.state.products.unfiltered.records;
  },
  setFilteredRecords(records) {
    this.state.products.filtered.records = records;
  },
  activateFilter(filter) {
    const { activeFilters } = this.state.filtering;
    const { filterGroups } = this.state.filtering;

    const filterGroupIndex = filterGroups.findIndex((x) => x.field === filter.filterGroup);
    const filterGroup = filterGroups[filterGroupIndex];
    const filterIndex = filterGroup.filterValues.findIndex((x) => x.value === filter.value);
    const filterChanging = filterGroup.filterValues[filterIndex];
    filterChanging.field = filterGroup.field;
    if (!filter.active) {
      activeFilters.push(filterChanging);
      filterChanging.active = true;
      // console.log(filterChanging.active);
    } else {
      const index = activeFilters.indexOf(filterChanging);
      if (index > -1) {
        activeFilters.splice(index, 1);
      }
      filterChanging.active = false;
      // console.log(filterChanging.active);
    }
    // console.log(this.state.filtering.activeFilters);
  },
  resetFilters(table) {
    if (table === 'Catalogue') {
      this.state.products.filtered.records = this.state.products.unfiltered.records;
      this.state.products.filtered.counter = 0;
    }
    if (table === 'Downloads') {
      this.state.downloads.filtered.records = this.state.downloads.unfiltered.records;
      this.state.downloads.filtered.counter = 0;
    }
    this.state.activeFilterName = null;
    this.state.activeFilterValue = null;
    this.state.filterActive = false;
  },
  filterRecords() {
    const unfilteredItems = this.state.products.unfiltered;
    const filteredItems = _.filter(
      unfilteredItems,
      _.matches(this.state.filtering.activeFiltersCombined),
    );
    console.log(filteredItems);
    this.state.products.filtered.records = filteredItems;
  },
  getRecords(table) {
    if (table === 'Catalogue') {
      if (this.debug) {
        console.log(`src/store/index.js method getRecords(${table}) fired.`);
      }
      const { products, downloads } = this.state;

      airtableAxios.get(`/getAllRecords?table=${table}`)
        .then((response) => {
          products.unfiltered.records = response.data.records;
          products.unfiltered.counter = response.data.count;

          if (this.debug) {
            console.log(`/getAllRecords?table=${table} response:`);
            console.log(response.data);
          }
          if (response.offset) {
            products.unfiltered.offset = response.offset;
          } else { products.unfiltered.offset = null; }
        })
        .catch((error) => {
          console.log(error);
          products.error = error;
          products.errored = true;
        })
        .finally(() => {
          products.loading = false;
          products.message = `${products.unfiltered.counter} Products in state.`;
          this.setDefaultRecords();
        });

      // We want to also get Downloads in the Products view
      airtableAxios.get('/getAllRecords?table=Downloads')
        .then((response) => {
          downloads.unfiltered.records = response.data.records;
          downloads.filtered.records = response.data.records;
          downloads.unfiltered.counter = response.data.count;
          downloads.filtered.counter = response.data.count;

          if (this.debug) {
            console.log('/getAllRecords?table=Downloads response:');
            console.log(response.data);
          }
          if (response.offset) {
            downloads.unfiltered.offset = response.offset;
          } else { downloads.unfiltered.offset = null; }
        })
        .catch((error) => {
          console.log(error);
          downloads.error = error;
          downloads.errored = true;
        })
        .finally(() => {
          downloads.loading = false;
          downloads.message = `${downloads.unfiltered.counter} Download in state.`;
        });
    }

    if (table === 'Downloads') {
      if (this.debug) {
        console.log(`src/store/index.js method getRecords(${table}) fired.`);
      }

      const { downloads } = this.state;
      airtableAxios.get(`/getAllRecords?table=${table}`)
        .then((response) => {
          downloads.unfiltered.records = response.data.records;
          downloads.filtered.records = response.data.records;
          downloads.unfiltered.counter = response.data.count;
          downloads.filtered.counter = response.data.count;

          if (this.debug) {
            console.log(`/getAllRecords?table=${table} response:`);
            console.log(response.data);
          }
          if (response.offset) {
            downloads.unfiltered.offset = response.offset;
          } else { downloads.unfiltered.offset = null; }
        })
        .catch((error) => {
          console.log(error);
          downloads.error = error;
          downloads.errored = true;
        })
        .finally(() => { downloads.loading = false; });
    }
  },
};
watch(
  () => _.cloneDeep(state.filtering.activeFilters),
  // (ActiveFilters, PrevFilters) => {
  (ActiveFilters) => {
    // const deactivatedFilters = _.differenceWith(prevActive, newActiveFilters, _.isEqual);
    const { filterGroups } = state.filtering;
    const { records } = state.products.unfiltered;
    // const activeGroups = [];
    let filteredRecords = [];
    filterGroups.forEach((item) => {
      if (item.active) {
        // activeGroups.push(item);
        // console.log(item);
        filteredRecords = filters.applyFilterGroup(item, records);
      }
    });
    store.setFilteredRecords(filteredRecords);
    if (ActiveFilters.length === 0) {
      store.setFilteredRecords(records);
    }
    // console.log(activeGroups);
    // const widthGroup = activeGroups[0];
    // console.log(filters.applyFilterGroup(widthGroup, records));
    //
    // Previous attempt below.
    //
    // const { activeFiltersCombined } = state.filtering;
    // console.log('deactivatedFilters:');
    // console.log(deactivatedFilters);
    // const filtersCombined = [];
    // const currentFiltersMapped
    // = _.map(ActiveFilters, _.partialRight(_.pick, ['field', 'value', 'active']));
    // console.log(mapped);
    // currentFiltersMapped.forEach((filter) => {
    //   if (activeFiltersCombined[filter.field]
    //     && activeFiltersCombined[filter.field].length > 0
    //     && filter.active) {
    //     if (!activeFiltersCombined[filter.field].includes(filter.value)) {
    //       activeFiltersCombined[filter.field] += ' || ';
    //       activeFiltersCombined[filter.field] += filter.value;
    //     }
    //   } else if (filter.active) {
    //     activeFiltersCombined[filter.field] = filter.value;
    //   }
    // });

    // const prevFiltersMapped
    // = _.map(PrevFilters, _.partialRight(_.pick, ['field', 'value', 'active']));
    // const removedFilters = _.differenceWith(prevFiltersMapped, currentFiltersMapped, _.isEqual);
    // console.log(removedFilters);
    // removedFilters.forEach((filter) => {
    //   if (activeFiltersCombined[filter.field].includes(`${filter.value} || `)) {
    //     activeFiltersCombined[filter.field] =
    //     activeFiltersCombined[filter.field].replace(`${filter.value} || `, '');
    // console.log('filter found WITH OR');
    //   if (activeFiltersCombined[filter.field] === '') {
    //     delete activeFiltersCombined[filter.field];
    //   }
    // } else if (activeFiltersCombined[filter.field].includes(` || ${filter.value}`)) {
    //   activeFiltersCombined[filter.field]
    //   = activeFiltersCombined[filter.field].replace(` || ${filter.value}`, '');
    // console.log('filter found WITH OR');
    //   if (activeFiltersCombined[filter.field] === '') {
    //     delete activeFiltersCombined[filter.field];
    //   }
    // } else if (activeFiltersCombined[filter.field].includes(filter.value)) {
    //   activeFiltersCombined[filter.field]
    //   = activeFiltersCombined[filter.field].replace(filter.value, '');
    // console.log('filter found without OR');
    // if (activeFiltersCombined[filter.field] === '') {
    //   delete activeFiltersCombined[filter.field];
    // }
    // }
    // Find the removed item in the activeFiltersCombined array.
    // });
  },
  { deep: true },
);
export default store;
