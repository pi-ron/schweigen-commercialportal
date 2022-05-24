import { reactive } from 'vue';
// import _ from 'lodash';
// import filters from '../filters';

const state = reactive({
  motors: {
    records: [],
    loading: true,
  },
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
  currentProductLoading: false,
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
        name: 'Features - Perimeter Aspiration',
        field: 'perimeter-aspiration',
        groupType: 'multiField',
        multiFieldFieldGroupName: 'Features',
        multiFieldFieldGroupSlug: 'features',
        type: 'switch',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'products',
        filterValues: [
          {
            display: 'Perimeter Aspiration',
            value: 'true',
            active: false,
            filterGroup: 'perimeter-aspiration',
          },
        ],
      },
      {
        name: 'Features - Balanced Aspiration',
        field: 'balanced-aspiration',
        groupType: 'multiField',
        multiFieldFieldGroupName: 'Features',
        multiFieldFieldGroupSlug: 'features',
        type: 'switch',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'products',
        filterValues: [
          {
            display: 'Balanced Aspiration',
            value: 'true',
            active: false,
            filterGroup: 'balanced-aspiration',
          },
        ],
      },
      {
        name: 'Features - Variable Speed Levels',
        field: 'variable-speed-levels',
        groupType: 'multiField',
        multiFieldFieldGroupName: 'Features',
        multiFieldFieldGroupSlug: 'features',
        type: 'switch',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'products',
        filterValues: [
          {
            display: 'Variable Speed Levels',
            value: 'true',
            active: false,
            filterGroup: 'variable-speed-levels',
          },
        ],
      },
      {
        name: 'Features - Remote Control',
        field: 'remote-control',
        groupType: 'multiField',
        multiFieldFieldGroupName: 'Features',
        multiFieldFieldGroupSlug: 'features',
        type: 'switch',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'products',
        filterValues: [
          {
            display: 'Remote Control',
            value: 'true',
            active: false,
            filterGroup: 'remote-control',
          },
        ],
      },
      {
        name: 'Features - Integrated Lighting',
        field: 'led-lights',
        groupType: 'multiField',
        multiFieldFieldGroupName: 'Features',
        multiFieldFieldGroupSlug: 'features',
        type: 'switch',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'products',
        filterValues: [
          {
            display: 'Integrated Lighting',
            value: 'true',
            active: false,
            filterGroup: 'led-lights',
          },
        ],
      },
      {
        name: 'Width',
        field: 'dimensions-width',
        groupType: 'singleField',
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
        name: 'Brand',
        field: 'brand-name',
        groupType: 'singleField',
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
          // {
          //   display: 'Schweigen X',
          //   value: 'Schweigen X',
          //   active: false,
          //   filterGroup: 'brand-name',
          // },
        ],
      },
      {
        name: 'Category',
        field: 'product-category-name',
        groupType: 'singleField',
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
        name: 'Category',
        field: 'primary-download-category',
        groupType: 'singleField',
        type: 'string',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'downloads',
        filterValues: [
          {
            display: 'Undermount',
            value: 'Undermount Rangehoods',
            active: false,
            filterGroup: 'primary-download-category',
          },
          {
            display: 'Wallmount',
            value: 'Wallmount',
            active: false,
            filterGroup: 'primary-download-category',
          },
          {
            display: 'Ceiling Cassette',
            value: 'Ceiling Cassette',
            active: false,
            filterGroup: 'primary-download-category',
          },
          {
            display: 'Island',
            value: 'Island',
            active: false,
            filterGroup: 'primary-download-category',
          },
          {
            filterGroup: 'primary-download-category',
            display: 'BBQ Alfresco',
            value: 'BBQ Alfresco',
            active: false,
          },
          {
            filterGroup: 'primary-download-category',
            display: 'Silent Exhaust Fan',
            value: 'Silent Exhaust Fan',
            active: false,
          },
          {
            filterGroup: 'primary-download-category',
            display: 'Silent Isodrive Motors',
            value: 'Motor',
            active: false,
          },
          {
            filterGroup: 'primary-download-category',
            display: 'Brochures',
            value: 'Brochures',
            active: false,
          },
        ],
      },
      {
        name: 'Name',
        field: 'display-name',
        groupType: 'standalone',
        type: 'string',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'downloads',
        filterValues: [
          {
            filterGroup: 'display-name',
            display: null,
            value: null,
            active: false,
          },
        ],
      },
      {
        name: 'Name',
        field: 'name',
        groupType: 'standalone',
        type: 'string',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'products',
        filterValues: [
          {
            filterGroup: 'name',
            display: null,
            value: null,
            active: false,
          },
        ],
      },
      {
        name: 'Type',
        field: 'product-type',
        groupType: 'singleField',
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
          {
            filterGroup: 'product-type',
            display: 'Silent Exhaust Fan',
            value: 'Silent Exhaust Fan',
            active: false,
          },
        ],
      },
      {
        name: 'File Type',
        field: 'file-type',
        groupType: 'singleField',
        type: 'string',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'downloads',
        filterValues: [
          {
            display: 'DWG',
            value: 'DWG',
            active: false,
            filterGroup: 'file-type',
          },
          {
            display: 'STP',
            value: 'STP',
            active: false,
            filterGroup: 'file-type',
          },
          {
            display: 'PDF',
            value: 'PDF',
            active: false,
            filterGroup: 'file-type',
          },
        ],
      },
      {
        name: 'Finish',
        field: 'finish',
        groupType: 'singleField',
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
