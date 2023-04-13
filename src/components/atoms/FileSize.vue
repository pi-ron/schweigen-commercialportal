<template>

  <template v-if="!loadingFileSize && !fileSizeErrored">
    <span>{{ humanSize }}</span>
  </template>
  <template v-if="loadingFileSize && !fileSizeErrored">
    <span class="spinner">
      <Spinner></Spinner>
    </span>
  </template>
  <template v-if="loadingFileSize && fileSizeErrored">File size error...</template>
</template>

<script>
import Spinner from '@/components/atoms/Spinner.vue';

export default {
  name: 'FileSize',
  components: {
    Spinner,
  },
  props: {
    size: String,
    url: String,
  },
  data() {
    return {
      type: 'none',
      iconClass: 'none',
      filesize: null,
      humanSize: 'nah',
      loadingFileSize: true,
      fileSizeErrored: false,
    };
  },
  beforeMount() {
    if (this.url.includes('storage.googleapis.com')) {
      this.hostedOn = 'Google Cloud Storage';
      this.axios.get('https://timdaff.api.stdlib.com/sd977-frontend-api@0.2.0/get/getGoogleCloudPublicFileHeaders/', { params: { url: this.url } }).then((response) => {
        this.filesize = response.data.headers['content-length'];
        this.loadingFileSize = false;
        this.humanSize = this.humanFileSize(this.filesize);
        // console.log(response);
      }, (error) => {
        console.log(error);
        this.loadingFileSize = false;
        this.fileSizeErrored = true;
      });
    } else {
      this.hostedOn = 'Webflow';
      this.axios.head(this.url).then(() => {
        // Webflow does not provide content-length header so have to get it from field.
        // this.filesize = response.headers['content-length'];
        // this.filesize = 100400;
        this.loadingFileSize = false;
        this.humanSize = this.humanFileSize(this.size);
        // console.log(this.filesize);
      }, (error) => {
        console.log(error);
        this.loadingFileSize = false;
        this.fileSizeErrored = true;
      });
    }
    // console.log(this.hostedOn);
  },
  mounted() {
    // console.log(this.loadingFileSize);
    // console.log(this.filesize);
    // if (!this.loadingFileSize) {
    //   this.humanSize = this.humanFileSize(this.filesize);
    // }
  },
  methods: {
    /**
       * Format bytes as human-readable text.
       *
       * @param bytes Number of bytes.
       * @param si True to use metric (SI) units, aka powers of 1000. False to use
       *           binary (IEC), aka powers of 1024.
       * @param dp Number of decimal places to display.
       *
       * @return Formatted string.
       */
    humanFileSize(bytes, si = false, dp = 1) {
      const thresh = si ? 1000 : 1024;

      if (Math.abs(bytes) < thresh) {
        return `${bytes} B`;
      }

      const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      let u = -1;
      const r = 10 ** dp;

      do {
        // eslint-disable-next-line no-param-reassign
        bytes /= thresh;
        // eslint-disable-next-line no-plusplus
        ++u;
      } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

      return `${bytes.toFixed(dp)} ${units[u]}`;
    },
  },
};
</script>

<style lang="css" scoped>
  .spinner {
    display:block;
    margin:0 auto;
  }
</style>
