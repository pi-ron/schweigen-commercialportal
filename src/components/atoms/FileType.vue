<template>
  <span v-bind:class="iconClass">{{ type }}</span>
</template>

<script>
export default {
  name: 'FileType',
  props: {
    url: String,
  },
  data() {
    return {
      type: 'none',
      iconClass: 'none',
    };
  },
  beforeMount() {
    // Extract Extension from filename
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(this.url)[1];
    this.iconClass = `icon-${ext}-file-format`;
    this.type = ext;
  },
};
</script>

<style lang="css" scoped>
</style>
