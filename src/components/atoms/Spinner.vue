<template>
  <div class="loading"></div>
</template>

<script>
export default {

  name: 'Spinner',

  data() {
    return {

    };
  },
};
</script>

<style lang="css" scoped>

.loading {
  display: block;
  width: 16px;
  height: 16px;
  border: 3px solid #f9f9f9;
  border-radius: 50%;
  border-top-color: #cccccc;
  animation: spin 0.75s ease-in-out infinite;
  -webkit-animation: spin 0.75s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}

</style>
