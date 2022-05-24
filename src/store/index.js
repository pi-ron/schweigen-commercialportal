import axios from 'axios';
import state from '@/store/state';
import _ from 'lodash';
import { watch } from 'vue';
import filters from '@/filters';
// import filters from '../filters';

const airtableAxios = axios.create({
  baseURL: 'https://timdaff.api.stdlib.com/sd977-frontend-api@1.0.0/airtable/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const store = {
  debug: false,
  state,
  paginateRecords() {

  },
  // Refactored this to use filtering system rather than standalone filter
  // filterByName(value) {
  //   const result = {};

  //   const items = this.state[this.state.activeRecordsName].unfiltered.records;

  //   if (this.state.activeRecordsName === 'products') {
  //     Object.keys(items).forEach((key) => {
  //       const item = items[key];
  //       const displayName = item.fields.name.toLowerCase();
  //       if (displayName.includes(value.toLowerCase())) {
  //         result[key] = item;
  //       }
  //     });
  //   } else {
  //     Object.keys(items).forEach((key) => {
  //       const item = items[key];
  //       const displayName = item.fields['display-name'].toLowerCase();
  //       if (displayName.includes(value.toLowerCase())) {
  //         result[key] = item;
  //       }
  //     });
  //   }

  //   const records = Object.values(result);
  //   // console.log(records);
  //   records.sort((a, b) => parseFloat(a.fields.order) - parseFloat(b.fields.order));
  //   this.state[this.state.activeRecordsName].filtered.records = records;
  // },
  setActiveRecordsName(recordsName) {
    this.state.activeRecordsName = recordsName;
  },
  setCurrentProduct(product) {
    this.state.currentProduct = product;
  },
  setDefaultRecords() {
    const unfiltered = this.state[this.state.activeRecordsName].unfiltered.records;
    unfiltered.sort((a, b) => parseFloat(a.fields.order) - parseFloat(b.fields.order));
    this.state[this.state.activeRecordsName].filtered.records = unfiltered;
  },
  setFilteredRecords(records) {
    records.sort((a, b) => parseFloat(a.fields.order) - parseFloat(b.fields.order));
    this.state[this.state.activeRecordsName].filtered.records = records;
  },
  activateNameFilter(field, value) {
    const { filterGroups } = this.state.filtering;
    const { activeFilters } = this.state.filtering;

    // Establish filter object
    function findFilterGroup(filter) {
      return filter.field === field;
    }

    const filterGroup = filterGroups.find(findFilterGroup);
    const filter = filterGroup.filterValues[0];
    filter.field = filterGroup.field;
    if (filter.active) {
      filter.value = value;
    } else {
      filter.value = value;
      filter.active = true;
      activeFilters.push(filter);
    }

    // console.log(value);
    if (value === '') {
      const index = activeFilters.indexOf(filter);
      if (index > -1) {
        activeFilters.splice(index, 1);
      }
      filter.active = false;
      filter.value = null;
    }
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
        // console.log(this.state.filtering.filterGroups[fgIndex].filterValues[fvIndex]);
      });
    });
  },
  getSingleRecord(table, id) {
    const { motors } = this.state;
    airtableAxios.get(`/getRecordByAirtableId?table=${table}&id=${id}`)
      .then((response) => {
        motors.records.push(response.data);

        if (this.debug) {
          console.log(`/getRecordByAirtableId?table=${table}&id=${id} response:`);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        motors.error = error;
        motors.errored = true;
      })
      .finally(() => {
        motors.loading = false;
      });
    this.state.motors.records = motors.records.sort((a, b) => parseFloat(a['motor-flowrate']) - parseFloat(b['motor-flowrate']));
  },
  getSingleProduct(id) {
    this.state.currentProductLoading = true;
    airtableAxios.get(`/getRecordByAirtableId?table=Catalogue&id=${id}`)
      .then((response) => {
        this.setCurrentProduct(response.data.fields);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.state.currentProductLoading = false;
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
          // downloads.filtered.records = response.data.records;
          downloads.unfiltered.counter = response.data.count;
          // downloads.filtered.counter = response.data.count;
          if (this.debug) {
            console.log(response.data.records);
            console.log('/getAllRecords?table=Downloads response:');
            // console.log(response.data);
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
      // console.log(downloads);
      airtableAxios.get(`/getAllRecords?table=${table}`)
        .then((response) => {
          downloads.unfiltered.records = response.data.records;
          downloads.filtered.records = response.data.records;
          downloads.unfiltered.counter = response.data.count;
          downloads.filtered.counter = response.data.count;

          if (this.debug) {
            console.log(`/getAllRecords?table=${table} response:`);
            // console.log(response.data);
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
          // downloads.loading = false;
          // console.log(downloads);
          downloads.loading = false;
        });
    }
  },
};
watch(
  () => _.cloneDeep(state.filtering.activeFilters),
  // (ActiveFilters, PrevFilters) => {
  (ActiveFilters) => {
    // const deactivatedFilters = _.differenceWith(prevActive, newActiveFilters, _.isEqual);
    const { filterGroups } = state.filtering;
    const { records } = state[state.activeRecordsName].unfiltered;
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
