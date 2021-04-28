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
  resetFilters() {
    const { filterGroups } = this.state.filtering;
    this.state.filtering.activeFilters = [];

    filterGroups.forEach((filterGroup, fgIndex) => {
      filterGroup.filterValues.forEach((filterValue, fvIndex) => {
        this.state.filtering.filterGroups[fgIndex].filterValues[fvIndex].active = false;
        console.log(this.state.filtering.filterGroups[fgIndex].filterValues[fvIndex]);
      });
    });
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
    const result = [];
    let i = 0;
    filterGroups.forEach((item) => {
      if (item.active) {
        if (!result.length > 0) {
          result[i] = filters.applyFilterGroup(item, records);
        } else {
          result[i] = filters.applyFilterGroup(item, result[(i - 1)]);
        }

        filteredRecords = result[result.length - 1];
        i += 1;
      } else {
        // filterGroups[index].records = [];
        delete result[i];
      }
    });
    state.records = result;
    // console.log(filteredRecords);
    store.setFilteredRecords(filteredRecords);
    if (ActiveFilters.length === 0) {
      store.setFilteredRecords(records);
    }
  },
  { deep: true },
);
export default store;
