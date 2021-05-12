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
            <h1 class="heading xl">{{ name }}</h1>
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
    <div class="section">
      <div class="container">
        <div class="wrapper-m s-p-t-0">
          <div class="product-images">
           <div class="product-hero-wrapper">
            <img :src="image" loading="lazy" :alt="name" class="product-hero"></div>
            <div class="product-thumbnails">
              <!-- <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" class="product-thumbnail">
              <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" class="product-thumbnail">
              <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" class="product-thumbnail"> -->
              </div>
          </div>
        </div>
      </div>
    </div>
      <div class="feature-section">
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
  <div class="feature-section">
    <div class="container">
      <div class="wrapper-m product-feature-wrapper">
        <div class="w-layout-grid feature-grid product-feature">
          <div id="w-node-_5ffc45ae-ff89-410b-53a5-508c3dfda701-e5920bf5"
          class="feature-content-wrapper left top s-p-r-0">
            <h2 class="heading l">Specifications</h2>
          </div>
          <div class="feature-content-wrapper right">
            <p class="body-text m">Width - {{product['dimensions-width']}}mm</p>
            <p class="body-text m">Depth - {{product['dimensions-depth']}}mm</p>
            <p class="body-text m">Height - {{product['dimensions-height']}}mm</p>
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

  <!-- <div class="feature-section">
    <div class="container">
      <div class="wrapper-m product-feature-wrapper">
        <div class="w-layout-grid feature-grid product-feature">
          <div id="w-node-_63ee0a10-74ee-035c-f4a9-632a5e72acc7-e5920bf5"
          class="feature-content-wrapper left top s-p-r-0">
            <h2 class="heading l">Talking Points</h2>
          </div>
          <div class="feature-content-wrapper right">
            <div class="w-layout-grid l-g-2-col">
              <div class="feature-block">
                <div class="feature-icon-wrapper">
                  <div class="material-icons feature-icon">star</div>
                </div>
                <h3 class="heading s">Extraordinary feature</h3>
                <p class="body-text m">Paragraph</p>
              </div>
              <div class="feature-block">
                <div class="feature-icon-wrapper">
                  <div class="material-icons feature-icon">star</div>
                </div>
                <h3 class="heading s">Unique selling proposition</h3>
                <p class="body-text m">Paragraph</p>
              </div>
              <div class="feature-block">
                <div class="feature-icon-wrapper">
                  <div class="material-icons feature-icon">star</div>
                </div>
                <h3 class="heading s">Unique selling proposition</h3>
                <p class="body-text m">Paragraph</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
// @ is an alias to /src
import FileType from '@/components/atoms/FileType.vue';
import FileSize from '@/components/atoms/FileSize.vue';

export default {
  name: 'Product',
  components: {
    FileType,
    FileSize,
  },
  props: {
    name: String,
    image: String,
    model: String,
    record_id: String,
  },
  data() {
    return {
      product: this.store.state.currentProduct,
      sharedState: this.store.state,
    };
  },
  computed: {
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

</style>
