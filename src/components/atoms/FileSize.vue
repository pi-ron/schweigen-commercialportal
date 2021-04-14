<template>
  <template v-if="!loadingFileSize && !fileSizeErrored">
    <span>{{ humanSize }}</span>
  </template>
  <template v-if="loadingFileSize && !fileSizeErrored">Loading file size...</template>
  <template v-if="loadingFileSize && fileSizeErrored">File size error...</template>
</template>

<script>
export default {
  name: 'FileSize',
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
    // this.axios.head(this.url).then((response) => {
    //   this.filesize = response.headers['content-length'];
    //   this.loadingFileSize = false;
    //   this.humanSize = this.humanFileSize(this.filesize);
    //   console.log(response);
    // }, (error) => {
    //   console.log(error);
    //   this.loadingFileSize = false;
    //   this.fileSizeErrored = true;
    // });
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
</style>
