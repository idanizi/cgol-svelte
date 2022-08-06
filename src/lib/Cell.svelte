<script lang="ts">
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher()

    export let isAlive = false;

    function toggle() {
        dispatch('toggle')
    }
</script>

<span class:alive={isAlive} on:click|preventDefault={toggle}></span>

<style lang="scss">
  @import "../const";

  .alive {
    background-color: $alive_color;
  }

  span {
    height: $cell_size;
    width: $cell_size;
    border: $border_config;
    cursor: pointer;
  }
</style>
