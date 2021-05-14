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
            <h1 class="heading xl">Downloads</h1>
            <div class="breadcrumbs">
              <a href="\" class="breadcrumbs-link">Home</a>
              <img src="https://assets.website-files.com/6007b4af01b37638d431e8f4/60178790556ad849c6eb2b2d_Chevron%20Right%20Light.png" alt="">
              <div class="breadcrumbs-link current">Downloads</div>
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
            <DownloadsSidebar></DownloadsSidebar>
          </div>
        </aside>
        <div class="page-content product-categories">
<!--          {{ activeFilters }}-->
          <tableLoading v-if="loading"></tableLoading>
          <div v-if="nilResults" class="message">
            <h3 class="heading s">Sorry, no matching results were found.</h3>
            <p class="heading xxs">Search Suggestions:</p>
            <p>Unselect a filter or two to see if that helps
            </p>
            <p><a :click="resetFilters()" href="#">Reset all filters and start over</a>
            </p>
          </div>
          <DownloadsTable v-if="!loading"></DownloadsTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import FileType from '@/components/atoms/FileType.vue';
// import { FileCad } from 'mdue';
import tableLoading from '@/components/atoms/tableLoading.vue';
import DownloadsTable from '@/components/DownloadsTable.vue';
import DownloadsSidebar from '@/components/DownloadsSidebar.vue';

export default {
  name: 'Downloads',
  components: {
    tableLoading,
    DownloadsTable,
    DownloadsSidebar,
  },
  data() {
    return {
      sharedState: this.store.state,
      activeFilters: this.store.state.filtering.activeFilters,
    };
  },
  computed: {
    loading() { return this.sharedState.downloads.loading; },
    nilResults() {
      const { counter } = this.sharedState.downloads.filtered;
      const { loading } = this;

      if (counter === 0 && !loading) {
        return true;
      }

      return false;
    },
    // downloads() {
    //   const { records } = this.sharedState.downloads.unfiltered;
    //   return records;
    // },
  },
  methods: {
    resetFilters() {
      this.store.resetFilters(this.sharedState.activeFilterTable);
    },
  },
};
</script>
