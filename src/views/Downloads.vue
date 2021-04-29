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
    // downloads() {
    //   const { records } = this.sharedState.downloads.unfiltered;
    //   return records;
    // },
  },
};
</script>
