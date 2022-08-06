<script lang="ts">
    export let isAlive = false;
</script>

<span class:alive={isAlive}></span>

<style lang="scss">
  @import "../const";

  .alive {
    background-color: $alive_color;
  }

  span {
    height: $cell_size;
    width: $cell_size;
    border: $border_config;
  }
</style>
