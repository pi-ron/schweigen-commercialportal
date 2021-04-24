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
  (ActiveFilters, PrevFilters) => {
    // const deactivatedFilters = _.differenceWith(prevActive, newActiveFilters, _.isEqual);
    const { filterGroups } = state.filtering;
    const { activeFiltersCombined } = state.filtering;
    // console.log('deactivatedFilters:');
    // console.log(deactivatedFilters);
    // const filtersCombined = [];
    const currentFiltersMapped = _.map(ActiveFilters, _.partialRight(_.pick, ['field', 'value', 'active']));
    // console.log(mapped);
    currentFiltersMapped.forEach((filter) => {
      if (activeFiltersCombined[filter.field]
        && activeFiltersCombined[filter.field].length > 0
        && filter.active) {
        if (!activeFiltersCombined[filter.field].includes(filter.value)) {
          activeFiltersCombined[filter.field] += ' || ';
          activeFiltersCombined[filter.field] += filter.value;
        }
      } else if (filter.active) {
        activeFiltersCombined[filter.field] = filter.value;
      }
    });

    const prevFiltersMapped = _.map(PrevFilters, _.partialRight(_.pick, ['field', 'value', 'active']));
    const removedFilters = _.differenceWith(prevFiltersMapped, currentFiltersMapped, _.isEqual);
    // console.log(removedFilters);
    removedFilters.forEach((filter) => {
      if (activeFiltersCombined[filter.field].includes(`${filter.value} || `)) {
        activeFiltersCombined[filter.field] = activeFiltersCombined[filter.field].replace(`${filter.value} || `, '');
        // console.log('filter found WITH OR');
        if (activeFiltersCombined[filter.field] === '') {
          delete activeFiltersCombined[filter.field];
        }
      } else if (activeFiltersCombined[filter.field].includes(` || ${filter.value}`)) {
        activeFiltersCombined[filter.field] = activeFiltersCombined[filter.field].replace(` || ${filter.value}`, '');
        // console.log('filter found WITH OR');
        if (activeFiltersCombined[filter.field] === '') {
          delete activeFiltersCombined[filter.field];
        }
      } else if (activeFiltersCombined[filter.field].includes(filter.value)) {
        activeFiltersCombined[filter.field] = activeFiltersCombined[filter.field].replace(filter.value, '');
        // console.log('filter found without OR');
        if (activeFiltersCombined[filter.field] === '') {
          delete activeFiltersCombined[filter.field];
        }
      }
      // Find the removed item in the activeFiltersCombined array.
    });

    const activeGroups = [];
    filterGroups.forEach((item) => {
      if (item.active) {
        activeGroups.push(item);
      }
    });
    console.log(activeGroups);
    const widthGroup = activeGroups[0];
    const { records } = state.products.unfiltered;
    // let merged = [];
    // let filtered = [];
    // widthGroup.filterValues.forEach((filter) => {
    //   if (filter.active) {
    //     console.log(filter.value);
    //     filtered = _.filter(records, (r) => filters.range(filter.value, r.fields[filter.field]));
    //     merged = filters.mergeUnique(merged, filtered);
    //   }
    // });
    // merged = filters.applyFilterGroup(widthGroup, records);
    //
    // console.log(filters.applyFilterGroup(widthGroup, records));
    // console.log(merged);
    // function mergeUnique(a, b) {
    //   return a.concat(b.filter((v) => a.indexOf(v) === -1));
    // }
    // function applyFilterGroup(filterGroup, recs) {
    //   let filtered = [];
    //   let merged = [];
    //   filterGroup.filterValues.forEach((filter) => {
    //     if (filter.active) {
    //       console.log(filter.value);
    //       filtered = _.filter(recs, (r) => filters.range(filter.value, r.fields[filter.field]));
    //       merged = mergeUnique(merged, filtered);
    //       // return merged;
    //     }
    //     return 'No records';
    //   });
    //   console.log(merged);
    //   return merged;
    // }
    console.log(filters.applyFilterGroup(widthGroup, records));
    store.setFilteredRecords(filters.applyFilterGroup(widthGroup, records));
    // mapped.forEach((item) => {
    //   const fieldValuePair = {};
    //   if (fieldValuePair[item.field]) {
    //     fieldValuePair[item.field] = `${fieldValuePair[item.field]} | ${item.value}`;
    //   } else {
    //     fieldValuePair[item.field] = item.value;
    //   }
    //
    //   filtersCombined.push(fieldValuePair);
    //   filtersCombined.forEach((filter) => {
    //     const keys = Object.keys(filter);
    //     console.log(keys);
    //   });
    //
    //   // for (const key in keys) {
    //   //   if (key) {
    //   //     console.log(key, key === item.field);
    //   //   }
    //   // }
    // });
    // console.log('filtersCombined:');
    // console.log(filtersCombined);
  },
  { deep: true },
);
export default store;
