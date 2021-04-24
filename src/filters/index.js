// import _ from 'lodash';

import _ from 'lodash';

export default {
  // Returns an object {count:Integer,items:filterItems[]}
  filterItems(table, type, field, filter, unfilteredItems, filteredItems) {
    const result = {};

    console.log(this[type](filter.value, '900'));
    console.log(filteredItems.length);

    // unfilteredItems.forEach((item) => {
    //   if (this[type](filter.value, item.fields[field])) {
    //     const index = filteredItems.indexOf(item);
    //     if (index > -1) {
    //       filteredItems.splice(index, 1);
    //     }
    //   }
    // });

    let item = '';
    Object.keys(unfilteredItems).forEach((key) => {
      item = unfilteredItems[key];
      if (this[type](filter.value, item.fields[field])) {
        // console.log(item);
        result[key] = item;
      }
    });
    // console.log(filteredItems.length);
    // if (filterType === 'Range') {
    //   Object.keys(data).forEach((key) => {
    //     if (this.range(filterValue, data[key].fields[field])) {
    //       result[key] = data[key];
    //       result[key].active = true;
    //     }
    //   });
    // } else if (filterType === 'String') {
    //   Object.keys(data).forEach((key) => {
    //     if (this.string(filterValue, data[key].fields[field])) {
    //       result[key] = data[key];
    //       result[key].active = true;
    //     }
    //   });
    // }
    console.log(type);
    console.log(filter);
    console.log(result);
    return result;
  },
  // Returns true if match when provided single field value and filter value.
  range(range, data) {
    const rangeValues = range.split('-');
    const lowerRange = rangeValues[0];
    const upperRange = rangeValues[1];

    if (data > lowerRange && data < upperRange) {
      return true;
    }

    return false;
  },
  // Returns true if match when provided single field value and filter value.
  string(value, data) { // Returns true if match
    const isArray = Array.isArray(value);
    let targetField = '';

    if (isArray) {
      targetField = data[0].toLowerCase();
    } else {
      console.log(isArray);
      console.log(data);
      targetField = data.toLowerCase();
    }

    return targetField.includes(value.toLowerCase());
  },
  mergeUnique(a, b) {
    return a.concat(b.filter((v) => a.indexOf(v) === -1));
  },
  applyFilterGroup(filterGroup, recs) {
    let filtered = [];
    let merged = [];
    filterGroup.filterValues.forEach((filter) => {
      if (filter.active) {
        console.log(filter.value);
        filtered = _.filter(recs, (r) => this.range(filter.value, r.fields[filter.field]));
        merged = this.mergeUnique(merged, filtered);
        // return merged;
      }
      return 'No records';
    });
    return merged;
  },
};
