<template>
  <div class="home">
    <HelloWorld msg="Downloads Vue"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Downloads',
  components: {
    HelloWorld,
  },
  data() {
    return {
      sharedState: this.store.state,
    };
  },
};
</script>
