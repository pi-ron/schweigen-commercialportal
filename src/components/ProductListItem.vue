<template>
  <div class="teaser product-teaser w-inline-block">
    <router-link @click="setCurrentProduct(record)"
    :to="{name: 'Product',
    params: {record_id:record_id,name:name,image:image,model:model}}" class="teaser-link">
      <div class="teaser-thumbnail-wrapper">
        <img
        :src="image"
        :alt="name"
        sizes="(max-width: 479px) 100vw, (max-width: 767px) 83vw, 180px"
        class="product-teaser-thumbnail">
        <div class="product-teaser-color-tile"></div>
        <div class="product-teaser-color-tile schweigen-in w-condition-invisible">
        </div>
      </div>
      <div class="teaser-text">
        <div class="tag-02">
          <div class="line tag-02">
          </div>
          <div class="tag-02-text">
            {{ model }}
          </div>
        </div>
        <h1
        class="label-02">{{ name }}</h1>
      </div>
    </router-link>

    <div v-if="(downloads.length > 0)" class="product-list-item-downloads">
      <div class="tag-03">
        <div class="tag-03-text">
          Downloads
        </div>
      </div>
      <a
        v-for="download in downloads"
        :key="download"
        :href="download.fields['computed-download-url']"
        class="product-list-item-download">
          {{ download.fields.name }}
      </a>
    </div>
  </div>
</template>

<script>
export default {

  name: 'ProductListItem',
  props: {
    name: String,
    image: String,
    model: String,
    record_id: String,
    record: Object,
  },
  data() {
    return {
      sharedState: this.store.state,
    };
  },
  computed: {
    loading() { return this.sharedState.products.loading; },
    downloads() {
      const result = [];

      const unfilteredDownloads = this.store.state.downloads.unfiltered.records;
      // console.log(unfilteredDownloads);
      // eslint-disable-next-line prefer-destructuring
      const model = this.model;
      console.log(model);

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
  methods: {
    setCurrentProduct(record) {
      this.store.setCurrentProduct(record);
    },
  },
};
</script>

<style lang="scss" scoped>
.teaser-link {
  text-decoration:none;
  color:#000000;

  &:hover {
    color:#db0962;
  }
}
.teaser-thumbnail-wrapper {
  height:160px;
  padding:20px;
}
.product-teaser-thumbnail {
  max-height:120px;
}
.product-teaser-color-tile {
  background:#f1f1f1;
}
.product-list-item-downloads {
  .tag-03 {
    margin-bottom:4px;
  }
}
.product-list-item-download:link, .product-list-item-download:visited {
  font-size:10px;
  color:#333333;
  text-decoration:none;
  display:inline-block;
  padding:0.5em;
  background:#f6f6f6;
  margin-bottom:2px;
  border:1px solid #f1f1f1;

  &:hover {
    color:#000000;
    background:#f1f1f1;
  }
}
</style>
