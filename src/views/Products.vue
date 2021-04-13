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
              <a href="#" class="breadcrumbs-link">Home</a>
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
          <div class="sl-sidebar-sticky"></div>
        </aside>
        <div class="page-content product-categories">
          <tableLoading v-if="loading"></tableLoading>
          <div class="w-dyn-list" v-if="!loading">
            <div role="list" class="teaser-grid large products-list w-dyn-items">

              <ProductListItem
              v-for="product in sharedState.products.unfiltered.records"
              role="listitem"
              :key="product"
              :record="product.fields"
              v-bind:name="product.fields['display-name']"
              v-bind:model="product.fields.name"
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

export default {
  name: 'Products',
  components: {
    tableLoading,
    ProductListItem,
  },
  data() {
    return {
      sharedState: this.store.state,
    };
  },
  computed: {
    loading() { return this.sharedState.products.loading; },
  },
};
</script>

<style lang="css">

</style>
