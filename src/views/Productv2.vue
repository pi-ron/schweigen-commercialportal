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
            <h1 v-if="loading" class="heading xl">Loading</h1>
            <h1 v-if="!loading" class="heading xl">{{ name }}</h1>
            <div class="breadcrumbs">
              <a href="#" class="breadcrumbs-link">Home</a>
              <img src="https://assets.website-files.com/6007b4af01b37638d431e8f4/60178790556ad849c6eb2b2d_Chevron%20Right%20Light.png" alt="">
              <router-link :to="{name: 'Products'}" class="breadcrumbs-link">Products</router-link>
              <img src="https://assets.website-files.com/6007b4af01b37638d431e8f4/60178790556ad849c6eb2b2d_Chevron%20Right%20Light.png" alt="">
              <div class="breadcrumbs-link current">{{model}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div v-if="!loading" class="section">
      <div class="container">
        <div class="wrapper-m s-p-t-0">
          <div class="product-images">
           <div class="product-hero-wrapper">
            <img :src="product['deep-etched-product-image']" loading="lazy" :alt="product.name" class="product-hero"></div>
            <div class="product-thumbnails">
              <!-- <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" class="product-thumbnail">
              <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" class="product-thumbnail">
              <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" class="product-thumbnail"> -->
              </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!loading" class="feature-section">
    <div class="container">
      <div class="wrapper-m product-feature-wrapper">
        <div class="w-layout-grid feature-grid product-feature">
          <div id="w-node-_3651e0dc-d9ea-2eea-5f5b-4c624f85706b-e5920bf5"
          class="feature-content-wrapper left top s-p-r-0">
            <h2 class="heading l">About this model</h2>
          </div>
          <div class="feature-content-wrapper right">
            <p v-if="product['about-paragraph-1']"
              class="body-text m">
                {{product['about-paragraph-1']}}
            </p>
            <p v-if="product['about-paragraph-2']"
              class="body-text m">
                {{product['about-paragraph-2']}}
            </p>
            <p v-if="product['about-paragraph-3']"
              class="body-text m">
                {{product['about-paragraph-3']}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!loading" class="feature-section">
    <div class="container">
      <div class="wrapper-m product-feature-wrapper">
        <div class="w-layout-grid feature-grid product-feature">
          <div id="w-node-_5ffc45ae-ff89-410b-53a5-508c3dfda701-e5920bf5"
          class="feature-content-wrapper left top s-p-r-0">
            <h2 class="heading l">Specifications</h2>
          </div>
          <div class="feature-content-wrapper right">
            <div class="w-layout-grid">
              <div class="col">
                <div class="feature-content-item">
                  <h3 class="heading s c-t-primary-60">Lights + Filters</h3>
                  <p class="body-text s">Lights - {{product['lights']}}</p>
                  <p class="body-text s">Light Wattage - {{product['light-wattage']}}</p>
                  <p class="body-text s">Filter Type - {{product['filter-type']}}</p>
                  <p class="body-text s">Filter QTY - {{product['filter-qty']}}</p>
                </div>
                <div class="feature-content-item">
                  <h3 class="heading s c-t-primary-60">Dimensions</h3>
                  <p class="body-text s">Width - {{product['dimensions-width']}}mm</p>
                  <p class="body-text s">Depth - {{product['dimensions-depth']}}mm</p>
                  <p class="body-text s">Height - {{product['dimensions-height']}}mm</p>
                </div>
              </div>
              <div class="col">
                <div class="feature-content-item">
                  <h3 class="heading s c-t-primary-60">Product Details</h3>
                  <p class="body-text s">Product Code - {{product['name']}}</p>
                  <p class="body-text s">Finish - {{product['finish']}}</p>
                  <p class="body-text s">Fan Speed Levels - {{product['fan-speed-levels']}}</p>
                  <p class="body-text s">Airflow -
                    <span class="motor" v-for="motor in motors" :key="motor">
                      {{motor.fields['motor-flowrate']}}<span class="lighttext">m3/h</span>
                    </span>
                  </p>
                  <p class="body-text s">Control - {{product['control']}}</p>
                </div>
                <div class="feature-content-item">
                  <h3 class="heading s c-t-primary-60">Warranties</h3>
                  <p class="body-text s">Warranty on Motor - {{product['warranty-on-motor']}}</p>
                  <p class="body-text s">Warranty on Canopy - {{product['warranty-on-canopy']}}</p>
                  <p class="body-text s">Warranty on Filters -
                    {{product['warranty-on-filters']}}</p>
                  <p class="body-text s">Warranty on GU10 LED Globes -
                    {{product['warranty-on-gu10-led-globes']}}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="feature-section" v-if="downloads.length > 0">
    <div class="container">
      <div class="wrapper-m product-feature-wrapper">
        <div class="w-layout-grid feature-grid product-feature">
          <div id="w-node-_5ffc45ae-ff89-410b-53a5-508c3dfda701-e5920bf5"
          class="feature-content-wrapper left top s-p-r-0">
            <h2 class="heading l">Downloads</h2>
          </div>
          <div class="feature-content-wrapper right">
            <div>
              <div class="table-body">
                <div class="table-head">
                <div class="table-col">
                  <div class="text-left">Name</div>
                </div>
                <div class="table-col">
                  <div  class="text-center">Size</div>
                </div>
                <div class="table-col">
                  <div class="text-center">Type</div>
                </div>
              </div>
                <a
                class="table-row clickable"
                v-for="download in downloads"
                :key="download"
                :href="download.fields['computed-download-url']">

                  <div class="table-col text-left">
                    <span>{{ download.fields["display-name"] }}</span>
                  </div>
             <div class="table-col">
                    <FileSize v-bind:url="download.fields['computed-download-url']"></FileSize>
                  </div>
                  <div class="table-col">
                    <FileType
                    v-bind:url="download.fields['computed-download-url']"
                    ></FileType>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FileType from '@/components/atoms/FileType.vue';
import FileSize from '@/components/atoms/FileSize.vue';

export default {
  name: 'Productv2',
  components: {
    FileType,
    FileSize,
  },
  props: {
    record_id: String,
  },
  mounted() {
    // If this page is loaded directly, set currentProduct to a single product
    const { currentProduct } = this.sharedState;
    if (Object.keys(currentProduct).length === 0) {
      this.store.getSingleProduct(this.record_id);
    }
  },
  watch: {
    loading(newValue) {
      // Load motors in after the product finishes loading
      if (!newValue) {
        console.log(newValue);
        const motorIds = this.product['motor-option-lookup'];

        motorIds.forEach((id) => {
          this.store.getSingleRecord('Product Motors', id);
        });
      }
    },
  },
  data() {
    return {
    //   product: this.store.state.currentProduct,
      sharedState: this.store.state,
      motors: this.store.state.motors.records,
    };
  },
  computed: {
    name() {
      return this.store.state.currentProduct.name;
    },
    model() {
      return this.store.state.currentProduct.name;
    },
    image() {
      return this.store.state.currentProduct['deep-etched-product-image'];
    },
    product() {
      return this.store.state.currentProduct;
    },
    loading() {
      return this.sharedState.currentProductLoading;
    },
    productsLoading() {
      return this.sharedState.products.loading;
    },
    motorsLoading() {
      return this.sharedState.motors.loading;
    },
    downloads() {
      const result = [];

      const unfilteredDownloads = this.store.state.downloads.unfiltered.records;
      // console.log(unfilteredDownloads);
      // eslint-disable-next-line prefer-destructuring
      const model = this.store.state.currentProduct.name;
      // console.log(model);

      Object.keys(unfilteredDownloads).forEach((key) => {
        const download = unfilteredDownloads[key];
        // console.log(download.fields.name);
        const name = download.fields.name.toLowerCase();
        if (name.includes(model.toLowerCase())) {
          result.push(download);
        }
      });

      return result;
    },
  },
};
</script>

<style lang="scss">
span.motor {
  padding-right:4px;
  margin-right:4px;
  border-right:1px solid #e6e6e6;

  &:last-of-type {
    border-right:0;
  }
}

.product-hero-wrapper {
  max-height:500px;
  background:#F9F9F9;
  padding:60px;
}
.product-hero {
  object-fit: contain;
}

.table-col, td.table-col {
  padding:10px;
  width:100%;
  border-right:1px solid transparent;
}

.table-row, .table-head {
  display:flex;
  font-size:0.85rem;
  font-weight:normal;
  color:#5e6875;
}

.table-row.clickable {
  text-decoration: none;
  border-top:1px solid white;
  &:hover {
    background:#f9f9f9;
  }
}

.table-head {
  font-weight:bold;
  background:#f9f9f9;
}

.text-left {
  text-align: left;
}

.feature-content-item {
  margin-bottom:2rem;

  .body-text {
    border-bottom:1px solid #efefef;
  }
}

</style>
