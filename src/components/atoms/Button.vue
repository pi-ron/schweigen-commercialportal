<template>
  <a v-bind:class="classes" class="button w-inline-block" v-bind:href="href">
      <div class="button-text">
          {{ text }}
      </div>
  </a>
</template>

<script>
export default {

  name: 'Button',

  data() {
    return {
      class: 'button small secondary w-inline-block',
    };
  },
  computed: {
    classes() {
      let classes = '';
      if (this.type) {
        classes += ` ${this.type}`;
      }
      if (this.size) {
        classes += ` ${this.size}`;
      }
      return classes;
    },
  },
  props: {
    href: {
      type: String, // String, Number, Boolean, Function, Object, Array
      required: true,
      default: '#',
    },
    size: {
      type: String,
      default: 'large',
    },
    type: {
      type: String,
      default: 'default',
    },
    text: {
      default: 'Download',
    },
  },
};
</script>

<style lang="css" scoped>
</style>
