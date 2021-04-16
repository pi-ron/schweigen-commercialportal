import { reactive } from 'vue';
import axios from 'axios';

const airtableAxios = axios.create({
  baseURL: 'https://timdaff.api.stdlib.com/sd977-frontend-api@0.1.2/airtable/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const store = {
  debug: false,
  state: reactive({
    filterActive: false,
    activeFilterTable: null,
    activeFilterName: null,
    activeFilterValue: null,
    products: {
      message: 'No Products currently in state.',
      filtered: {
        records: [],
        counter: 0,
      },
      unfiltered: {
        records: [],
        counter: 0,
        offset: '',
      },
      loading: true,
      errored: false,
      error: '',
    },
    currentProduct: {},
    downloads: {
      filtered: {
        records: [],
        counter: 0,
      },
      unfiltered: {
        records: [],
        counter: 0,
        offset: '',
      },
      loading: true,
      errored: false,
      error: '',
      message: 'No Downloads currently in state.',
    },
  }),
  setCurrentProduct(product) {
    this.state.currentProduct = product;
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
  filterRecords(table, field, value, filterName) {
    let unfilteredItems = [];

    if (table === 'Catalogue') {
      unfilteredItems = this.state.products.unfiltered.records;
    }
    if (table === 'Downloads') {
      unfilteredItems = this.state.downloads.unfiltered.records;
    }

    const result = {};
    let item = '';
    let targetField = '';

    if (filterName === 'Width') {
      const range = value.split('-');
      const lowerRange = range[0];
      const upperRange = range[1];

      Object.keys(unfilteredItems).forEach((key) => {
        item = unfilteredItems[key];
        targetField = item.fields[field];

        if (targetField > lowerRange && targetField < upperRange) {
          result[key] = item;
          result[key].active = true;
        }
      });
    } else if (filterName !== 'Width') {
      Object.keys(unfilteredItems).forEach((key) => {
        item = unfilteredItems[key];
        targetField = '';
        if (Array.isArray(item.fields[field])) {
          targetField = item.fields[field][0].toLowerCase();
        } else if (item.fields[field]) {
          targetField = item.fields[field].toLowerCase();
        }
        if (targetField.includes(value.toLowerCase())) {
          result[key] = item;
          result[key].active = true;
        } else {
          // result[key] = item;
          // result[key].active = false;
        }
      });
    }
    if (table === 'Catalogue') {
      this.state.products.filtered.records = result;
      this.state.products.filtered.counter = Object.keys(result).length;
    }
    if (table === 'Downloads') {
      this.state.downloads.filtered.records = result;
      this.state.downloads.filtered.counter = Object.keys(result).length;
    }

    this.state.activeFilterTable = table;
    this.state.activeFilterName = filterName;
    this.state.activeFilterValue = value;
    this.state.filterActive = true;
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
          products.filtered.records = response.data.records;
          products.unfiltered.counter = response.data.count;
          products.filtered.counter = response.data.count;

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

export default store;
