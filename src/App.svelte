<script>
    import Board from "./lib/Board.svelte";
</script>

<h1>
    Conway Game of Life
</h1>

<main>
    <Board/>
</main>

<style lang="scss">
  h1 {
    margin: 1em auto 0;
    text-align: center;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
