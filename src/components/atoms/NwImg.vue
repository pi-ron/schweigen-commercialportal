<template>
  <img
    v-if="pathToFile"
    :src="pathToFile"
    :alt="alt"
  />
</template>

<script>
export default {
  name: 'NwImg',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pathToFile: null,
    };
  },
  methods: {
    createCacheFolder() {
      const fs = window.require('fs');
      if (!fs.existsSync(this.cacheFolder)) {
        fs.mkdirSync(this.cacheFolder);
      }
    },
    getImageFromAppData() {
      const fs = window.require('fs');

      let exists = false;
      try {
        exists = fs.existsSync(this.cachedImage);
      } catch {
        exists = false;
      }

      if (exists) {
        this.pathToFile = this.cachedImage;
      } else {
        this.saveImageToAppData();
      }
    },
    saveImageToAppData() {
      const fs = window.require('fs');
      let http = window.require('http');
      const Stream = window.require('stream').Transform;

      if (this.src.startsWith('https')) {
        http = window.require('https');
      }

      http.request(this.src, (response) => {
        const data = new Stream();

        response.on('data', (chunk) => {
          data.push(chunk);
        });

        response.on('end', () => {
          fs.writeFileSync(this.cachedImage, data.read());
          this.pathToFile = this.cachedImage;
        });
      }).end();
    },
  },
  computed: {
    isNw() {
      return !!(window.nw && window.require);
    },
    /**
     * Encodes all characters that are not file system safe in a lossless manner.
     *
     * @return {String} Encoded file safe version of URL
     */
    fileNameEncoded() {
      let url = this.src;
      url = url.split(' ').join('[nbsp]');
      url = url.split('\\').join('[bsol]');
      url = url.split('/').join('[sol]');
      url = url.split(':').join('[colon]');
      url = url.split('*').join('[ast]');
      url = url.split('?').join('[quest]');
      url = url.split('"').join('[quot]');
      url = url.split('<').join('[lt]');
      url = url.split('>').join('[gt]');
      url = url.split('|').join('[pipe]');
      return url;
    },
    cacheFolder() {
      if (!this.isNw) {
        return '';
      }
      const path = window.require('path');
      return path.join(window.nw.App.dataPath, 'nw-img-cache');
    },
    cachedImage() {
      if (!this.isNw) {
        return '';
      }
      const path = window.require('path');
      return path.join(this.cacheFolder, this.fileNameEncoded);
    },
  },
  created() {
    if (this.isNw) {
      this.createCacheFolder();
      this.getImageFromAppData();
    } else {
      this.pathToFile = this.src;
    }
  },
};
</script>
