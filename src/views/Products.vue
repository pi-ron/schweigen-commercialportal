<template>
  <div class="hero-section">
    <div class="container">
      <div class="wrapper-s">
        <div class="w-layout-grid feature-grid-3">
          <div>
            <div class="tag-01">
              <div class="line tag-03"></div>
              <div class="tagline s-m-b-0">Commercial Portal</div>
            </div>
            <h1 class="heading xl">Products</h1>
            <div class="breadcrumbs">
              <a href="\" class="breadcrumbs-link">Home</a>
              <img src="https://assets.website-files.com/6007b4af01b37638d431e8f4/60178790556ad849c6eb2b2d_Chevron%20Right%20Light.png" alt="">
              <div class="breadcrumbs-link current">Products</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="hero-section">
    <div class="container">
      <div class="w-layout-grid grid-long-content-2 s-x-48">
        <aside class="sl-sidebar">
          <div class="sl-sidebar-sticky">
            <ProductsSidebar></ProductsSidebar>
          </div>
        </aside>
        <div class="page-content product-categories">
<!--          {{ activeFilters }}-->
          <tableLoading v-if="loading"></tableLoading>
          <div v-if="nilResults">
            <div class="nilResultsMessage">
              <div class="s-x-48">
                <h3 class="heading Xs">Sorry, no matching results were found.</h3>
                <p class="heading xxs">Search Suggestions:</p>
                <p>Unselect a filter or two to see if that helps
                </p>
                <p>
                  <button class="button primary small" v-on:click="resetFilters()">
                    <template v-if="!resettingFilters">Reset all filters and start over</template>
                    <template v-if="resettingFilters">Resetting...</template>
                  </button>
                </p>
              </div>
            </div>
            <h2 class="heading m">Or maybe we can help, see top searches below:</h2>
            <div class="nilResultsWrapper" v-if="!loading">
              <h2 class="heading s ct-primary">Australia's number one selling silent rangehoods</h2>
              <hr >
              <div role="list" class="nilResultsList teaser-grid large products-list w-dyn-items">
                <ProductListItem
                v-for="product in topRangehoods"
                role="listitem"
                :key="product"
                :record="product.fields"
                v-bind:showDownloads="false"
                v-bind:name="product.fields['display-name']"
                v-bind:model="product.fields.name"
                v-bind:finish="product.fields.finish"
                v-bind:category="product.fields['product-category-name']"
                v-bind:image="product.fields['deep-etched-product-image']"
                v-bind:record_id="product.id"
                >
                </ProductListItem>
              </div>
              <h2 class="heading s primary">Good Design Award winners</h2>
              <hr >
              <div role="list" class="nilResultsList teaser-grid large products-list w-dyn-items">
                <ProductListItem
                v-for="product in goodDesignAwardWinners"
                role="listitem"
                :key="product"
                :record="product.fields"
                v-bind:showDownloads="false"
                v-bind:name="product.fields['display-name']"
                v-bind:model="product.fields.name"
                v-bind:finish="product.fields.finish"
                v-bind:category="product.fields['product-category-name']"
                v-bind:image="product.fields['deep-etched-product-image']"
                v-bind:record_id="product.id"
                >
                </ProductListItem>
              </div>
            </div>
            <div v-for="download in consumerBrochure" :key="download">
              <h2 class="heading s ct-primary">Consumer Products Brochure.</h2>
              <hr >
              <a class="product-list-item-download"
              :href="download.fields['computed-download-url']">
                {{ download.fields['display-name'] }}</a>
            </div>
          </div>
          <div class="w-dyn-list" v-if="!loading">
            <div role="list" class="teaser-grid large products-list w-dyn-items">

                <ProductListItem
                  v-for="product in products"
                  role="listitem"
                  :key="product"
                  :record="product.fields"
                  :showDownloads="true"
                  v-bind:name="product.fields['display-name']"
                  v-bind:model="product.fields.name"
                  v-bind:finish="product.fields.finish"
                  v-bind:category="product.fields['product-category-name']"
                  v-bind:image="product.fields['deep-etched-product-image']"
                  v-bind:record_id="product.id"
                  >
                </ProductListItem>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
// @ is an alias to /src
import tableLoading from '@/components/atoms/tableLoading.vue';
import ProductListItem from '@/components/ProductListItem.vue';
import ProductsSidebar from '@/components/ProductsSidebar.vue';

export default {
  name: 'Products',
  components: {
    tableLoading,
    ProductListItem,
    ProductsSidebar,
  },
  data() {
    return {
      sharedState: this.store.state,
      activeFilters: this.store.state.filtering.activeFilters,
      resettingFilters: false,
    };
  },
  computed: {
    nilResults() {
      const { counter } = this.sharedState.products.filtered;
      const { loading } = this;

      if (counter === 0 && !loading) {
        return true;
      }

      return false;
    },
    loading() { return this.sharedState.products.loading; },
    products() {
      const { records } = this.sharedState.products.filtered;
      return records;
    },
    consumerBrochure() {
      if (this.nilResults) {
        const { records } = this.sharedState.downloads.unfiltered;

        const result = [];
        records.forEach((record) => {
          if (record.fields['display-name'] === 'Schweigen Consumer Brochure') {
            result.push(record);
          }
        });
        return result;
      }
      return null;
    },
    topRangehoods() {
      if (this.nilResults) {
        const { records } = this.sharedState.products.unfiltered;

        const result = [];
        records.forEach((record) => {
          if (record.fields.name === 'UM1170-6S' || record.fields.name === 'UM1170-9S') {
            result.push(record);
          }
        });
        return result;
      }
      return null;
    },
    goodDesignAwardWinners() {
      if (this.nilResults) {
        const { records } = this.sharedState.products.unfiltered;

        const result = [];
        records.forEach((record) => {
          if (record.fields.name === 'CC-PARA2S'
          || record.fields.name === 'CC-PARA2W'
          || record.fields.name === 'CC-PARA3S'
          || record.fields.name === 'CC-PARA3W'
          || record.fields.name === 'CC-PARA4S'
          || record.fields.name === 'CC-PARA4W') {
            result.push(record);
          }
        });
        return result;
      }
      return null;
    },
  },
  mounted() {
    // this.store.state.products.filtered.records = this.store.state.products.unfiltered.records;
    // this.store.setDefaultRecords();
  },
  methods: {
    resetFilters() {
      this.resettingFilters = true;
      this.store.resetFilters(this.sharedState.activeFilterTable);
      this.resettingFilters = false;
    },
    // updateNameFilter(value) {
    //   this.store.filterByName(value);
    // },
  },
};
</script>

<style lang="scss">
.nilResultsMessage {
  display:block;
  // background:#f9f9f9;
  // padding:1rem;
  // border:1px solid #f3f3f3;
  margin-bottom:2rem;
}
.nilResultsList {
  margin-bottom:2rem;
}
.nilResultsWrapper {
  padding:2rem 0;
  margin-bottom:2rem;
}
.product-categories {
  margin-bottom:2rem;
}
</style>
