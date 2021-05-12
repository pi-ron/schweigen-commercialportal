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
        name: 'Category',
        field: 'primary-download-category',
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
          {
            display: 'DOC',
            value: 'DOC',
            active: false,
            filterGroup: 'file-type',
          },
          {
            display: 'XLSX',
            value: 'LSX',
            active: false,
            filterGroup: 'file-type',
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
      {
        name: 'Features',
        field: 'product-features-names',
        type: 'string',
        get active() {
          return this.filterValues.some((f) => f.active);
        },
        open: true,
        table: 'products',
        filterValues: [
          {
            display: 'Balanced Aspiration',
            value: 'Balanced Aspiration',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Classic design',
            value: 'Classic design',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Convenient features',
            value: 'Convenient features',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Discreet design',
            value: 'Discreet design',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Energy-efficient',
            value: 'Energy-efficient',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Eye-catching design',
            value: 'Eye-catching design',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Flexible & functional',
            value: 'Flexible & functional',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Free ducting included',
            value: 'Free ducting included',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'High-quality construction',
            value: 'High-quality construction',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'High-quality filters',
            value: 'High-quality filters',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Improves indoor air quality',
            value: 'Improves indoor air quality',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Innovative design',
            value: 'Innovative design',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Modern design',
            value: 'Modern design',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Modular design',
            value: 'Modular design',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Multi-purpose ventilation',
            value: 'Multi-purpose ventilation',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Perimeter Aspiration',
            value: 'Perimeter Aspiration',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Powerful extraction',
            value: 'Powerful extraction',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Powerful silent extraction',
            value: 'Powerful silent extraction',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Simple design',
            value: 'Simple design',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Sleek design',
            value: 'Sleek design',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Strong lighting',
            value: 'Strong lighting',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Unique design',
            value: 'Unique design',
            active: false,
            filterGroup: 'product-features-names',
          },
          {
            display: 'Warranties',
            value: 'Warranties',
            active: false,
            filterGroup: 'product-features-names',
          },
        ],
      },
      ],
  },
});

export default state;
