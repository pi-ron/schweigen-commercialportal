import { reactive } from 'vue';
// import _ from 'lodash';
// import filters from '../filters';

const state = reactive({
  products: {
    message: 'No Products currently in state.',
    filtered: {
      records: [],
      // records: [],
      // counter: 0,
      get counter() {
        return this.records.length;
      },
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
  filtering: {
    get filterActive() {
      if (this.activeFilters.length > 0) {
        return true;
      } return false;
    },
    activeFilters: [],
    filterGroups:
      [{
        name: 'Width',
        field: 'dimensions-width',
        type: 'range',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'products',
        filterValues: [
          {
            display: '600mm & below',
            value: '0-650',
            active: false,
            filterGroup: 'dimensions-width',
          },
          {
            display: '900mm',
            value: '850-950',
            active: false,
            filterGroup: 'dimensions-width',
          },
          {
            display: '1000-1200mm',
            value: '990-1250',
            active: false,
            filterGroup: 'dimensions-width',
          },
          {
            display: '1500-2000mm',
            value: '1450-2050',
            active: false,
            filterGroup: 'dimensions-width',
          },
        ],
      },
      {
        name: 'Width',
        field: 'dimensions-width',
        type: 'range',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'downloads',
        filterValues: [
          {
            display: '600mm & below',
            value: '0-650',
            active: false,
            filterGroup: 'dimensions-width',
          },
          {
            display: '900mm',
            value: '850-950',
            active: false,
            filterGroup: 'dimensions-width',
          },
          {
            display: '1000-1200mm',
            value: '990-1250',
            active: false,
            filterGroup: 'dimensions-width',
          },
          {
            display: '1500-2000mm',
            value: '1450-2050',
            active: false,
            filterGroup: 'dimensions-width',
          },
        ],
      },
      {
        name: 'Brand',
        field: 'brand-name',
        type: 'string',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'products',
        filterValues: [
          {
            display: 'Schweigen Classic',
            value: 'Schweigen Classic',
            active: false,
            filterGroup: 'brand-name',
          },
          {
            display: 'Schweigen IN.',
            value: 'Schweigen IN.',
            active: false,
            filterGroup: 'brand-name',
          },
          {
            display: 'Schweigen X',
            value: 'Schweigen X',
            active: false,
            filterGroup: 'brand-name',
          },
        ],
      },
      {
        name: 'Category',
        field: 'product-category-name',
        type: 'string',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'products',
        filterValues: [
          {
            display: 'Undermount',
            value: 'Undermount',
            active: false,
            filterGroup: 'product-category-name',
          },
          {
            display: 'Wallmount',
            value: 'Wallmount',
            active: false,
            filterGroup: 'product-category-name',
          },
          {
            display: 'Ceiling Cassette',
            value: 'Ceiling Cassette',
            active: false,
            filterGroup: 'product-category-name',
          },
          {
            display: 'Island',
            value: 'Island',
            active: false,
            filterGroup: 'product-category-name',
          },
          {
            filterGroup: 'product-category-name',
            display: 'BBQ Alfresco',
            value: 'BBQ Alfresco',
            active: false,
          },
        ],
      },
      {
        name: 'Type',
        field: 'product-type',
        type: 'string',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'products',
        filterValues: [
          {
            display: 'Silent Rangehood',
            value: 'Silent Rangehood',
            active: false,
            filterGroup: 'product-type',
          },
          {
            display: 'Onboard Rangehood',
            value: 'Onboard Rangehood',
            active: false,
            filterGroup: 'product-type',
          },
        ],
      },
      {
        name: 'Features',
        field: 'features',
        type: 'string',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'products',
        filterValues: [
          {
            display: 'Todo: Add Features Filter',
            value: 'Stainless Steel',
            active: false,
            filterGroup: 'features',
          },
        ],
      },
      {
        name: 'Finish',
        field: 'finish',
        type: 'string',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'products',
        filterValues: [
          {
            display: 'Stainless Steel',
            value: 'Stainless Steel',
            active: false,
            filterGroup: 'finish',
          },
          {
            display: 'Black',
            value: 'Black',
            active: false,
            filterGroup: 'finish',
          },
          {
            display: 'White',
            value: 'White',
            active: false,
            filterGroup: 'finish',
          },
        ],
      },
      ],
  },
});

export default state;
