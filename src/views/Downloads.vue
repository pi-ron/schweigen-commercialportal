<template>
  <div class="home">
    <HelloWorld msg="Downloads Vue"/>
  </div>
</template>

<script>
// @ is an alias to /src
import FileType from '@/components/atoms/FileType.vue';
import { FileCad } from 'mdue';

export default {
  name: 'Downloads',
  components: {
    FileType,
    FileCad,
  },
  data() {
    return {
      sharedState: this.store.state,
    };
  },
};
</script>
