<template>
  <template v-if="!isCadFile" class="filetype">
    <div class="filetype">
      <span class="filetype-icon-wrapper pdf-or-doc"><span v-bind:class="iconClass"></span></span>
      <span class="filetype-text">{{ type }}</span>
    </div>
  </template>
  <template v-if="isCadFile" class="filetype">
    <div class="filetype">
      <span class="filetype-icon-wrapper cad"><FileCad></FileCad></span>
      <span class="filetype-text">{{ type }}</span>
    </div>
  </template>
</template>

<script>
import { FileCad } from 'mdue';

export default {
  name: 'FileType',
  components: {
    FileCad,
  },
  props: {
    url: String,
  },
  data() {
    return {
      type: 'none',
      iconClass: 'none',
    };
  },
  computed: {
    isCadFile() {
      if (this.type === 'dwg' || this.type === 'stp') {
        return true;
      } return false;
    },
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

<style lang="scss" scoped>
.filetype {
  display:inline-flex;
  align-items:center;
  padding:4px 4px;
  /*border:1px solid #f6f6f6;*/
  background:#fff;
  border-radius:4px;
}
.filetype-text {
  text-transform:uppercase;
  font-size:0.725rem;
  font-weight:bold;
}

.filetype-icon-wrapper {
  font-size:1.25rem;
  display:flex;
  align-items:center;

  &.cad {
    font-size:1.5rem;
  }

  &.pdf-or-doc {
    font-size:1.25rem;
    height:1.55rem;
  }
}
</style>
