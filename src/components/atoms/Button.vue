<template>
  <a v-bind:class="size, type" class="button w-inline-block" v-bind:href="href">
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
      class: "button small secondary w-inline-block"
    };
  },
  props: {
    href: {
      type: String, // String, Number, Boolean, Function, Object, Array
      required: true,
      default: "#",
    },
    size: {
      type: String,
      default: "large"
    },
    type: {
      type: String,
      default: "default"
    },    
    text: {
      default: "Download"
    }
  },
};
</script>

<style lang="css" scoped>
</style>
